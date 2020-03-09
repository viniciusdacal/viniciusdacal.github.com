import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from 'components/Layout/Layout';
import SEO from 'components/SEO/SEO';
import BlogList from 'components/Blog/List/List';
import './index.css';

const BlogIndex = ({ data, location, pageContext }) => {
  const { avatar, allMarkdownRemark } = data;
  const { title, author, social } = data.site.siteMetadata;
  const { numPages, currentPage } = pageContext;
  const { totalCount } = allMarkdownRemark;

  return (
    <Layout
      location={location}
      title={title}
      author={author}
      social={social}
      avatar={avatar}
      language="pt-br"
      showFullHeader
    >
      <SEO title="Home" />
      <BlogList
        numPages={numPages}
        currentPage={currentPage}
        data={data}
      />
      {totalCount > 5 && <Link to="/blog/2">Ver mais</Link>}
    </Layout>
  );
};

export default BlogIndex;
export const pageQuery = graphql`
  query IndexQuery {
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
      filter: { frontmatter: { language: { eq: "pt-br" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
      skip: 0
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
      totalCount
    }
  }
`;
