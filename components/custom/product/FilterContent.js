import { useState } from 'react'
import { MyButton } from '@/components/btn/mybutton'
import { RadioGroup, Radio, Checkbox, CheckboxGroup } from '@nextui-org/react'

import CustomCheckbox from '../common/CustomCheckbox'

const colors = [
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
  {
    zhName: '其他',
    name: 'other',
    color:
      'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 50%, rgba(0,128,0,1) 100%)',
  },
]
const roles = [
  '長輩',
  '朋友',
  '同學',
  '師長',
  '戀人',
  '工作伙伴',
  '新生嬰兒',
  '親人生日',
  '新婚夫婦',
]
const occs = [
  '生日慶祝',
  '情人節',
  '新婚喜慶',
  '母親節',
  '慰問安慰',
  '感謝禮物',
  '慶祝祝賀',
  '紀念日',
]
export default function FilterContent() {
  const [selected, setSelected] = useState([''])
  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-col h-auto pb-8   z-10">
        <div className="flex flex-col py-2">
          <div className="bg-primary-300 text-primary-100 text-center">
            排序
          </div>
          <div className="flex flex-col p-2">
            <RadioGroup>
              <Radio value="default">預設</Radio>
              <Radio value="new">依最新上架</Radio>
              <Radio value="lowPrice">依價格低到高</Radio>
              <Radio value="highPrice">依價格高到低</Radio>
              <Radio value="hot">依銷量</Radio>
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
                  value={selected}
                  color="default"
                  onValueChange={setSelected}
                  className="py-2 "
                >
                  <div className="grid grid-cols-[repeat(2,1fr)] auto-rows-[minmax(40px,auto)]">
                    {occs.map((role, index) => (
                      <Checkbox
                        key={index}
                        radius="none"
                        className="h-10"
                        value={role}
                      >
                        {role}
                      </Checkbox>
                    ))}
                  </div>
                </CheckboxGroup>
              </div>
            </div>
          </div>
          {/* 對象 */}
          <div className="flex flex-col p-2  min-h-[200px]">
            <div className="">
              <p className="text-lg text-tertiary-black">對象</p>
              <hr className="" />
              <div className="">
                <CheckboxGroup
                  value={selected}
                  color="default"
                  onValueChange={setSelected}
                  className="py-2 "
                >
                  <div className="grid grid-cols-2 gap-2 ">
                    {/* <div className="flex flex-col gap-2"> */}
                    {roles.map((role, index) => (
                      <Checkbox
                        key={index}
                        radius="none"
                        className="h-10"
                        value={role}
                      >
                        {role}
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
                  value={selected}
                  color="default"
                  onValueChange={setSelected}
                  className="py-2 "
                >
                  <div className="grid grid-cols-3 ">
                    {colors.map(({ color, zhName }, index) => (
                      <div key={index} className="flex flex-col items-center ">
                        <CustomCheckbox
                          value={zhName}
                          bgColor={color}
                          checked={selected.includes(zhName)}
                          onChange={(isChecked) => {
                            if (isChecked) {
                              setSelected((prev) => [...prev, zhName])
                            } else {
                              setSelected((prev) =>
                                prev.filter((item) => item !== zhName)
                              )
                            }
                          }}
                          isMultiple={false}
                        />
                        <p className="text-sm">{zhName}</p>
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
          <MyButton size="xl" isOutline>
            清除
          </MyButton>
          <MyButton size="xl">確定</MyButton>
        </div>
      </div>
    </div>
  )
}
