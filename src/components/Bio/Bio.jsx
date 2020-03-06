import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Icon from 'components/Icon/Icon';
import Emoji from 'components/Emoji/Emoji';
import './Bio.css'

const Bio = ({ language }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 120, height: 120) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            instagram
            linkedin
            twitter
            youtube
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="bio">
      <div className="bio__bio-avatar">
        <p className="bio__bio">
          <strong className="bio__bio__name">Vinicius Dacal</strong><br/>
          {language === 'pt-br' ? (
            <div>
              <Emoji name="br-flag" /> Brasileiro <br/>
              <Emoji name="person-macbook" /> Desenvolvedor de software <br/>
              <Emoji name="uk-flag" /> Trabalha remoto para BEN UK<br/>
              <Emoji name="heart" />Ama aprender, criar e compartilhar
            </div>
          ): (
            <div>
              <Emoji name="br-flag" /> Brazilian <br/>
              <Emoji name="person-macbook" /> Software Engineer. <br/>
              <Emoji name="uk-flag" /> Working remotely for BEN UK. <br/>
              <Emoji name="heart" /> Loves learning, creating and sharing.
            </div>
          )}
        </p>
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginLeft: 'auto',
            marginBottom: 0,
            minWidth: 120,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </div>
      <div className="bio__social-links">
        <strong>
          {language === 'pt-br'
            ? 'Me Siga nas redes sociais'
            : 'Follow me on social media'
          }
          :
        </strong>
        <a
          href={`https://www.youtube.com/channel/${social.youtube}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Youtube"
          className="bio__social-links__link"
        >
          <Icon name="youtube" />
        </a>
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
          className="bio__social-links__link"
        >
          <Icon name="twitter" />
        </a>
        <a
          href={`https://www.instagram.com/${social.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="bio__social-links__link"
        >
          <Icon name="instagram" />
        </a>
        <a
          href={`https://www.linkedin.com/in/${social.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Linkedin"
          className="bio__social-links__link"
        >
          <Icon name="linkedin" />
        </a>
      </div>
    </div>
  )
}

export default Bio
