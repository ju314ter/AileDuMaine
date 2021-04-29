import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { navigate } from "gatsby"  
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'
import useMeasure from 'react-use-measure'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import '../sass/actu.sass'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CircularProgress from '@material-ui/core/CircularProgress';

const getFacebookData = () => {
  return fetch('https://graph.facebook.com/me?fields=posts{message,permalink_url,full_picture}', {
    method: 'GET',
    headers: {
      "Authorization": "Bearer EAAFUqULZCYXgBAOO15qjCVAzbbLuIkA2ZCZAOQrLNh2rFGKgcU24bM0cHZBSZBrJIFgpPKelt65qFjv0htYWNIKfYyHGg0ZAt0NOcv4BSiNr8OvJVE2HKGZCgvANiU0zBRdaZByG0K0xyuSYcVdl6uPHPAmaQ6fxnybCdpteseS3SgZDZD"
    }
  })
}

const ModalFacebookPage = () => {

  const [facebookData, setFacebookData] = useState([])
  const [refCallback, bounds] = useMeasure()
  const [isDataReady, setDataReady] = useState(false)
  
  useEffect(()=>{
    getFacebookData().then((data)=>data.json()).then(({posts})=>{
      let i = 0;
      while(i < posts.data.length) {
        posts.data[i].full_picture && posts.data[i].full_picture !== "undefined" ? i++ : posts.data.splice(i, 1) && i++
      }
      return posts.data
    }).then((filteredData)=>{
      setFacebookData(filteredData)
      setDataReady(true)
    })
  }, [])

  useEffect(()=>{
    console.log(facebookData)
  }, [facebookData])
  
  return (
    <ModalRoutingContext.Consumer>
        {({ modal, closeTo }) => (
          <div className="modal-wrapper" ref={refCallback}>
            {modal && isDataReady ? (

              <CarouselProvider
              naturalSlideWidth={bounds.width}
              naturalSlideHeight={bounds.height}
              totalSlides={facebookData.length}
              className="provider-carousel"
            >
              <Slider className="slider-carousel">
                { facebookData && facebookData.map((post, index)=>{
                  return (
                  <a style={{color: 'black'}} href={post.permalink_url}>
                    <Slide index={index} className="slide-carousel">
                      {post.message ? <div className="slide-message">
                        {post.message}
                      </div> : null }
                      <div className="slide-content" style={{backgroundImage: `url(${post.full_picture})`}}>

                      </div>
                    </Slide>
                  </a>
                  )
                })}
              </Slider>
              <ButtonBack className="back-button"><NavigateBeforeIcon /></ButtonBack>
              <ButtonNext className="next-button"><NavigateNextIcon /></ButtonNext>
              <DotGroup className="dotgroup-carousel"/>
            </CarouselProvider>

            ) : modal && !isDataReady ? (
                <div className="loading-wrapper">
                  <CircularProgress/>
                </div>
            ) : navigate('/')}
          </div>
        )}
      </ModalRoutingContext.Consumer>
  )
}

export default ModalFacebookPage