import React from 'react'
import { Link, graphql } from 'gatsby';
import ReactGA from 'react-ga';
import Bio from 'components/Bio/Bio'
import Layout from 'components/Layout/Layout';
import DisqusWrapper from 'components/DisqusWrapper/DisqusWrapper';
import SubscribeForm from 'components/SubscribeForm/SubscribeForm';
import SEO from 'components/SEO/SEO';
import { rhythm, scale } from 'utils/typography';
import './blog-post.css';

function trackLanguageChange(language) {
  ReactGA.event({
    category: 'Post',
    action: 'click',
    label: `Post - Go to ${language === 'en' ? 'Portuguese' : 'English'}`,
  });
}

function trackPrevNextLink(dir) {
  ReactGA.event({
    category: 'Post',
    action: 'click',
    label: `Post - Go to ${dir}`,
  });
}

export const BlogPostTemplate = ({
  isPreview,
  next,
  previous,
  siteTitle,
  translation,
  post,
  location,
  siteUrl,
  author,
}) => {
  const { language } = post.frontmatter;
  const { title } = post.frontmatter;
  const img = post.frontmatter.image?.childImageSharp.fluid.src;

  return (
    <Layout
      location={location}
      title={siteTitle}
      coverFluid={post.frontmatter.image?.childImageSharp.fluid}
      imageBy={post.frontmatter.imageBy}
      language={language}
    >
      <SEO
        title={title}
        description={post.frontmatter.description || post.excerpt}
        type="article"
        meta={[
          {
            name: 'og:image',
            content: `${siteUrl}${img}`,
          },
          {
            name: 'article:author',
            content: author,
          },
          {
            name: 'article:published_time',
            content: post.frontmatter.datetime,
          },
          {
            name: 'article:tag',
            content: post.frontmatter?.keywords?.join(','),
          },
        ]}
      />
      <article className="blog-post">
        <header>
          {translation && (
            <Link to={translation} onClick={() => trackLanguageChange(language)}>
              {language === 'pt-br' ? 'Read in English' : 'Leia em português'}
            </Link>
          )}
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
              color: '#f1a10a',
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} className="blog-post__article" />
        <SubscribeForm language={language}/>
        <hr
          style={{
            marginBottom: rhythm(1),
            marginTop: rhythm(1),
          }}
        />
        <footer>
          <Bio language={language} />
        </footer>
      </article>

      {!isPreview && (
        <>
          <nav>
            <ul className="blog-post__next-prev-links">
              <li>
                {previous && (
                  <Link onClick={() => trackPrevNextLink('prev')} to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link onClick={() => trackPrevNextLink('next')} to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          <DisqusWrapper slug={post.fields.slug} title={title} />
        </>
      )}
    </Layout>
  )
}

const BlogPost = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const siteUrl = data.site.siteMetadata.url;
  const author = data.site.siteMetadata.author;
  const { previous, next, translation } = pageContext;


  return (
    <BlogPostTemplate
      siteTitle={siteTitle}
      previous={previous}
      next={next}
      translation={translation}
      post={post}
      siteUrl={siteUrl}
      author={author}
    />
  );
};

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $language: String!, $dateFormat: String!) {
    site {
      siteMetadata {
        title
        url,
        author,
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(locale: $language, formatString: $dateFormat)
        datetime: date(formatString: "YYYY-MM-DD HH:mm:ss")
        description
        language
        keywords
        imageBy {
          url
          name
        }
        image {
          id
          publicURL
          childImageSharp {
            fluid(maxWidth: 1920, quality: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
