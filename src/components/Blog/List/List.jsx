import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import Pagination from 'components/Pagination/Pagination';
import { rhythm } from 'utils/typography';
import './List.css';

const to = (language, i) => {
 if (language === 'en') {
   return '/en/blog'
 }
}

const BlogList = ({ data, numPages, currentPage }) => {
  const posts = data.allMarkdownRemark.edges;
  const hasPagination = numPages > 1;

  return (
    <div className="blog-list__wrapper">
      <div className="blog-list">
        {posts.map(({ node }) => (
          <article className="blog-list__item" key={node.fields.slug}>
            <header>
              <small className="blog-list__item__date">
                {node.frontmatter.date}
              </small>
              {node.frontmatter.image && (
                <Link
                  className="blog-list__item__thumb-link"
                  to={node.fields.slug}
                >
                  <Image
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                    className="blog-list__item__thumb"
                  />
                </Link>
              )}
              <h3
                className="blog-list__item__title__wrapper"
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link className="blog-list__item__title" to={node.fields.slug}>
                  {node.frontmatter.title || node.fields.slug}
                </Link>
              </h3>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
                className="blog-list__item__description"
              />
            </section>
          </article>
        ))}
      </div>
      {hasPagination && (
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          to={i => (i > 1 ? `/blog/${i}` : '/blog')}
        />
      )}
    </div>
  );
};

export default BlogList;
