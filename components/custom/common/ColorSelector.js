import { useState, useEffect } from 'react'
import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'
import CustomCheckbox from './CustomCheckbox'
import { useColors } from '@/hooks/use-color'

const ColorSelector = ({ itemName, itemColors, onConfirm }) => {
  const [selectedColor, setSelectedColor] = useState(null)
  const colors = useColors()
  useEffect(() => {}, [selectedColor])
  const matchColor = colors
    .filter((color) => itemColors && itemColors.includes(color.name))
    .map((color) => ({
      zhName: color.name,
      color: color.code,
    }))

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName)
  }
  return (
    <div className="text-tertiary-black h-full flex flex-col items-center relative">
      <div className="border-b-1 w-full">
        <h1 className="sm:text-2xl text-lg py-2 text-center">{itemName}</h1>
      </div>

      <div className="h-full w-[300px]">
        <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
          {matchColor.map(({ color, zhName }, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleColorSelect(zhName)}
            >
              <CustomCheckbox
                value={zhName}
                bgColor={color}
                width={'sm:w-12 w-8'}
                height={'sm:h-12 h-8'}
                checked={selectedColor === zhName}
                onChange={(newValue) => {
                  setSelectedColor(newValue)
                  console.log(newValue)
                }}
                isMultiple={false}
              />
              <p className="text-sm">{zhName}</p>
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
