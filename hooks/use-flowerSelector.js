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

// 預覽功能ok--------------------------------------------------------
// import { createContext, useContext, useState } from 'react'
// import { fabric } from 'fabric' // Ensure fabric is correctly imported

// const FlowerContext = createContext()

// export const useFlower = () => useContext(FlowerContext)

// export const FlowerProvider = ({ children }) => {
//   const [imageInfo, setImageInfo] = useState({ url: '', color: '', name: '' })
//   const [canvas, setCanvas] = useState(null)

//   const addImageToCanvas = (url, options) => {
//     if (!canvas) return
//     new fabric.Image.fromURL(url, (img) => {
//       img.set({
//         ...options,
//         scaleX: 0.5,
//         scaleY: 0.5,
//         left: 100,
//         top: 100,
//       })
//       canvas.add(img)
//       canvas.renderAll()
//     })
//   }

//   const clearCanvas = () => {
//     canvas && canvas.clear()
//   }

//   return (
//     <FlowerContext.Provider
//       value={{ setImageInfo, addImageToCanvas, clearCanvas, setCanvas }}
//     >
//       {children}
//     </FlowerContext.Provider>
//   )
// }

// import { createContext, useContext, useState, useRef } from 'react'
// import { fabric } from 'fabric' // 確保引入fabric

// const FlowerContext = createContext()

// export const useFlower = () => useContext(FlowerContext)

// export const FlowerProvider = ({ children }) => {
//   const [currentImage, setCurrentImage] = useState(null) // 用於儲存當前圖像的參照
//   const canvasRef = useRef(null)

//   const addImageToCanvas = (url, { color, name }) => {
//     if (canvasRef.current && url) {
//       new fabric.Image.fromURL(url, (img) => {
//         img.set({
//           left: 100,
//           top: 100,
//           scaleX: 0.5,
//           scaleY: 0.5,
//           name,
//           color,
//         })
//         canvasRef.current.add(img)
//         canvasRef.current.renderAll()
//         setCurrentImage(img) // 儲存當前圖像參照
//       })
//     }
//   }

//   const removeCurrentImage = () => {
//     if (canvasRef.current && currentImage) {
//       canvasRef.current.remove(currentImage)
//       canvasRef.current.renderAll()
//       setCurrentImage(null) // 清除儲存的圖像參照
//     }
//   }

//   return (
//     <FlowerContext.Provider
//       value={{ addImageToCanvas, removeCurrentImage, canvasRef }}
//     >
//       {children}
//     </FlowerContext.Provider>
//   )
// }

import { createContext, useContext, useCallback, useRef } from 'react'
import { fabric } from 'fabric' // 確保引入fabric

const FlowerContext = createContext()

export const useFlower = () => useContext(FlowerContext)

export const FlowerProvider = ({ children }) => {
  const canvasRef = useRef(null)
  const tempObjectRef = useRef(null) // 用於暫存當前預覽的圖片

  // 添加圖片至畫布並預覽
  const addImageToCanvas = useCallback((url, metadata) => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    // 移除當前預覽的圖片
    if (tempObjectRef.current) {
      canvas.remove(tempObjectRef.current)
    }

    new fabric.Image.fromURL(url, (img) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
        ...metadata,
      })
      canvas.add(img)
      canvas.renderAll()
      tempObjectRef.current = img // 更新暫存的當前預覽圖片
    })
  }, [])

  // 確認當前預覽圖片，並將其永久保存至畫布
  const commitImageToCanvas = useCallback(() => {
    tempObjectRef.current = null // 清空暫存
  }, [])

  // 清除當前預覽的圖片
  const removeCurrentImage = useCallback(() => {
    if (canvasRef.current && tempObjectRef.current) {
      canvasRef.current.remove(tempObjectRef.current)
      canvasRef.current.renderAll()
      tempObjectRef.current = null
    }
  }, [])

  // 清除整個畫布
  const clearCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.clear()
    }
  }, [])

  // 快照畫布
  const snapshotCanvas = useCallback(() => {
    return canvasRef.current?.toDataURL()
  }, [])

  return (
    <FlowerContext.Provider
      value={{
        addImageToCanvas,
        commitImageToCanvas,
        removeCurrentImage,
        clearCanvas,
        snapshotCanvas,
        canvasRef,
      }}
    >
      {children}
    </FlowerContext.Provider>
  )
}
