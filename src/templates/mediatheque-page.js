import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const MediathequePageTemplate = ({

}) => {

    return (
        <div>
            <p>Page Mediatheque</p>
        </div>
    )
}

MediathequePageTemplate.propTypes = {
}

const MediathequePage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <MediathequePageTemplate
            />
        </Layout>
    )
}

MediathequePage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default MediathequePage

export const pageQuery = graphql`
  query MediathequePageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "mediatheque-page" } }) {
      frontmatter {
        title
      }
    }
  }
`
