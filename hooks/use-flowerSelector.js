// import React, { createContext, useContext, useState } from 'react'

// const FlowerContext = createContext()

// export const useFlower = () => useContext(FlowerContext)

// export const FlowerProvider = ({ children }) => {
//   const [imageInfo, setImageInfo] = useState({ url: '', color: '', name: '' })

//   return (
//     <FlowerContext.Provider value={{ imageInfo, setImageInfo }}>
//       {children}
//     </FlowerContext.Provider>
//   )
// }
import { createContext, useContext, useState } from 'react'
import { fabric } from 'fabric' // Ensure fabric is correctly imported

const FlowerContext = createContext()

export const useFlower = () => useContext(FlowerContext)

export const FlowerProvider = ({ children }) => {
  const [imageInfo, setImageInfo] = useState({ url: '', color: '', name: '' })
  const [canvas, setCanvas] = useState(null)

  const addImageToCanvas = (url, options) => {
    if (!canvas) return
    new fabric.Image.fromURL(url, (img) => {
      img.set({
        ...options,
        scaleX: 0.5,
        scaleY: 0.5,
        left: 100,
        top: 100,
      })
      canvas.add(img)
      canvas.renderAll()
    })
  }

  const clearCanvas = () => {
    canvas && canvas.clear()
  }

  return (
    <FlowerContext.Provider
      value={{ setImageInfo, addImageToCanvas, clearCanvas, setCanvas }}
    >
      {children}
    </FlowerContext.Provider>
  )
}
