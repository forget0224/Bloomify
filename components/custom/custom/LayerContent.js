// import React from 'react'

// import {
//   CiLock,
//   CiUnlock,
//   CiTrash,
//   CiLineHeight,
//   CiSquarePlus,
// } from 'react-icons/ci'

// export default function LayerContent() {
//   return (
//     <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
//       <div className="text-tertiary-gray-100 w-60 text-center py-4">
//         <p className="text-xs">ssdlkfskldhfsldkfhs</p>
//       </div>
//       <div className="h-auto w-full">
//         <div className="px-3 py-2">
//           {/* 整組list */}
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiLock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'

import { useFlower } from '@/hooks/use-flower'
import {
  CiLock,
  CiUnlock,
  CiTrash,
  CiLineHeight,
  CiSquarePlus,
} from 'react-icons/ci'
import Image from 'next/image'
import { IoMdHammer } from 'react-icons/io'
import { fabric } from 'fabric'
export default function LayerContent() {
  const {
    imagesInfo,
    getClipBounds,
    setImagesInfo,
    canvasRef,
    addImageToCanvas,
    commitImageToCanvas,
  } = useFlower()
  const [selectedImageId, setSelectedImageId] = useState(null)
  const handleDeleteImage = (imageId) => {
    const targetImg = imagesInfo.find((img) => img.id === imageId)
    if (targetImg && !targetImg.locked) {
      setImagesInfo(imagesInfo.filter((img) => img.id !== imageId))

      const canvas = canvasRef.current.fabric
      const object = canvas.getObjects().find((obj) => obj.id === imageId)
      if (object) {
        canvas.remove(object)
        canvas.requestRenderAll()
      }
    } else {
      console.log('被鎖定了無法刪除')
    }
  }

  // const handleCopyImage = (img) => {
  //   const clipPath = getClipBounds()
  //   if (!clipPath) {
  //     console.error('沒有遮罩')
  //     return
  //   }
  //   const clipP = getClipBounds()
  //   const newImageMetadata = {
  //     url: img.url,
  //     name: img.name,
  //     left: img.left + 10 + clipP.left + clipP.width / 2,
  //     top: img.top + 10 + clipP.top + clipP.height / 2,
  //     scaleX: 0,
  //     scaleY: 0,
  //   }

  //   addImageToCanvas(img.url, newImageMetadata)
  //   setTimeout(() => {
  //     commitImageToCanvas()
  //   }, 100)
  // }

  const handleCopyImage = (img) => {
    const canvas = canvasRef.current.fabric
    const centerX = canvas.width / 2
    const centerY = canvas.height / 4
    const newImageMetadata = {
      product_category: img.product_category,
      product_id: img.product_id,
      product_price: img.product_price,
      url: img.url,
      name: img.name,
      color: img.color,
      left: img.left + 10 + centerX,
      top: img.top + 10 + centerY,
      scaleX: img.scaleX || 0.5,
      scaleY: img.scaleY || 0.5,
      angle: img.angle,
      originX: 'center',
      originY: 'center',
    }

    addImageToCanvas(img.url, newImageMetadata)

    setTimeout(() => {
      commitImageToCanvas()
    }, 100)
  }

  const handleSelectImage = (imageId) => {
    const canvas = canvasRef.current.fabric
    const object = canvas.getObjects().find((obj) => obj.id === imageId)
    if (object) {
      canvas.setActiveObject(object)
      canvas.requestRenderAll()
      setSelectedImageId(imageId)
    }
  }

  const toggleLockImage = (imageId) => {
    setImagesInfo((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, locked: !img.locked } : img
      )
    )

    const canvas = canvasRef.current.fabric
    const object = canvas.getObjects().find((obj) => obj.id === imageId)
    if (object) {
      object.selectable = !object.selectable
      object.evented = !object.evented
      canvas.requestRenderAll()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current?.fabric
    if (canvas) {
      const handleObjectSelected = (e) => {
        setSelectedImageId(e.target.id)
      }

      canvas.on('object:selected', handleObjectSelected)

      return () => {
        canvas.off('object:selected', handleObjectSelected)
      }
    }
  }, [canvasRef, setSelectedImageId])

  return (
    <div className="text-tertiary-black w-full h-full flex flex-col  items-center">
      <div className="text-tertiary-gray-100 w-60 text-center py-4">
        <p className="text-xs">管理花朵圖層</p>
      </div>
      <div className="h-auto w-full overflow-auto">
        {imagesInfo &&
          imagesInfo.map((img, index) => (
            <div
              id={img.id}
              key={img.id}
              className={`flex flex-row items-center justify-around border-b border-gray-300 py-2 ${
                img.id === selectedImageId ? 'bg-secondary-200' : ''
              }`}
              onClick={() => handleSelectImage(img.id)}
            >
              <div className="relative h-16 w-24 overflow-hidden border rounded-lg">
                <Image
                  id={img.id}
                  src={img.url}
                  alt={img.name || 'Flower Image'}
                  fill // 替代原本的 layout="fill"
                  style={{
                    objectFit: 'contain', // 將 objectFit 移至 style 中
                    position: 'absolute',
                    left: `${img.left / 3.5}px`,
                    top: `${img.top / 3.5}px`,
                    transform: `rotate(${img.angle}deg)`,
                  }}
                />
              </div>
              <div className="text-sm">{img.name}</div>
              <div className="flex flex-row gap-3 text-lg">
                {img.locked ? (
                  <CiLock onClick={() => toggleLockImage(img.id)} />
                ) : (
                  <CiUnlock onClick={() => toggleLockImage(img.id)} />
                )}
                <CiSquarePlus onClick={() => handleCopyImage(img)} />
                <CiTrash onClick={() => handleDeleteImage(img.id)} />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
