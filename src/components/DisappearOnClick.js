import React, { useState, useEffect } from 'react'
import { useSpring, animated as a, config } from "react-spring";
import useMeasure from 'react-use-measure'


const DisappearOnClick = ({ children, key, index = 1}) => {

    const [open, toggle] = useState(true)
    const [ref, { height }] = useMeasure()
    const [style, spring] = useSpring(()=>({
        delay : 250 * index,
        config: config.gentle,
        to: async (next, cancel) => {
          await next({ opacity: 1, maxHeight: 500, left: 0 })
        },
        from: { opacity: 0, maxHeight: 500, left: -500 }
      }))

      useEffect(()=>{
          console.log(index)
      }, [])

    return (
        <div>
            <a.div ref={ref} key={key}
            style={{...style, width: '100%', position: 'relative', cursor: 'pointer', justifyContent: 'center', alignItems: 'center', display: 'flex'}}
            onClick={() => spring.start({
                config: config.default,
                to: async (next, cancel) => {
                  await next({ opacity: 0, maxHeight: 0, left: 0 })
                },
              })}>
                {children}
            </a.div>
        </div>
    )
}

export default DisappearOnClick
