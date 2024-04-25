import React, { useEffect, useCallback, useState } from 'react'
import { fabric } from 'fabric'
import { useFlower } from '@/hooks/use-flower'

const WorkingArea = () => {
  const {
    canvasRef,
    setupCustomControls,
    imagesInfo,
    setImagesInfo,
    addImageToCanvas,
  } = useFlower()

  const [canvasReady, setCanvasReady] = useState(false)

  const updateImagesInfoOnCanvas = useCallback(
    (obj) => {
      if (!canvasRef.current || !canvasRef.current.fabric.clipPath) {
        console.error('Clip path not found.')
        return
      }
      const clipBounds = canvasRef.current.fabric.clipPath.getBoundingRect()
      const centerLeft = clipBounds.left + clipBounds.width / 2
      const centerTop = clipBounds.top + clipBounds.height / 2

      const updatedInfo = {
        id: obj.id,
        name: obj.name,
        url: obj.url,
        left: obj.left - centerLeft,
        top: obj.top - centerTop,
        angle: obj.angle,
        zIndex: obj.zIndex,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
        originX: 'center',
        originY: 'center',
      }

      const foundIndex = imagesInfo.findIndex((info) => info.id === obj.id)
      if (foundIndex !== -1) {
        const newImagesInfo = [...imagesInfo]
        newImagesInfo[foundIndex] = updatedInfo
        setImagesInfo(newImagesInfo)
      } else {
        console.error(
          'No matching ID found in imagesInfo, this should not happen during move.'
        )
      }
    },
    [imagesInfo, setImagesInfo, canvasRef]
  )

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

  // useEffect(() => {
  //   const canvasContainer = canvasRef.current.parentElement
  //   const setCanvasSize = () => {
  //     if (canvasContainer) {
  //       const width = canvasContainer.clientWidth
  //       const height = canvasContainer.clientHeight

  //       canvas.setWidth(width)
  //       canvas.setHeight(height)
  //       defineAndDrawShapes(canvas, width, height)
  //     }
  //   }
  //   let canvas = canvasRef.current?.fabric
  //   if (!canvas) {
  //     canvas = new fabric.Canvas(canvasRef.current)

  //     setCanvasSize()
  //     setupCustomControls(canvas)

  //     canvasRef.current.fabric = canvas
  //   }

  //   if (canvas.getObjects().length === 0 && imagesInfo.length > 0) {
  //     // 画布上没有对象，且 imagesInfo 不为空
  //     imagesInfo.forEach((img) => {
  //       new fabric.Image.fromURL(img.url, (image) => {
  //         // 设置图像的属性
  //         image.set({
  //           left: img.left,
  //           top: img.top,
  //           scaleX: img.scaleX,
  //           scaleY: img.scaleY,
  //           angle: img.angle,
  //           hasControls: true,
  //           hasBorders: true,
  //           selectable: true,
  //         })
  //         // 将图像添加到画布
  //         canvas.add(image)
  //       })
  //     })
  //   }

  //   // window.addEventListener('resize', setCanvasSize)
  //   canvas.on('object:modified', (e) => updateImagesInfoOnCanvas(e.target))
  //   canvas.on('object:moving', (e) => updateImagesInfoOnCanvas(e.target))

  //   canvas.on('after:render', function () {
  //     this.forEachObject((obj) => {
  //       if (obj.active || this.getActiveObject() === obj) {
  //         if (obj.hasBorders || obj.hasControls) {
  //           obj.drawBorders(this.contextContainer)
  //           obj.drawControls(this.contextContainer)
  //         }
  //       }
  //     })
  //   })
  //   canvas.renderAll()
  //   return () => {
  //     canvas.off('object:modified')
  //     canvas.off('object:moving')
  //     canvas.off('after:render')
  //   }
  // }, [canvasRef, setupCustomControls, updateImagesInfoOnCanvas])
  // useEffect(() => {
  //   const canvasContainer = canvasRef.current.parentElement
  //   const setCanvasSize = () => {
  //     if (canvasContainer) {
  //       const width = canvasContainer.clientWidth
  //       const height = canvasContainer.clientHeight
  //       canvas.setWidth(width)
  //       canvas.setHeight(height)
  //       defineAndDrawShapes(canvas, width, height)
  //     }
  //   }

  //   let canvas = canvasRef.current?.fabric
  //   if (!canvas) {
  //     canvas = new fabric.Canvas(canvasRef.current)
  //     setCanvasSize()
  //     setupCustomControls(canvas)
  //     canvasRef.current.fabric = canvas
  //   }

  //   if (canvas && canvas.getObjects().length === 0 && imagesInfo.length > 0) {
  //     imagesInfo.forEach((img) => {
  //       addImageToCanvas(img.url, {
  //         url: img.url,
  //         left: img.left,
  //         top: img.top,
  //         scaleX: img.scaleX,
  //         scaleY: img.scaleY,
  //         angle: img.angle,
  //         id: img.id,
  //         name: img.name,
  //         zIndex: img.zIndex,
  //         originX: 'center',
  //         originY: 'center',
  //         lockScalingX: img.lockScalingX,
  //         lockScalingY: img.lockScalingY,
  //       })
  //     })
  //   }

  //   canvas.on('object:modified', (e) => updateImagesInfoOnCanvas(e.target))
  //   canvas.on('object:moving', (e) => updateImagesInfoOnCanvas(e.target))

  //   canvas.on('after:render', function () {
  //     this.forEachObject((obj) => {
  //       if (obj.active || this.getActiveObject() === obj) {
  //         if (obj.hasBorders || obj.hasControls) {
  //           obj.drawBorders(this.contextContainer)
  //           obj.drawControls(this.contextContainer)
  //         }
  //       }
  //     })
  //   })
  //   canvas.renderAll()
  //   return () => {
  //     canvas.off('object:modified')
  //     canvas.off('object:moving')
  //     canvas.off('after:render')
  //   }
  // }, [canvasRef, imagesInfo, addImageToCanvas, updateImagesInfoOnCanvas])
  useEffect(() => {
    const canvasContainer = canvasRef.current.parentElement
    const setCanvasSize = () => {
      if (canvasContainer) {
        const width = canvasContainer.clientWidth
        const height = canvasContainer.clientHeight
        canvas.setWidth(width)
        canvas.setHeight(height)
        defineAndDrawShapes(canvas, width, height)
      }
    }

    let canvas = canvasRef.current?.fabric
    if (!canvas) {
      canvas = new fabric.Canvas(canvasRef.current)
      setCanvasSize()
      setupCustomControls(canvas)
      canvasRef.current.fabric = canvas
    }

    const clipBounds = canvasRef.current.fabric.clipPath.getBoundingRect()
    const centerLeft = clipBounds.left + clipBounds.width / 2
    const centerTop = clipBounds.top + clipBounds.height / 2
    if (canvas && canvas.getObjects().length === 0 && imagesInfo.length > 0) {
      imagesInfo.forEach((img) => {
        addImageToCanvas(img.url, {
          left: img.left + centerLeft,
          top: img.top + centerTop,
          scaleX: img.scaleX,
          scaleY: img.scaleY,
          angle: img.angle,
          id: img.id,
          name: img.name,
          url: img.url,
          zIndex: img.zIndex,
          originX: 'center',
          originY: 'center',
          lockScalingX:
            img.lockScalingX !== undefined ? img.lockScalingX : true,
          lockScalingY:
            img.lockScalingY !== undefined ? img.lockScalingY : true,
        })
      })
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

    const clipPath = new fabric.Path(svgPathData, {
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

    canvas.clipPath = clipPath

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
  }

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
  // useEffect(() => {
  //   console.log(canvasReady)

  // }, [canvasReady])

  return (
    <>
      <canvas ref={canvasRef} className="sample-canvas" />
    </>
  )
}

export default WorkingArea
