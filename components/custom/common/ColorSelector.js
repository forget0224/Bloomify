// import { useState, useEffect } from 'react'
// import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'
// import CustomCheckbox from './CustomCheckbox'
// import { useColors } from '@/hooks/use-color'
// import { useFlower } from '@/hooks/use-flowerSelector'

// const ColorSelector = ({ itemName, itemColors, onConfirm, editor }) => {
//   const [selectedColor, setSelectedColor] = useState(null)
//   const colors = useColors()
//   useEffect(() => {}, [selectedColor])
//   const matchColor = colors
//     .filter((color) => itemColors && itemColors.includes(color.name))
//     .map((color) => ({
//       zhName: color.name,
//       color: color.code,
//     }))

//   const handleColorSelect = (colorName) => {
//     setSelectedColor(colorName)
//   }
//   const { addImageToCanvas } = useFlower()
//   const handleSelectFlower = (flower) => {
//     const imageUrl = flower.url // 假設 flower 物件包含 url
//     const flowerInfo = {
//       name: flower.name,
//       color: flower.color,
//     }
//     addImageToCanvas(editor, imageUrl, flowerInfo)
//   }

//   return (
//     <div className="text-tertiary-black h-full flex flex-col items-center relative">
//       <div className="border-b-1 w-full">
//         <h1 className="sm:text-2xl text-lg py-2 text-center">{itemName}</h1>
//       </div>

//       <div className="h-full w-[300px]">
//         <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
//           {matchColor.map(({ color, zhName }, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center cursor-pointer"
//               // onClick={() => handleColorSelect(zhName)}
//               onClick={() => handleSelectFlower(selectedColor)}
//             >
//               <CustomCheckbox
//                 value={zhName}
//                 bgColor={color}
//                 width={'sm:w-12 w-8'}
//                 height={'sm:h-12 h-8'}
//                 checked={selectedColor === zhName}
//                 onChange={(newValue) => {
//                   setSelectedColor(newValue)
//                   console.log(newValue)
//                 }}
//                 isMultiple={false}
//               />
//               <p className="text-sm">{zhName}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 w-[300px] justify-items-center gap-2 text-tertiary-black text-4xl fixed bottom-0 border-t-1 bg-white sm:border-none">
//         <CiCircleChevLeft
//           className="cursor-pointer"
//           onClick={() => onConfirm(null)}
//         />
//         <CiCircleCheck
//           className="cursor-pointer"
//           onClick={() => onConfirm(selectedColor)}
//         />
//       </div>
//     </div>
//   )
// }

// export default ColorSelector
// import { useState, useEffect } from 'react'
// import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'
// import CustomCheckbox from './CustomCheckbox'
// import { useColors } from '@/hooks/use-color'
// import { useFlower } from '@/hooks/use-flowerSelector'
// const ColorSelector = ({ itemName, itemColors, onConfirm, editor }) => {
//   const [selectedColor, setSelectedColor] = useState(null)
//   const colors = useColors() // 假設這返回所有可用的顏色
//   const safeItemColors = Array.isArray(itemColors) ? itemColors : []

//   // 生成匹配的顏色列表
//   const matchColor = colors
//     .filter((color) =>
//       safeItemColors.some((itemColor) => itemColor === color.name)
//     )
//     .map((color) => ({
//       zhName: color.name,
//       color: color.code,
//     }))

//   console.log(matchColor)

//   const { addImageToCanvas } = useFlower()

//   // 處理選擇花朵後的邏輯
//   const handleSelectFlower = () => {
//     const flower = matchColor.find((color) => color.zhName === selectedColor)
//     if (flower) {
//       const imageUrl = flower.url // 假設每個顏色對應一個 URL
//       const flowerInfo = {
//         name: itemName,
//         color: flower.color,
//       }
//       addImageToCanvas(editor, imageUrl, flowerInfo)
//       onConfirm(flower)
//     }
//   }

//   return (
//     <div className="text-tertiary-black h-full flex flex-col items-center relative">
//       <div className="border-b-1 w-full">
//         <h1 className="sm:text-2xl text-lg py-2 text-center">{itemName}</h1>
//       </div>

//       <div className="h-full w-[300px]">
//         <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
//           {matchColor.map(({ color, zhName }, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => setSelectedColor(zhName)}
//             >
//               <CustomCheckbox
//                 value={zhName}
//                 bgColor={color}
//                 width={'sm:w-12 w-8'}
//                 height={'sm:h-12 h-8'}
//                 checked={selectedColor === zhName}
//                 onChange={(newValue) => setSelectedColor(newValue)}
//                 isMultiple={false}
//               />
//               <p className="text-sm">{zhName}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 w-[300px] justify-items-center gap-2 text-tertiary-black text-4xl fixed bottom-0 border-t-1 bg-white sm:border-none">
//         <CiCircleChevLeft
//           className="cursor-pointer"
//           onClick={() => onConfirm(null)}
//         />
//         <CiCircleCheck
//           className="cursor-pointer"
//           onClick={handleSelectFlower}
//         />
//       </div>
//     </div>
//   )
// }

// export default ColorSelector
// import { useState } from 'react'
// import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'
// import CustomCheckbox from './CustomCheckbox'
// import { useColors } from '@/hooks/use-color'
// import { useFlower } from '@/hooks/use-flowerSelector'

// const ColorSelector = ({ itemAttribute, categoryName, onConfirm }) => {
//   const [selectedColor, setSelectedColor] = useState(null)
//   const { addImageToCanvas, editor } = useFlower()
//   const colors = useColors() // 获取所有可用的颜色

//   const handleSelectFlower = (attribute) => {
//     setSelectedColor(attribute.color)
//     if (attribute.url) {
//       addImageToCanvas(editor, attribute.url, {
//         name: attribute.color,
//         color: attribute.color,
//       })
//     } else {
//       console.error('URL is missing for the image')
//     }
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
//         <CiCircleChevLeft
//           className="cursor-pointer"
//           onClick={() => onConfirm(null)}
//         />
//         <CiCircleCheck
//           className="cursor-pointer"
//           onClick={() => onConfirm(selectedColor)}
//         />
//       </div>
//     </div>
//   )
// }

// export default ColorSelector
import React, { useState } from 'react'
import CustomCheckbox from './CustomCheckbox'
import { useColors } from '@/hooks/use-color'
import { useFlower } from '@/hooks/use-flowerSelector'
import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'

const ColorSelector = ({ itemAttribute, categoryName, onConfirm }) => {
  const [selectedColor, setSelectedColor] = useState(null)
  const colors = useColors()
  const { setImageInfo } = useFlower()

  const handleSelectFlower = (attribute) => {
    setSelectedColor(attribute.color)
    setImageInfo({
      url: attribute.url,
      color: attribute.color,
      name: categoryName,
    })
    onConfirm(attribute.color)
    // onConfirm() // 可以進一步處理確認後的行為
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
        <CiCircleChevLeft
          className="cursor-pointer"
          onClick={() => onConfirm(null)}
        />
        <CiCircleCheck
          className="cursor-pointer"
          onClick={() => onConfirm(selectedColor)}
        />
      </div>
    </div>
  )
}

export default ColorSelector
