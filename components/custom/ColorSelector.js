import { useState } from 'react'
import { CiCircleCheck, CiCircleChevLeft } from 'react-icons/ci'
import CustomCheckbox from '../../components/custom/CustomCheckbox'
const colorMap = [
  { zhName: '紅色', name: 'red', color: '#FF0000' },
  { zhName: '橙色', name: 'orange', color: '#FFA500' },
  { zhName: '黃色', name: 'yellow', color: '#FFFF00' },
  { zhName: '綠色', name: 'green', color: '#008000' },
  { zhName: '藍色', name: 'blue', color: '#0000FF' },
  { zhName: '紫色', name: 'purple', color: '#8B00FF' },
  { zhName: '粉紅色', name: 'pink', color: '#FFC0CB' },
  { zhName: '棕色', name: 'brown', color: '#704214' },
  { zhName: '灰色', name: 'gary', color: '#808080' },
  { zhName: '黑色', name: 'black', color: '#000000' },
  { zhName: '白色', name: 'white', color: '#FFFFFF' },
  { zhName: '其他', name: 'other', color: '???' },
]

const ColorSelector = ({ itemName, itemColors, onConfirm }) => {
  const [selectedColor, setSelectedColor] = useState(null)

  const colors = itemColors.map((colorName) => {
    const colorInfo = colorMap.find((color) => color.name === colorName)
    return colorInfo
  })

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName) // 设置选中的颜色
  }
  return (
    <div className="text-tertiary-black h-full flex flex-col items-center relative">
      <div className="border-b-1 w-full">
        <h1 className="sm:text-2xl text-lg py-2 text-center">{itemName}</h1>
      </div>

      <div className="h-full w-[300px]">
        <div className="grid grid-cols-2 justify-items-center gap-2 pb-10">
          {colors.map(({ color, zhName }, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleColorSelect(zhName)} // 修正：点击时传递 zhName 而不是 color
            >
              <CustomCheckbox
                value={zhName}
                bgColor={color}
                width={'sm:w-12 w-8'}
                height={'sm:h-12 h-8'}
                checked={selectedColor === zhName}
                onChange={(newValue) => {
                  setSelectedColor(newValue)
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
