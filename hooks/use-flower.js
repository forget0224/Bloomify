import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react'
import { fabric } from 'fabric' // 确保引入fabric库

const FlowerContext = createContext()

export const useFlower = () => useContext(FlowerContext)

export const FlowerProvider = ({ children }) => {
  const canvasRef = useRef(null)
  const tempObjectRef = useRef(null)
  const [imagesInfo, setImagesInfo] = useState([])

  useEffect(() => {
    if (canvasRef.current && !canvasRef.current.fabric) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current)
      canvasRef.current.fabric = fabricCanvas // 存储fabric.Canvas实例
      setupCustomControls(fabricCanvas)
    }
  }, [])

  const addImageToCanvas = useCallback((url, metadata) => {
    if (!canvasRef.current || !canvasRef.current.fabric) {
      console.error('Canvas is not initialized.')
      return
    }

    const canvas = canvasRef.current.fabric
    const clipBounds = canvas.clipPath.getBoundingRect()

    if (tempObjectRef.current) {
      canvas.remove(tempObjectRef.current)
      tempObjectRef.current = null
    }

    new fabric.Image.fromURL(url, (img) => {
      if (!img) {
        console.error('Failed to load image')
        return
      }

      img.set({
        id: fabric.util.getRandomInt(1000, 9999),
        zIndex: 1,
        left: clipBounds.left + clipBounds.width / 2,
        top: clipBounds.top + clipBounds.height / 2,
        angle: 0,
        scaleX: 0.5,
        scaleY: 0.5,
        originX: 'center',
        originY: 'center',
        lockScalingX: true,
        lockScalingY: true,
        ...metadata,
      })

      canvas.add(img)
      canvas.renderAll()
      tempObjectRef.current = img
    })
  }, [])

  const commitImageToCanvas = useCallback(() => {
    if (tempObjectRef.current && canvasRef.current.fabric.clipPath) {
      const img = tempObjectRef.current
      const clipBounds = canvasRef.current.fabric.clipPath.getBoundingRect()
      const imgInfo = {
        id: img.id,
        url: img.url,
        left: img.left - clipBounds.left - clipBounds.width / 2,
        top: img.top - clipBounds.top - clipBounds.height / 2,
        name: img.name,
        color: img.color,
        zIndex: img.zIndex,
        angle: img.angle,
      }

      setImagesInfo((prev) => [...prev, imgInfo])
      tempObjectRef.current = null
    }
  }, [])

  const setupCustomControls = (canvas) => {
    const rotateIcon = new Image()
    rotateIcon.onload = () => {
      fabric.Object.prototype.controls.mtr = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -10,
        offsetX: 10,
        cursorStyle: 'pointer',
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        render: (ctx, left, top, styleOverride, fabricObject) => {
          const size = fabricObject.cornerSize
          ctx.save()

          ctx.translate(left, top)
          ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
          ctx.drawImage(rotateIcon, -size / 2, -size / 2, size, size)
          ctx.restore()
        },
        cornerSize: 24,
      })
    }
    rotateIcon.src = '/custom/custom/rotateIcon.png'
    fabric.Object.prototype.hasControls = true
    fabric.Object.prototype.hasBorders = false
    fabric.Object.prototype.borderColor = 'transparent'
    fabric.Object.prototype.borderScaleFactor = 1.2
    fabric.Object.prototype.borderDashArray = [10, 5]

    // Hide other controls
    ;['tl', 'tr', 'bl', 'br', 'mt', 'mb', 'ml', 'mr'].forEach((ctrl) => {
      fabric.Object.prototype.controls[ctrl].visible = false
    })
  }

  const removeCurrentImage = useCallback(() => {
    if (
      !canvasRef.current ||
      !canvasRef.current.fabric ||
      !tempObjectRef.current
    )
      return

    const canvas = canvasRef.current.fabric
    canvas.remove(tempObjectRef.current)
    tempObjectRef.current = null
  }, [])

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current || !canvasRef.current.fabric) return

    const canvas = canvasRef.current.fabric
    canvas.clear()
    setImagesInfo([])
  }, [canvasRef])

  const snapshotCanvas = useCallback(() => {
    if (!canvasRef.current || !canvasRef.current.fabric) return null

    return canvasRef.current.fabric.toDataURL()
  }, [])

  const getClipBounds = useCallback(() => {
    if (
      canvasRef.current &&
      canvasRef.current.fabric &&
      canvasRef.current.fabric.clipPath
    ) {
      return canvasRef.current.fabric.clipPath.getBoundingRect()
    }
    return null
  }, [])

  return (
    <FlowerContext.Provider
      value={{
        addImageToCanvas,
        commitImageToCanvas,
        removeCurrentImage,
        clearCanvas,
        snapshotCanvas,
        setupCustomControls,
        setImagesInfo,
        canvasRef,
        imagesInfo,
        getClipBounds,
      }}
    >
      {children}
    </FlowerContext.Provider>
  )
}
