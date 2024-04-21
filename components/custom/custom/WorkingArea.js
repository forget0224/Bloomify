// import React from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
// import { useFlower } from '@/hooks/use-flowerSelector'

// const WorkingArea = () => {
//   const { editor, onReady } = useFabricJSEditor()
//   const { canvasRef } = useFlower()

//   // 畫布就緒時設定其參照
//   const handleCanvasReady = (canvas) => {
//     canvas.setWidth(200)
//     canvas.setHeight(200)
//     canvasRef.current = canvas // 將畫布參照儲存至 hook

//     onReady(canvas)
//   }

//   return (
//     <div>
//       <FabricJSCanvas className="sample-canvas" onReady={handleCanvasReady} />
//     </div>
//   )
// }

// export default WorkingArea

// import React, { useEffect } from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
// import { useFlower } from '@/hooks/use-flower'

// const WorkingArea = () => {
//   const { editor, onReady } = useFabricJSEditor()
//   const { canvasRef } = useFlower()

//   // 當畫布就緒時創建菱形剪切路徑並顯示邊框
//   const handleCanvasReady = (canvas) => {
//     canvas.setWidth(500)
//     canvas.setHeight(500)
//     canvasRef.current = canvas
//     onReady(canvas)

//     // 定義菱形的頂點
//     const points = [
//       { x: canvas.width / 2, y: 0 },
//       { x: canvas.width - 50, y: canvas.height / 3 },
//       { x: canvas.width / 2, y: canvas.height / 3 + 20 },
//       { x: 50, y: canvas.height / 3 },
//     ]

//     // 創建菱形剪切路徑
//     const diamondClip = new fabric.Polygon(points, {
//       originX: 'center',
//       originY: 'center',
//       absolutePositioned: true,
//       selectable: false,
//       evented: false,
//     })

//     // 設置畫布的剪切路徑
//     canvas.clipPath = diamondClip

//     // 在畫布上繪製菱形邊框，僅用於視覺效果
//     const diamondBorder = new fabric.Polygon(points, {
//       fill: 'transparent',
//       stroke: 'red',
//       strokeWidth: 2,
//       selectable: false,
//       evented: false,
//     })
//     canvas.add(diamondBorder)
//     canvas.renderAll()
//   }

//   return (
//     <div>
//       <FabricJSCanvas className="sample-canvas" onReady={handleCanvasReady} />
//     </div>
//   )
// }

// export default WorkingArea
// import React from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
// import { useFlower } from '@/hooks/use-flower'

// const WorkingArea = () => {
//   const { editor, onReady } = useFabricJSEditor()
//   const { canvasRef, addImageToCanvas, setupCustomControls } = useFlower()

//   const handleCanvasReady = (canvas) => {
//     if (!editor || !editor.canvas) {
//       console.error('Editor or editor canvas is not initialized')
//       return
//     }
//     editor.canvas.setWidth(500)
//     editor.canvas.setHeight(500)
//     canvasRef.current = editor.canvas
//     setupCustomControls(editor.canvas)

//     // 繪製其他元素，如特殊形狀等
//     defineAndDrawShapes(editor.canvas)
//   }

//   const defineAndDrawShapes = (canvas) => {
//     const points = [
//       { x: canvas.width / 2, y: 0 },
//       { x: canvas.width - 50, y: canvas.height / 3 },
//       { x: canvas.width / 2, y: canvas.height / 3 + 20 },
//       { x: 50, y: canvas.height / 3 },
//     ]

//     const diamondClip = new fabric.Polygon(points, {
//       originX: 'center',
//       originY: 'center',
//       absolutePositioned: true,
//       selectable: false,
//       evented: false,
//     })

//     canvas.clipPath = diamondClip

//     const diamondBorder = new fabric.Polygon(points, {
//       fill: 'transparent',
//       stroke: 'red',
//       strokeWidth: 2,
//       selectable: false,
//       evented: false,
//     })

//     canvas.add(diamondBorder)
//     canvas.renderAll()
//   }

//   return (
//     <div>
//       <FabricJSCanvas className="sample-canvas" onReady={handleCanvasReady} />
//     </div>
//   )
// }

// export default WorkingArea

// 最新版本菱形ok
// import React, { useEffect, useRef } from 'react'
// import { useFlower } from '@/hooks/use-flower'
// import { fabric } from 'fabric'

// const WorkingArea = () => {
//   const { canvasRef, setupCustomControls } = useFlower()

//   useEffect(() => {
//     if (canvasRef.current && !canvasRef.current.fabric) {
//       // 确保只初始化一次
//       const canvas = new fabric.Canvas(canvasRef.current)
//       canvas.setWidth(500)
//       canvas.setHeight(500)
//       setupCustomControls(canvas)
//       defineAndDrawShapes(canvas)

//       // 将 fabric canvas 实例保存回 ref，以便其他函数可以访问
//       canvasRef.current.fabric = canvas
//     }
//   }, [canvasRef, setupCustomControls])

//   const defineAndDrawShapes = (canvas) => {
//     const points = [
//       { x: canvas.width / 2, y: 0 },
//       { x: canvas.width - 50, y: canvas.height / 3 },
//       { x: canvas.width / 2, y: canvas.height / 3 + 20 },
//       { x: 50, y: canvas.height / 3 },
//     ]

//     const diamondClip = new fabric.Polygon(points, {
//       originX: 'center',
//       originY: 'center',
//       absolutePositioned: true,
//       selectable: false,
//       evented: false,
//     })

//     canvas.clipPath = diamondClip

//     const diamondBorder = new fabric.Polygon(points, {
//       fill: 'transparent',
//       stroke: 'red',
//       strokeWidth: 2,
//       selectable: false,
//       evented: false,
//     })

//     canvas.add(diamondBorder)
//     canvas.renderAll()
//   }

//   return (
//     <div>
//       <canvas ref={canvasRef} className="sample-canvas" />
//     </div>
//   )
// }

// export default WorkingArea
import React, { useEffect } from 'react'
import { fabric } from 'fabric'
import { useFlower } from '@/hooks/use-flower' // 确保路径正确

const WorkingArea = () => {
  const { canvasRef, setupCustomControls } = useFlower()

  useEffect(() => {
    if (canvasRef.current && !canvasRef.current.fabric) {
      const canvas = new fabric.Canvas(canvasRef.current)
      canvas.setWidth(500)
      canvas.setHeight(500)
      setupCustomControls(canvas)
      defineAndDrawShapes(canvas)

      // 将 fabric canvas 实例保存回 ref，以便其他函数可以访问
      canvasRef.current.fabric = canvas
    }
  }, [canvasRef, setupCustomControls])

  const defineAndDrawShapes = (canvas) => {
    const svgPathData =
      'M21.4028 96.3182L3.00089 84.0454C-5.5 70 10.6848 54.275 33.5009 34.5C51.3336 19.0441 113.722 7.78693 192.171 1.10342C211.913 -0.57848 310.872 18.3129 334.459 53.5016C356.8 86.8311 357.372 115.323 352.501 122C348.604 127.342 340.099 134.5 340.099 134.5C344.97 143.574 347.278 156.941 340.099 160.845C332.921 164.748 313.693 162.471 304.976 160.845L290.363 155.965C284.637 151.514 270.417 141.84 259.342 138.758C248.266 135.676 254.727 143.98 259.342 148.517C249.497 158.995 223.62 161.101 211.913 160.845C211.913 160.845 108.081 155.965 55.782 128.742C55.782 128.742 21.4028 116.096 21.4028 96.3182Z'

    const clipPath = new fabric.Path(svgPathData, {
      fill: 'transparent', // 设置为透明以使剪切路径不可见
      stroke: 'transparent', // 边框颜色设置为透明，因为这只是剪切路径
      strokeWidth: 0, // 边框宽度为 0
      selectable: false,
      evented: false,
      absolutePositioned: true,
    })

    // 设置画布的剪切路径
    canvas.clipPath = clipPath

    // 创建一个与剪切路径相同的可视化路径，只用于显示边界
    const visualPath = new fabric.Path(svgPathData, {
      fill: 'transparent', // 填充透明
      stroke: 'red', // 边框颜色红色
      strokeWidth: 1, // 边框宽度 1
      selectable: false,
      evented: false,
    })
    clipPath.set({
      left: 83,
      top: 35,
    })

    visualPath.set({
      left: 83,
      top: 35,
    })
    // 添加可视化路径到画布上
    canvas.add(visualPath)

    // 重新渲染画布以应用剪切路径和可视化路径
    canvas.renderAll()
  }

  return (
    <div>
      <canvas ref={canvasRef} className="sample-canvas" />
    </div>
  )
}

export default WorkingArea
