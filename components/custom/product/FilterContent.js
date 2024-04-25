import { useState, useEffect } from 'react'
import { MyButton } from '@/components/btn/mybutton'
import { RadioGroup, Radio, Checkbox, CheckboxGroup } from '@nextui-org/react'
import { useColors } from '@/hooks/use-color'
import { useOccs } from '@/hooks/use-occ'
import { useFlowerTypes } from '@/hooks/use-flowerType'
import CustomCheckbox from '../common/CustomCheckbox'

export default function FilterContent({
  onFilterChange,
  onSortChange,
  selectedOccs,
  setSelectedOccs,
  selectedflowerType,
  setSelectedflowerType,
  selectedColors,
  setSelectedColors,
  sortOption,
  setSortOption,
  radioSelection,
  setRadioSelection,
}) {
  const colors = useColors()
  const occs = useOccs()
  const flowerType = useFlowerTypes()

  const handleConfirm = () => {
    onFilterChange({
      occ_id: selectedOccs.join(','),
      category_id: selectedflowerType.join(','),
      color_id: selectedColors.join(','),
    })
    console.log(sortOption)
    if (sortOption) {
      onSortChange(sortOption.field, sortOption.order)
    }
  }

  const handleClear = () => {
    setSelectedOccs([])
    setSelectedflowerType([])
    setSelectedColors([])
    handleConfirm()
  }
  const handleColorChange = (updateFunction) => {
    setSelectedColors(updateFunction)
  }

  const handleSortSelection = (value) => {
    setRadioSelection(value)
    const [field, order] = value.split(',')
    setSortOption({ field, order })
  }
  console.log(
    `${flowerType}        console.log(flowerType)    console.log(flowerType)    console.log(flowerType)    console.log(flowerType)`
  )
  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-col h-auto pb-8   z-10">
        <div className="flex flex-col py-2">
          <div className="bg-primary-300 text-primary-100 text-center">
            排序
          </div>
          <div className="flex flex-col p-2">
            <RadioGroup
              value={radioSelection}
              onValueChange={handleSortSelection}
            >
              <Radio value="template_id,asc">預設</Radio>
              <Radio value="created_at,desc">依最新上架</Radio>
              <Radio value="total_price,asc">依價格低到高</Radio>
              <Radio value="total_price,desc">依價格高到低</Radio>
            </RadioGroup>
          </div>
        </div>

        <div className="flex flex-col py-2">
          <div className="bg-primary-300 text-primary-100 text-center">
            篩選
          </div>
          {/* 節日 */}
          <div className="flex flex-col p-2 min-h-[200px]">
            <div className="">
              <p className="text-lg text-tertiary-black ">節日</p>
              <hr className="" />
              <div className="">
                <CheckboxGroup
                  value={selectedOccs}
                  color="primary"
                  onValueChange={setSelectedOccs}
                  className="py-2 "
                >
                  <div className="grid grid-cols-[repeat(2,1fr)] auto-rows-[minmax(40px,auto)]">
                    {occs.map(({ occ_id, occ }) => (
                      <Checkbox
                        key={occ_id}
                        radius="xs"
                        className="h-10"
                        value={occ_id}
                      >
                        {occ}
                      </Checkbox>
                    ))}
                  </div>
                </CheckboxGroup>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col p-2  min-h-[200px]">
            <div className="">
              <p className="text-lg text-tertiary-black">主花</p>
              <hr className="" />
              <div className="">
                <CheckboxGroup
                  value={selectedflowerType}
                  color="primary"
                  onValueChange={setSelectedflowerType}
                  className="py-2 "
                >
                  <div className="grid grid-cols-2 gap-2 ">
                    {flowerType.map(({ category_id, category_name }) => (
                      <Checkbox
                        key={category_id}
                        radius="xs"
                        className="h-10"
                        value={category_id}
                      >
                        {category_name}
                      </Checkbox>
                    ))}
                  </div>
                </CheckboxGroup>
              </div>
            </div>
          </div>
          {/* 顏色 */}
          <div className="flex flex-col p-2  min-h-[200px]">
            <div className="">
              <p className="text-lg text-tertiary-black">顏色</p>
              <hr className="" />
              <div className="">
                <CheckboxGroup
                  value={selectedColors}
                  color="primary"
                  onValueChange={setSelectedColors}
                  className="py-2 "
                >
                  <div className="grid grid-cols-3 ">
                    {colors.map(({ code, name, color_id }) => (
                      <div
                        key={color_id}
                        className="flex flex-col items-center "
                      >
                        <CustomCheckbox
                          value={color_id}
                          bgColor={code}
                          onChange={handleColorChange}
                          checked={selectedColors.includes(color_id)}
                          isMultiple={true}
                        />
                        <p className="text-sm">{name}</p>
                      </div>
                    ))}
                  </div>
                </CheckboxGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-1 z-20">
        <div className="flex flex-row gap-1 justify-around pt-2 pb-1 w-full ">
          <MyButton size="xl" isOutline onClick={handleClear}>
            清除
          </MyButton>
          <MyButton size="xl" onClick={handleConfirm}>
            確定
          </MyButton>
        </div>
      </div>
    </div>
  )
}
