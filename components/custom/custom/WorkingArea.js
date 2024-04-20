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

import React, { useEffect } from 'react'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useFlower } from '@/hooks/use-flower'

const WorkingArea = () => {
  const { editor, onReady } = useFabricJSEditor()
  const { canvasRef } = useFlower()

  // 當畫布就緒時創建菱形剪切路徑並顯示邊框
  const handleCanvasReady = (canvas) => {
    canvas.setWidth(500)
    canvas.setHeight(500)
    canvasRef.current = canvas
    onReady(canvas)

    // 定義菱形的頂點
    const points = [
      { x: canvas.width / 2, y: 0 },
      { x: canvas.width - 50, y: canvas.height / 3 },
      { x: canvas.width / 2, y: canvas.height / 3 + 20 },
      { x: 50, y: canvas.height / 3 },
    ]

    // 創建菱形剪切路徑
    const diamondClip = new fabric.Polygon(points, {
      originX: 'center',
      originY: 'center',
      absolutePositioned: true,
      selectable: false,
      evented: false,
    })

    // 設置畫布的剪切路徑
    canvas.clipPath = diamondClip

    // 在畫布上繪製菱形邊框，僅用於視覺效果
    const diamondBorder = new fabric.Polygon(points, {
      fill: 'transparent',
      stroke: 'red',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    })
    canvas.add(diamondBorder)
    canvas.renderAll()
  }

  return (
    <div>
      <FabricJSCanvas className="sample-canvas" onReady={handleCanvasReady} />
    </div>
  )
}

export default WorkingArea
