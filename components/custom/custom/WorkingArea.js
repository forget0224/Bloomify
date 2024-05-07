import React, { useEffect, useCallback, useState, useRef } from 'react'
import { fabric } from 'fabric'
import { useFlower } from '@/hooks/use-flower'
import { useFlowerCart } from '@/hooks/use-flowerCart'
const WorkingArea = () => {
  const {
    canvasRef,
    setupCustomControls,
    imagesInfo,
    setImagesInfo,
    addImageToCanvas,
    snapshotCanvas,
    commitImageToCanvas,
    tempObjectRef,
  } = useFlower()

  const [canvasReady, setCanvasReady] = useState(false)
  const { dispatch, state } = useFlowerCart()
  // const updateImagesInfoOnCanvas = useCallback(
  //   (obj) => {
  //     const canvas = canvasRef.current.fabric

  //     const centerX = canvas.width / 2
  //     const centerY = canvas.height / 4
  //     const existingIndex = imagesInfo.findIndex((info) => info.id === obj.id)
  //     if (existingIndex !== -1) {
  //       const updatedInfo = {
  //         ...imagesInfo[existingIndex],
  //         left: obj.left - centerX,
  //         top: obj.top - centerY,
  //         scaleX: obj.scaleX,
  //         scaleY: obj.scaleY,
  //         angle: obj.angle,
  //       }
  //       const newImagesInfo = [...imagesInfo]
  //       newImagesInfo[existingIndex] = updatedInfo
  //       setImagesInfo(newImagesInfo)
  //     } else {
  //       console.error(
  //         'No matching ID found in imagesInfo, this should not happen during move.'
  //       )
  //     }
  //   },
  //   [imagesInfo, setImagesInfo, canvasRef]
  // )
  const updateImagesInfoOnCanvas = useCallback(
    (obj) => {
      const canvas = canvasRef.current?.fabric
      if (!canvas) {
        console.error('Canvas is not initialized.')
        return
      }

      const centerX = canvas.width / 2
      const centerY = canvas.height / 4
      const existingIndex = imagesInfo.findIndex((info) => info.id === obj.id)

      if (existingIndex !== -1) {
        const updatedInfo = {
          ...imagesInfo[existingIndex],
          left: obj.left - centerX,
          top: obj.top - centerY,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          angle: obj.angle,
        }
        const newImagesInfo = [...imagesInfo]
        newImagesInfo[existingIndex] = updatedInfo
        setImagesInfo(newImagesInfo)
      } else {
        console.error(
          `No matching ID found in imagesInfo for ID ${obj.id}. This should not happen during move.`
        )
      }
    },
    [imagesInfo, setImagesInfo, canvasRef]
  )

  useEffect(() => {
    if (
      state.products &&
      state.products.length > 0 &&
      imagesInfo.length === 0
    ) {
      const productPayload = []

      state.products.forEach((product) => {
        if (product.positions && product.positions.length > 0) {
          product.positions.forEach((pos) => {
            productPayload.push({
              id: `img_${Date.now()}_${Math.random().toString(16).slice(2)}`,
              product_id: product.product_id,
              name: product.product_name || product.name,
              product_price: product.product_price,
              url: product.image_url,
              color: product.color,
              left: pos.left || 0,
              top: pos.top || 0,
              zIndex: pos.zIndex || 0,
              angle: pos.rotate || 0,
            })
          })
        }
      })

      setImagesInfo(productPayload)

      dispatch({
        type: 'CLEAR_PRODUCTS',
      })
    }
  }, [])
  fabric.Object.prototype.shouldDrawControls = function () {
    return this.hasControls && !this.group
  }
  fabric.Object.prototype.drawBorders = function (ctx) {
    const scaleX = this.scaleX,
      scaleY = this.scaleY,
      width = this.width * scaleX,
      height = this.height * scaleY
    ctx.save()
    ctx.strokeStyle = '#FF7C7C'
    ctx.lineWidth = 1 / this.borderScaleFactor
    ctx.setLineDash(this.borderDashArray || [5, 5])
    ctx.translate(this.left, this.top)
    ctx.rotate((this.angle * Math.PI) / 180)
    ctx.strokeRect(-width / 2, -height / 2, width, height)
    ctx.restore()
  }

  useEffect(() => {
    const canvasContainer = canvasRef.current.parentElement

    const setCanvasSize = () => {
      if (canvasContainer) {
        const width = canvasContainer.clientWidth
        const height = canvasContainer.clientHeight
        canvas.setWidth(width)
        canvas.setHeight(height)
        defineAndDrawShapes(canvas, width, height)
        fabric.Image.fromURL('/custom/custom/canvasBg.png', function (img) {
          img.selectable = false
          img.evented = false
          const canvasRatio = width / height
          const imgRatio = img.width / img.height

          if (canvasRatio < imgRatio) {
            img.scaleToWidth(canvas.width)
          } else {
            img.scaleToHeight(canvas.height)
          }
          img.set({
            originX: 'center',
            originY: 'center',
            left: canvas.width / 2,
            top: canvas.height / 2,
            selectable: false,
          })

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
        })
      }
    }

    let canvas = canvasRef.current?.fabric
    if (!canvas) {
      canvas = new fabric.Canvas(canvasRef.current)
      setCanvasSize()
      setupCustomControls(canvas)
      canvasRef.current.fabric = canvas
    }

    const centerX = canvas.width / 2
    const centerY = canvas.height / 4
    if (canvas && canvas.getObjects().length === 0 && imagesInfo.length > 0) {
      console.log(imagesInfo)
      imagesInfo.forEach((img) => {
        addImageToCanvas(img.url, {
          ...img,
          left: img.left + centerX,
          top: img.top + centerY,
        })
      })
      if (tempObjectRef.current) {
        commitImageToCanvas(tempObjectRef.current)
      }
    }

    canvas.on('object:modified', (e) => updateImagesInfoOnCanvas(e.target))
    canvas.on('object:moving', (e) => updateImagesInfoOnCanvas(e.target))
    canvas.on('after:render', () => {
      canvas.forEachObject((obj) => {
        if (obj.active || canvas.getActiveObject() === obj) {
          if (obj.hasBorders || obj.hasControls) {
            setCanvasReady(true)
            obj.drawBorders(canvas.contextContainer)
            obj.drawControls(canvas.contextContainer)
          }
        }
      })
    })

    return () => {
      canvas.off('object:modified')
      canvas.off('object:moving')
      canvas.off('after:render')

      // const urlWorkingArea = snapshotCanvas()

      // if (urlWorkingArea) {
      //   dispatch({
      //     type: 'SET_BOUQUET_INFO',
      //     payload: {
      //       image_url: urlWorkingArea,
      //     },
      //   })
      // }
    }
  }, [
    canvasRef,
    setupCustomControls,
    updateImagesInfoOnCanvas,
    imagesInfo,
    addImageToCanvas,
    canvasReady,
  ])

  const defineAndDrawShapes = (canvas, width, height) => {
    const svgPathData =
      'M87 181C87 181 24 163.278 24 143.5C24 143.5 25 134.5 20.5 132C16 129.5 11.3577 129.257 5.49972 127.5C-3.00116 113.455 -3.04316 89.4992 44.4472 45.4999C84.9247 7.99786 151.448 1.00168 209.948 1C268.448 0.998316 332.64 17.7561 362.958 60.003C390.947 99.0029 391.5 164 370.5 174C364.53 176.843 373 197 373 197C373 211.5 348 208.967 348 208.967C348 208.967 325.5 189.033 333 208C333 211 327.929 208.967 325 208.967C321 208 318.5 197 308.5 193.5C257.555 175.669 282.385 192.463 287 197C277.155 207.478 238.708 208.257 227 208C227 208 139.299 208.223 87 181Z'

    const scale = width < 500 ? 0.87 : 1
    const left = width < 500 ? 22 : 64
    const top = width < 500 ? 53 : 0
    const visualPath = new fabric.Path(svgPathData, {
      fill: 'rgba(228, 228, 228, 0.50)',
      stroke: 'transparent',
      strokeWidth: 1,
      selectable: false,
      evented: false,
      scaleX: scale,
      scaleY: scale,
      left: left,
      top: top,
    })

    canvas.visualPath = visualPath

    canvas.on('selection:created', () => {
      canvas.add(canvas.visualPath)
      canvas.renderAll()
    })

    canvas.on('selection:cleared', () => {
      canvas.remove(canvas.visualPath)
      canvas.renderAll()
    })

    canvas.on('object:added', (e) => {
      if (e.target.type === 'image' && !e.target.background) {
        const objClipPath = new fabric.Path(svgPathData, {
          fill: 'transparent',
          stroke: 'transparent',
          strokeWidth: 0,
          selectable: false,
          evented: false,
          absolutePositioned: true,
          scaleX: scale,
          scaleY: scale,
          left: left,
          top: top,
        })
        e.target.clipPath = objClipPath
        canvas.requestRenderAll()
      }
    })
  }
  // useEffect(() => {
  //   return () => {
  //     const canvas = canvasRef.current?.fabric
  //     if (canvas) {
  //       // 確保在快照前取消所有物件的選取
  //       if (canvas.visualPath) {
  //         canvas.remove(canvas.visualPath)
  //       }
  //       canvas.renderAll()
  //       const urlWorkingArea = snapshotCanvas()
  //       console.log('Canvas URL:', urlWorkingArea)
  //       if (urlWorkingArea) {
  //         dispatch({
  //           type: 'SET_BOUQUET_INFO',
  //           payload: {
  //             image_url: urlWorkingArea,
  //           },
  //         })
  //       }
  //     }
  //   }
  // }, [snapshotCanvas, canvasRef]) // 依賴列表確保只有相關依賴變更時才重新訂閱

  useEffect(() => {
    const handleResize = () => {
      let canvas = canvasRef.current?.fabric
      if (canvas) {
        canvas.dispose()
        canvasRef.current.fabric = null
      }
      setTimeout(() => {
        setCanvasReady(false)
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  )
}

export default WorkingArea
