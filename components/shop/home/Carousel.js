import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image'

const banners = [
  {
    url: 'https://blog.currentcatalog.com/wp-content/uploads/2019/09/AdobeStock_269466462.jpeg',
  },
  {
    url: 'https://blog.currentcatalog.com/wp-content/uploads/2019/09/AdobeStock_234433400-1024x684.jpeg',
  },
]

function Carousel() {
  return (
    <div className="slide-container">
      <Fade>
        {banners.map((image, index) => (
          <div key={index} className="mx-0 sm:mx-8">
            <div
              className="h-96 sm:h-80 md:h-72 lg:h-60 xl:h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              {/* Optionally, you can add a caption */}
              {/* <p>{image.caption}</p> */}
            </div>
          </div>
        ))}
      </Fade>
    </div>
  )
}

export default Carousel
