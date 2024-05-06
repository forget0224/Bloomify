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
    addImageToCanvas(attribute.url, {
      color: attribute.color,
      name: categoryName,
      url: attribute.url,
      product_id: attribute.product_id,
      product_category: attribute.product_category,
      product_price: attribute.product_price,
    })
  }

  const handleConfirm = () => {
    if (tempObjectRef.current) {
      commitImageToCanvas(tempObjectRef.current)
    }

    onConfirm(selectedColor)
  }

  const handleCancel = () => {
    removeCurrentImage()
    onConfirm(null)
  }

  return (
    <div className="text-tertiary-black h-full flex flex-col items-center relative">
      <div className="border-b-1 sm:w-full w-30">
        <h1 className="sm:text-2xl text-lg py-2 text-center">{categoryName}</h1>
      </div>
      <div className="h-full w-[300px]">
        <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
          {itemAttribute.map((attribute, index) => (
            <div
              key={attribute.product_id}
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
      <div className="grid grid-cols-2 w-[300px] justify-items-center gap-2 text-tertiary-black sm:text-[3rem] text-4xl fixed bottom-0 border-t-1 bg-white sm:border-none">
        <CiCircleChevLeft className="cursor-pointer" onClick={handleCancel} />
        <CiCircleCheck className="cursor-pointer" onClick={handleConfirm} />
      </div>
    </div>
  )
}

export default ColorSelector
