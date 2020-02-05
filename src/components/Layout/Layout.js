import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import LayoutHeader from './Header/Header';
import { rhythm } from '../../utils/typography';
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
}) => (
  <header>
    {language === 'pt-BR' ? (
      <Link className="layout__translation-link" to="/en/">EN 🇬🇧</Link>
    ) : (
      <Link className="layout__translation-link" to="/">PT 🇧🇷</Link>
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
      />
    </div>
    {coverFluid && (
      <Image fluid={coverFluid} className="post-list__item__thumb" />
    )}
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(26),
        padding: `10px ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  </header>
)

export default Layout
