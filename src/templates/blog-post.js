import React from "react"
import { Link, graphql } from "gatsby"
import ReactGA from 'react-ga';
import Bio from "../components/Bio/Bio"
import Layout from "../components/Layout/Layout";
import DisqusWrapper from '../components/DisqusWrapper/DisqusWrapper';
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography"
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

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const { language, title } = post.frontmatter;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next, translation } = pageContext;

  return (
    <Layout
      location={location}
      title={siteTitle}
      coverFluid={post.frontmatter.image?.childImageSharp.fluid}
      language={language}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="blog-post">
        <header>
          {translation && (
            <Link to={translation} onClick={() => trackLanguageChange(language)}>
              {language === 'pt-BR' ? 'Read in English' : 'Leia em português'}
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
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
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
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
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
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
        description
        language

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
