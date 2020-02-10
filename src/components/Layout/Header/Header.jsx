import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import Icon from '../../../components/Icon/Icon';
import { rhythm, scale } from '../../../utils/typography';

const LayoutHeader = ({
  author,
  avatar,
  location,
  social,
  title,
  language,
}) => {
  const pathname = location ? location.pathname : '';
  const rootPath = `${__PATH_PREFIX__}/`
  if ([rootPath, `${rootPath}en/`].includes(pathname)) {
    return (
      <>
        <Image
          fixed={avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginLeft: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 120,
            borderRadius: `100%`,
            float: "right",
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <h1
          className="layout__title"
          style={{
            ...scale(1),
            marginBottom: rhythm(0.2),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <p className="layout__bio">
          {/* 🇧🇷Brasileiro <br/>
          👨🏻‍💻Desenvolvedor de software <br/>
          🇬🇧Trabalha remoto para BEN UK<br/>
          ❤️Ama aprender, criar e compartilhar */}

          {language === 'pt-BR' ? (
            <>
            Brasileiro, desenvolvedor de software e trabalha remoto para BEN UK.<br />
            ❤️ Ama aprender, criar e compartilhar.
            </>
          ): (
            <>
            Brazilian Software Engineer, working remotely for BEN UK.<br/>
            ❤️ Loves learning, creating and sharing.
            </>
          )}
        </p>
        <div className="layout__social-links">
          <a
            href={`https://www.youtube.com/channel/${social.youtube}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Youtube"
            className="layout__social-links__link"
          >
            <Icon name="youtube" />
          </a>
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            className="layout__social-links__link"
          >
            <Icon name="twitter" />
          </a>
          <a
            href={`https://www.instagram.com/${social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="layout__social-links__link"
          >
            <Icon name="instagram" />
          </a>
          <a
            href={`https://www.linkedin.com/in/${social.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Linkedin"
            className="layout__social-links__link"
          >
            <Icon name="linkedin" />
          </a>
        </div>
      </>
    )
  }
  return (
    <h3
      style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
      }}
      className="layout__title"
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={language === 'pt-BR' ? `/` : '/en/'}
      >
        ← {title}
      </Link>
    </h3>
  );
}

export default LayoutHeader;
