const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

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

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const ptPosts = await getPosts(graphql, 'pt-BR');
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
        translation: enLinks[identifier],
        heyhey: 'test',
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
        previous,
        next,
      },
    });
  });
}



exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value = createFilePath({ node, getNode })
    const isEN = node.frontmatter.language === 'en';
    const paths = value.split('/');
    if (isEN) {
      value = '/en' + paths.slice(0, -3).join('/') + '/' + paths.slice(-2, -1) + '/';
    }

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    createNodeField({
      name: `identifier`,
      node,
      value: isEN ? paths.slice(0, -2).join('/') + '/' : value,
    });
  }
}
