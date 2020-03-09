import React from 'react';
import { graphql } from 'gatsby';
import BlogList from 'components/Blog/List/List';
import Layout from 'components/Layout/Layout';
import SEO from 'components/SEO/SEO';
import './BlogList.css';

const TemplatesBlogList = ({
  data,
  location,
  pageContext: { numPages, currentPage, language },
}) => {
  console.log(data);
  const { avatar } = data;
  const { title, author, social } = data.site.siteMetadata;

  return (
    <Layout
      location={location}
      title={title}
      author={author}
      social={social}
      avatar={avatar}
      language={language}
      data={data}
      showFullHeader
    >
      <SEO title="Blog" />
      <BlogList numPages={numPages} currentPage={currentPage} data={data} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query blogListQuery($skip: Int = 0, $limit: Int = 5) {
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
      limit: $limit
      skip: $skip
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
`;

export default TemplatesBlogList;
