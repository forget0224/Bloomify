import React, { useState, useEffect } from 'react'
import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'
import { useColors } from '@/hooks/use-color'
import CustomCheckbox from '../common/CustomCheckbox'
import { useCard } from '@/hooks/use-card'

const CardStyleSelector = ({ itemAttribute, categoryName, onConfirm }) => {
  const [selectedStyle, setSelectedStyle] = useState(null)
  const colors = useColors()
  const { previewStyle, setPreviewStyle, setConfirmedStyle } = useCard()

  const handlePreview = (attribute) => {
    setSelectedStyle(attribute)
    setPreviewStyle(attribute) // 设置预览样式
  }

  const handleConfirm = () => {
    setConfirmedStyle(previewStyle) // 设置确认样式为当前预览
    setPreviewStyle(null) // 清空预览样式
    onConfirm(selectedStyle) // 外部确认回调
  }

  const handleCancel = () => {
    setPreviewStyle(null)
    setSelectedStyle(null)
    onConfirm(null) // 外部取消回调
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
                onClick={() => handlePreview(attribute)}
              >
                <CustomCheckbox
                  value={attribute.variant_name}
                  bgColor={colors.find((c) => c.name === attribute.color)?.code}
                  width={'sm:w-12 w-8'}
                  height={'sm:h-12 h-8'}
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
      <div className="grid grid-cols-2 w-[300px] justify-items-center gap-2 text-tertiary-black text-4xl fixed bottom-0 border-t-1 bg-white sm:border-none">
        <CiCircleChevLeft className="cursor-pointer" onClick={handleCancel} />
        <CiCircleCheck className="cursor-pointer" onClick={handleConfirm} />
      </div>
    </div>
  )
}

export default CardStyleSelector
