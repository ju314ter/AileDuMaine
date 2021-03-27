import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ContactButton from '../components/ContactButton'

import './all.scss'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import sal from 'sal.js'

import { useScrollPosition } from '../hooks/useScrollPosition'
import useMeasure from 'react-use-measure'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()

  const [refPage, boundsClient] = useMeasure()
  const [collapsedMenu, setCollapsedMenu] = useState(false)
  useEffect(()=>{
    boundsClient.width <= 850 ? setCollapsedMenu(true) : setCollapsedMenu(false)
    console.log(collapsedMenu)
  },[boundsClient.width, collapsedMenu])

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y || currPos.y === 0
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    null,
    false,
    300
  )


  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <ContactButton />
      <Navbar show={hideOnScroll} collapse={collapsedMenu}/>
      <div ref={refPage}>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
