import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import '../sass/tarifs.sass'

const TarifPageTemplate = ({
    innerHtml
}) => {

useEffect(()=>{
    console.log(innerHtml)
})

    return (
        <div>
            <div className="wrapper-inner" dangerouslySetInnerHTML={{__html: innerHtml}}>
            </div>
        </div>
    )
}

TarifPageTemplate.propTypes = {
}

const TarifPage = ({ data }) => {
    const { frontmatter, html } = data.markdownRemark
    return (
        <Layout>
            <TarifPageTemplate innerHtml={html}
            />
        </Layout>
    )
}

TarifPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
            html: PropTypes.string,
        }),
    }),
}

export default TarifPage

export const pageQuery = graphql`
  query TarifPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "tarif-page" } }) {
      frontmatter {
        title
      }
      html
    }
  }
`
