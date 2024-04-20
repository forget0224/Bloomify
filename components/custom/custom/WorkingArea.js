// // 在 components/WorkingArea.js 中
// import React from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
// import { useFlower } from '@/hooks/use-flowerSelector'
// export default function WorkingArea() {
//   const { editor, onReady } = useFabricJSEditor()
//   const { addImageToCanvas } = useFlower()
//   const onAddCircle = () => {
//     editor.addCircle()
//   }
//   const onAddRectangle = () => {
//     editor.addRectangle()
//   }

//   const onCanvasReady = (canvas) => {
//     // 設定 Canvas 寬度和高度
//     canvas.setWidth(400)
//     canvas.setHeight(400)
//     onReady(canvas)
//   }
//   return (
//     <>
//       <div className="App">
//         <h1>FabricJS React Sample</h1>
//         <button onClick={onAddCircle}>Add circle</button>
//         <button onClick={onAddRectangle}>Add Rectangle</button>
//         <FabricJSCanvas className="sample-canvas " onReady={onCanvasReady} />
//       </div>
//     </>
//   )
// }

// src/components/WorkingArea.js
// import React, { useEffect, useRef } from 'react'
// import { fabric } from 'fabric'
// import { useFlower } from '@/hooks/use-flowerSelector'

// const WorkingArea = () => {
//   const { addImageToCanvas } = useFlower()
//   const canvasRef = useRef(null)
//   const editor = useRef(null)

//   useEffect(() => {
//     editor.current = new fabric.Canvas(canvasRef.current, {
//       width: 800,
//       height: 600,
//     })
//   }, [])

//   return (
//     <div>
//       <canvas ref={canvasRef} />
//       {/* 這裡可以添加更多的 UI 元素或控制元件 */}
//     </div>
//   )
// }

// export default WorkingArea

// 'https://linefriends.tw/cdn/shop/files/CE0111110060-1.jpg?v=1698237729&width=1024',
// WorkingArea.js
// WorkingArea.js

// wotkingArea  是好的區塊------------------------------------------------------------------------
// import React, { useEffect } from 'react'
// import { useFlower } from '@/hooks/use-flowerSelector'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

// const WorkingArea = () => {
//   const { editor, onReady } = useFabricJSEditor()
//   const { imageInfo } = useFlower()

//   const onCanvasReady = (canvas) => {
//     // 設定 Canvas 寬度和高度
//     canvas.setWidth(400)
//     canvas.setHeight(400)
//     onReady(canvas)
//   }
//   useEffect(() => {
//     if (editor && imageInfo.url) {
//       new fabric.Image.fromURL(imageInfo.url, (img) => {
//         img.set({
//           left: 100,
//           top: 100,
//           scaleX: 0.5,
//           scaleY: 0.5,
//         })
//         editor.canvas.add(img)
//         editor.canvas.renderAll()
//       })
//     }
//   }, [editor, imageInfo, imageInfo.url]) // 監聽 imageInfo 的變化來更新畫布

//   return (
//     <div>
//       <FabricJSCanvas className="sample-canvas" onReady={onCanvasReady} />
//     </div>
//   )
// }

// export default WorkingArea

import React from 'react'
import { useFlower } from '@/hooks/use-flowerSelector'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

const WorkingArea = () => {
  const { editor, onReady } = useFabricJSEditor()
  const { setCanvas } = useFlower()

  const handleCanvasReady = (canvas) => {
    canvas.setWidth(500)
    canvas.setHeight(500)
    setCanvas(canvas) // Save the canvas in the context
  }

  return (
    <div>
      <FabricJSCanvas className="sample-canvas" onReady={handleCanvasReady} />
    </div>
  )
}

export default WorkingArea
