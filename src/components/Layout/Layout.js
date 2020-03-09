import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import LayoutHeader from './Header/Header';
import { rhythm } from 'utils/typography';
import './Layout.css';

const Layout = ({
  author,
  avatar,
  children,
  coverFluid,
  language,
  location,
  social,
  title,
  imageBy,
  showFullHeader,
}) => (
  <>
    <header>
      {language === 'pt-br' ? (
        <Link className="layout__translation-link" to="/en/">EN</Link>
      ) : (
        <Link className="layout__translation-link" to="/">PT</Link>
      )}
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(26),
          padding: `20px ${rhythm(3 / 4)} 0 ${rhythm(3 / 4)}`,
        }}
      >
        <LayoutHeader
          avatar={avatar}
          location={location}
          title={title}
          author={author}
          social={social}
          language={language}
          showFullHeader={showFullHeader}
        />
      </div>
      {coverFluid && (
        <Image fluid={coverFluid} className="layout__blog-list__item__thumb" />
      )}
      {imageBy && (
        <div className="layout__blog-list__item__image__by">
          <span>
            image by <a  target="_blank" rel="noopener noreferrer" href={imageBy.url}>{imageBy.name}</a>
          </span>
        </div>
      )}
    </header>
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(26),
        padding: `10px ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <main>{children}</main>
      <footer className="footer">
        Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  </>
)

export default Layout
