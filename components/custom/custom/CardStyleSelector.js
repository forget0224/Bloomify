import React, { useState, useEffect } from 'react'
import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'
import { useColors } from '@/hooks/use-color'
import CustomCheckbox from '../common/CustomCheckbox'
import { useFlower } from '@/hooks/use-flower'
const CardStyleSelector = ({ itemAttribute, categoryName, onConfirm }) => {
  const [selectedStyle, setSelectedStyle] = useState(null)
  const colors = useColors()
  const { previewStyle, setPreviewStyle, setConfirmedStyle } = useFlower()

  const handlePreview = (attribute, categoryName) => {
    console.log(categoryName)
    const newAttribute = { ...attribute, name: categoryName }
    console.log(newAttribute)
    setSelectedStyle(newAttribute)
    setPreviewStyle(newAttribute)
  }

  const handleConfirm = () => {
    setConfirmedStyle(previewStyle)
    setPreviewStyle(null)
    onConfirm(selectedStyle)
  }

  const handleCancel = () => {
    setPreviewStyle(null)
    setSelectedStyle(null)
    onConfirm(null)
  }

  return (
    <div className="text-tertiary-black h-full flex flex-col items-center relative">
      <div className="border-b-1 w-full">
        <h1 className="sm:text-2xl text-lg py-2 text-center">{categoryName}</h1>
      </div>
      <div className="h-full w-[300px]">
        <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
          {itemAttribute && itemAttribute.length > 0 ? (
            itemAttribute.map((attribute, index) => (
              <div
                key={attribute.product_id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handlePreview(attribute, categoryName)}
              >
                <CustomCheckbox
                  value={attribute.variant_name}
                  backgroundImage={attribute.url}
                  isBgImage={true}
                  width={'sm:w-24 w-20'}
                  height={'sm:h-24 h-20'}
                  checked={selectedStyle === attribute}
                  onChange={() => {}}
                  isMultiple={false}
                />
                <p className="text-sm">{attribute.variant_name}</p>
              </div>
            ))
          ) : (
            <p>No styles available.</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 w-[300px] justify-items-center gap-2 text-tertiary-black sm:text-[3rem]  text-4xl fixed bottom-0 border-t-1 bg-white sm:border-none">
        <CiCircleChevLeft className="cursor-pointer" onClick={handleCancel} />
        <CiCircleCheck className="cursor-pointer" onClick={handleConfirm} />
      </div>
    </div>
  )
}

export default CardStyleSelector
