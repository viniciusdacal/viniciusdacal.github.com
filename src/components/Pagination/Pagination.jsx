import React from 'react';
import cx from 'classnames';
import { Link, graphql } from 'gatsby';

import './Pagination.css';

const Pagination = ({ numPages, currentPage, to }) => {
  return (
    <ul className="pagination">
      {Array.from({ length: numPages }).map((_, i) => (
        <li>
          <Link
            type="button"
            className={cx('pagination__button', {
              ['pagination__button--is-active']: (i + 1) === currentPage,
            })}
            to={to(i + 1)}
          >
            {i + 1}
          </Link>
        </li>
      ))}
    </ul>
  );
};

Pagination.defaultProps = {
  to: i => `./${i}/`,
};

export default Pagination;
