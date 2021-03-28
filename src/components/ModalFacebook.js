import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'
import '../sass/actu.sass'

async function getFacebookData() {
  const response = await fetch('https://graph.facebook.com/me?fields=posts{message,permalink_url,full_picture}', {
    method: 'GET',
    headers: {
      "Authorization": "Bearer EAAFUqULZCYXgBAMtLA58ZCs4UGZAwrQopuiA2YpzPHPo6pyb685T54SLFZCcdj8Fic8AopXqZC1PHuDYL3zoy7FvUf52fHeuVgmxCy4wLm53eI7tP0OmtS1i87ekJa00b1vodo3I35RHkzQJFte0wn10EcgdI4FyT0GLtEMptDIexJldK7mMIZBrhqRXHpKANveARl8fft3AZDZD"
    }
  })
  return response.json()
}

const ModalFacebookPage = () => {

  useEffect(()=>{
    getFacebookData().then((data)=>console.log(data))
  })

  return (
    <ModalRoutingContext.Consumer>
        {({ modal, closeTo }) => (
          <div className="modal-wrapper">
            {modal ? (
              <Link to={closeTo}>
                Close
              </Link>
            ) : (
              <header>
                <h1>
                  Website Title
                </h1>
              </header>
            )}

            <h2>Modal Page</h2>
          </div>
        )}
      </ModalRoutingContext.Consumer>
  )
}

export default ModalFacebookPage