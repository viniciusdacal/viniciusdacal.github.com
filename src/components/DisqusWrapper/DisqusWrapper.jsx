import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'

const DisqusWrapper = ({ slug, title }) => {
  const url = `https://viniciusdacal.com/${slug}`
  return (
    <div>
      <ReactDisqusComments
        shortname="viniciusdacalcom"
        identifier={url}
        title={title}
        url={url}
      />
    </div>
  )
}

DisqusWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
}

export default DisqusWrapper
