import React, { useEffect , useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import BackgroundImage from 'gatsby-background-image'
import Layout from '../components/Layout'
import '../sass/index.sass'

import { useTrail, a } from 'react-spring'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'gatsby'


function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 10, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 140 : 0,
    from: { opacity: 0, x: 40, height: 0 },
  })
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <a.div style={{ height }} key={index}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

const IndexPageTemplate = ({
  image,
  backgroundOffres,
  title,
  subtitle,
  citation,
  presentationItems,
  offreItems
}) => {
  const [open, set] = useState(true)
  return (
    <div>
      <div
        className="full-width-image margin-top-0"
        style={{
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <BackgroundImage className="full-width-image kenburns-bottom-right"
          tag='indexbackground'
          fluid={image.childImageSharp.fluid}
          style={{
            backgroundPosition: `bottom right`,
            backgroundAttachment: `fixed`,
            backgroundSize: 'cover',
            height: '100%'
          }}>
        </BackgroundImage>
      </div>
      <div className="clouds">
        <img src="../img/clouds/cloud1.png" alt="cloud" className="cloud"></img>
        <img src="../img/clouds/cloud2.png" alt="cloud" className="cloud"></img>
        <img src="../img/clouds/cloud3.png" alt="cloud" className="cloud"></img>
        <img src="../img/clouds/cloud4.png" alt="cloud" className="cloud"></img>
        <img src="../img/clouds/cloud5.png" alt="cloud" className="cloud"></img>
      </div>
      <div
        style={{
          display: 'flex',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <Trail open={open} onClick={() => set((state) => !state)}>
          <h1 className="index-title">{title}</h1>
          <h2 className="index-subtitle">{subtitle}</h2>
        </Trail>
      </div>
      <div className="index-citation"
        >
        <div className="citation-wrapper">
          <h2>"{citation.content}"</h2>
          <p>{citation.auteur}</p>
        </div>
      </div>
      <section className="section-presentation">
        <div className="presentation-items-wrapper">
          {presentationItems && presentationItems.map((item, index) => (
            <div key={item.titre} className={`presentation-item presentation-item-${index}`}>
              <Card className='mat-card'>
                <Link to={item.link} style={{textDecoration: 'unset', color: 'unset'}}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 200 }}
                    image={item.image.childImageSharp.fluid.src}
                    title={item.titre}
                  />
                  <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', flexDirection: 'column', textAlign: 'center' }}>
                    <h2>{item.titre}</h2>
                    <div style={{ color: 'hsl(141, 53%, 31%)', fontWeight: 300 }}>{item.description}</div>
                    <ul style={{paddingLeft: '0px', listStyleType: 'none'}}>
                      {item.bulletPoints.map((bulletpoint) => {
                        return <li key={bulletpoint}>{bulletpoint}</li>
                      })}
                    </ul>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button size="small" color="primary" className="btn-card">
                    <Link to={item.link} className="inner-link">En savoir plus !</Link>
                  </Button>
                </CardActions>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </section>
      <section className="section-offres"
        style={{
          backgroundImage: `url(${
            !!backgroundOffres.childImageSharp ? backgroundOffres.childImageSharp.fluid.src : backgroundOffres
            })`,
          backgroundPosition: `center`,
          backgroundAttachment: `fixed`,
          backgroundSize: 'cover',
        }}>
        <h2 className="offres-titre">Nos offres</h2>
        {offreItems && offreItems.map((item, index) => (
          <div key={item.titre} className="offres-item"
          style={{
            backgroundImage: `url(${
              !!item.image.childImageSharp ? item.image.childImageSharp.fluid.src : image
            })`,
            backgroundPosition: `center`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: 'white',
              width: '100%'
            }}>
              <div className='content-card' style={{
              }}>
                <h2>{item.titre}</h2>
              </div>
              <Button className='btn-card'>
                <Link to='/envol' className="inner-link">Se renseigner</Link>
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  backgroundOffres: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  citation: PropTypes.object,
  presentationItems: PropTypes.array,
  offreItems: PropTypes.array
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        backgroundOffres={frontmatter.backgroundOffres}
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        citation={frontmatter.citation}
        presentationItems={frontmatter.presentationItems}
        offreItems={frontmatter.offreItems}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subtitle
        citation {
          content
          auteur
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        backgroundOffres {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        presentationItems {
          titre
          description
          link
          bulletPoints
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        offreItems {
          titre
          description
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
