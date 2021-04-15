import React, { useState, useEffect, useCallback } from 'react'
import { useSpring, useTransition, animated } from "react-spring";

import '../sass/actu.sass'

const SpringSlider = ({data}) => {
  const [posts, setPosts] = useState(data) 
  const getIllustrationsNodes = () => {
    let pagesArray = [];

    for (let i = 0, len = data.length; i < len; i++) {
        pagesArray.push(data[i].full_picture)
    }
    return pagesArray
  }
  const [illustrationsNodes, setIllustrationsNodes] = useState(getIllustrationsNodes())

  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % illustrationsNodes.length), [])

  const transitions = useTransition(index, p => p, {
      from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  useEffect(()=>{
      console.log('posts :', posts)
  }, [data])
  
  return (
    <div className="simple-trans-main" onClick={onClick}>
        {illustrationsNodes.length > 1 ? transitions.map(({ item, props, key }) => {
            return <animated.div key={key} className="img-wrapper" style={props}><div className="img-wrapper" style={{ cursor: 'pointer' }}><img src={illustrationsNodes[0]} style={{ height: '100%' }} /></div></animated.div>
        }) : <animated.div className="img-wrapper"><img src={illustrationsNodes[0]} style={{ height: '100%' }} /></animated.div>}
    </div>
  )
}

export default SpringSlider