import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post';

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags']);
  console.log(entry)

  return (
    <BlogPostTemplate
      post={{
        html: widgetFor('body'),
        frontmatter: {
          title: entry.getIn(['data', 'title']),
          description: entry.getIn(['data', 'description']),
          tags: tags ? tags.toJS(): [],
        },
      }}
      isPreview
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
