// import React, { useState } from 'react'
// import CustomCheckbox from './CustomCheckbox'
// import { useColors } from '@/hooks/use-color'
// import { useFlower } from '@/hooks/use-flowerSelector'
// import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'

// const ColorSelector = ({ itemAttribute, categoryName, onConfirm }) => {
//   const [selectedColor, setSelectedColor] = useState(null)
//   const colors = useColors()
//   const { addImageToCanvas, commitImage, removeCurrentImage } = useFlower()

//   const handleSelectFlower = (attribute) => {
//     removeCurrentImage()
//     setSelectedColor(attribute.color)
//     addImageToCanvas(attribute.url, {
//       color: attribute.color,
//       name: categoryName,
//     })
//   }

//   const handleConfirm = () => {
//     onConfirm(selectedColor)
//   }

//   const handleCancel = () => {
//     commitImage()
//     onConfirm(null)
//   }

//   return (
//     <div className="text-tertiary-black h-full flex flex-col items-center relative">
//       <div className="border-b-1 w-full">
//         <h1 className="sm:text-2xl text-lg py-2 text-center">{categoryName}</h1>
//       </div>
//       <div className="h-full w-[300px]">
//         <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
//           {itemAttribute.map((attribute, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => handleSelectFlower(attribute)}
//             >
//               <CustomCheckbox
//                 value={attribute.color}
//                 bgColor={colors.find((c) => c.name === attribute.color)?.code}
//                 width={'sm:w-12 w-8'}
//                 height={'sm:h-12 h-8'}
//                 checked={selectedColor === attribute.color}
//                 onChange={() => setSelectedColor(attribute.color)}
//                 isMultiple={false}
//               />
//               <p className="text-sm">{attribute.color}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="grid grid-cols-2 w-[300px] justify-items-center gap-2 text-tertiary-black text-4xl fixed bottom-0 border-t-1 bg-white sm:border-none">
//         <CiCircleChevLeft className="cursor-pointer" onClick={handleCancel} />
//         <CiCircleCheck className="cursor-pointer" onClick={handleConfirm} />
//       </div>
//     </div>
//   )
// }

// export default ColorSelector

import React, { useState } from 'react'
import CustomCheckbox from './CustomCheckbox'
import { useColors } from '@/hooks/use-color'
import { useFlower } from '@/hooks/use-flower'
import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'

const ColorSelector = ({ itemAttribute, categoryName, onConfirm }) => {
  const [selectedColor, setSelectedColor] = useState(null)
  const colors = useColors()
  const {
    addImageToCanvas,
    commitImageToCanvas,
    removeCurrentImage,
    tempObjectRef,
  } = useFlower()

  const handleSelectFlower = (attribute) => {
    removeCurrentImage()
    setSelectedColor(attribute.color)
    // Preview the selected flower on the canvas
    addImageToCanvas(attribute.url, {
      color: attribute.color,
      name: categoryName,
      url: attribute.url,
    })
  }

  const handleConfirm = () => {
    // Commit the current preview to be permanently on the canvas
    if (tempObjectRef.current) {
      commitImageToCanvas(tempObjectRef.current) // 传递当前的预览对象
    }
    onConfirm(selectedColor)
  }

  const handleCancel = () => {
    // Remove the current preview from the canvas
    removeCurrentImage()
    onConfirm(null)
  }

  return (
    <div className="text-tertiary-black h-full flex flex-col items-center relative">
      <div className="border-b-1 w-full">
        <h1 className="sm:text-2xl text-lg py-2 text-center">{categoryName}</h1>
      </div>
      <div className="h-full w-[300px]">
        <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
          {itemAttribute.map((attribute, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelectFlower(attribute)}
            >
              <CustomCheckbox
                value={attribute.color}
                bgColor={colors.find((c) => c.name === attribute.color)?.code}
                width={'sm:w-12 w-8'}
                height={'sm:h-12 h-8'}
                checked={selectedColor === attribute.color}
                onChange={() => setSelectedColor(attribute.color)}
                isMultiple={false}
              />
              <p className="text-sm">{attribute.color}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 w-[300px] justify-items-center gap-2 text-tertiary-black text-4xl fixed bottom-0 border-t-1 bg-white sm:border-none">
        <CiCircleChevLeft className="cursor-pointer" onClick={handleCancel} />
        <CiCircleCheck className="cursor-pointer" onClick={handleConfirm} />
      </div>
    </div>
  )
}

export default ColorSelector
