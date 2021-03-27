import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ScrollReveal from 'scrollreveal'


import Layout from '../components/Layout'

import BackgroundImage from 'gatsby-background-image'

import '../sass/decouverte.sass'

// import ImageDecouverte from '../img/decouverte.jpg'

const DecouvertePageTemplate = ({
    intro,
    illustration,
    sections
}) => {

    const slideUp = {
        distance: '150%',
        origin: 'bottom',
        opacity: 0,
        easing: 'ease',
        delay: 300
    };

    useEffect(() => {
        ScrollReveal().reveal(`.intro-p`, slideUp)
        ScrollReveal().reveal(`.paragraphe`, slideUp)
    }, [])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', flexWrap: 'wrap' }}>
            <BackgroundImage className="full-width-image landing"
                tag='decouvertebackground'
                fluid={illustration.childImageSharp.fluid}
                style={{
                    backgroundPosition: `center`,
                    backgroundAttachment: `fixed`,
                    backgroundSize: 'cover',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    boxShadow: 'inset 0px -8px 22px -10px rgba(255,255,255,1)'
                }}>
                <h1>Le vol à voile kesako ?</h1>
                {intro.map((paragraphe, index) => {
                    return <p className="intro-p" 
                                key={index}
                                style={{
                                    position:'relative',
                                    left: index % 2 === 0 ? '5%' : '-5%'
                                }}>
                        {paragraphe}</p>
                })}
            </BackgroundImage>
            <div className="decouverte-main">
                {
                    sections && sections.map((section, index) => {
                        return (
                            <div className="sections-wrapper" key={index} id={section.id}>

                                <div className="sections-illustration" style={{
                                    backgroundImage: `url(${
                                        !!section.illustration.childImageSharp ? section.illustration.childImageSharp.fluid.src : section.illustration
                                        })`,
                                    backgroundSize: 'cover',
                                    float: index % 2 === 0 ? 'left' : 'right',
                                    margin: '15px'
                                }} />
                                <div>
                                    <h1>{section.titre}</h1>
                                    {
                                        section && section.paragraphes.map((paragraphe, index) => {
                                            return <p key={index} className="paragraphe"
                                                >{paragraphe}</p>
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

DecouvertePageTemplate.propTypes = {
    intro: PropTypes.array,
    illustration: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    sections: PropTypes.array
}

const DecouvertePage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <DecouvertePageTemplate
                intro={frontmatter.introduction}
                illustration={frontmatter.illustration}
                sections={frontmatter.sections}
            />
        </Layout>
    )
}

DecouvertePage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default DecouvertePage

export const pageQuery = graphql`
  query DecouvertePageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "decouverte-page" } }) {
      frontmatter {
        title
        illustration {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        introduction
        sections {
            titre
            id
            illustration {
                childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            paragraphes
        }
      }
    }
  }
`
