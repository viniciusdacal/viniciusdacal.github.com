import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/Layout/Layout';
import SEO from 'components/SEO/SEO';
import SubscribeForm from 'components/SubscribeForm/SubscribeForm';
import './index.css';

const NewsLetter = ({ data, location }) => {
  const { avatar } = data;
  const { title, author, social } = data.site.siteMetadata

  return (
    <Layout
      location={location}
      title={title}
      author={author}
      social={social}
      avatar={avatar}
      language="pt-br"
    >
      <SEO title="Junte-se a nossa newsletter" />
      <section className="newsletter__subcribe-form">
        <SubscribeForm language="pt-br" />
      </section>
    </Layout>
  )
}

export default NewsLetter;
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
  }
`
