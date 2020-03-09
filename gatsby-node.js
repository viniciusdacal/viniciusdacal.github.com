const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

function stringToSlug(title) {
  let str = title.trim().toLowerCase(); // trim

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

const getPosts = async (graphql, language) => {
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { frontmatter: { language: { eq: "${language}" } } },
        ) {
          edges {
            node {
              fields {
                slug
                identifier
              }
              frontmatter {
                title
                date(formatString: "MMM DD, YYYY")
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors
  }

  return result.data.allMarkdownRemark.edges;
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const ptPosts = await getPosts(graphql, 'pt-br');
  const enPosts = await getPosts(graphql, 'en');

  ptLinks = {};
  enLinks = {};

  ptPosts.forEach((post) => {
    ptLinks[post.node.fields.identifier] = post.node.fields.slug;
  });
  enPosts.forEach((post) => {
    enLinks[post.node.fields.identifier] = post.node.fields.slug;
  });

  // Create blog posts pages.
  ptPosts.forEach((post, index) => {
    const previous = index === ptPosts.length - 1 ? null : ptPosts[index + 1].node;
    const next = index === 0 ? null : ptPosts[index - 1].node;
    const { identifier } = post.node.fields;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        language: 'pt-br',
        dateFormat: 'DD [de] MMMM [de] YYYY',
        translation: enLinks[identifier],
        previous,
        next,
      },
    });
  });

  enPosts.forEach((post, index) => {
    const previous = index === enPosts.length - 1 ? null : enPosts[index + 1].node;
    const next = index === 0 ? null : enPosts[index - 1].node;
    const { identifier } = post.node.fields;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        translation: ptLinks[identifier],
        language: 'en',
        dateFormat: 'MMM DD, YYYY',
        previous,
        next,
      },
    });
  });

  const postsPerPage = 5
  const ptNumPages = Math.ceil(ptPosts.length / postsPerPage);

  Array.from({ length: ptNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/BlogList/BlogList.jsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: ptNumPages,
        currentPage: i + 1,
        language: 'pt-br'
      },
    });
  });

  const enNumPages = Math.ceil(enPosts.length / postsPerPage);

  Array.from({ length: enNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/en/blog` : `/en/blog/${i + 1}`,
      component: path.resolve('./src/templates/BlogList/BlogList.jsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: ptNumPages,
        currentPage: i + 1,
        language: 'en'
      },
    });
  });
}

function formatDate(date) {
  const [y, m, d] = date.split('-');
  return `${y}/${m}/${d.slice(0,2)}`;
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value = createFilePath({ node, getNode })
    const isEN = node.frontmatter.language === 'en';
    const paths = value.split('/');
    const { date, title } = node.frontmatter;

    value = `/blog/${formatDate(date)}/${stringToSlug(title)}`;

    if (isEN) {
      value = '/en' + value;
    }

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    createNodeField({
      name: `identifier`,
      node,
      value: paths.slice(0, -2).join('/') + '/',
    });
  }
}
