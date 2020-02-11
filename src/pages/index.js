import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import './index.css';

const BlogIndex = ({ data, location }) => {
  const { avatar } = data;
  const { title, author, social } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout
      location={location}
      title={title}
      author={author}
      social={social}
      avatar={avatar}
      language="pt-br"
    >

      <SEO title="All posts" />
      <div className="post-list">
        {posts.map(({ node }) => (
          <article className="post-list__item" key={node.fields.slug}>
            <header>
              <small className="post-list__item__date">{node.frontmatter.date}</small>
              {node.frontmatter.image && (
                <Image
                  fluid={node.frontmatter.image.childImageSharp.fluid}
                  className="post-list__item__thumb"
                />
              )}
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link className="post-list__item__title" to={node.fields.slug}>
                  {node.frontmatter.title || node.fields.slug}
                </Link>
              </h3>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
                className="post-list__item__description"
              />
            </section>
          </article>
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndex;
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          instagram
          linkedin
          twitter
          youtube
        }
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 120, height: 120) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: "pt-br" } } },
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            title
            description
            image {
              id
              publicURL
              childImageSharp {
                fluid(maxWidth: 680, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
