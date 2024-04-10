import { useState } from 'react'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CustomCheckbox from '../common/CustomCheckbox'
export default function CustomFilter() {
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
  const [selected, setSelected] = useState([''])

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md w-[250px] m-auto h-[600px] text-tertiary-black  overflow-y-auto scrollbar-thumb:bg-tertiary-black scrollbar-thumb:rounded-sm scrollbar-track:bg-transparent items-center ">
        <div className=" ">
          <div className="">
            <p className="text-lg text-tertiary-black">對象</p>
            <hr className="" />
            <div className="">
              <CheckboxGroup
                value={selected}
                color="default"
                onValueChange={setSelected}
                className="py-2"
              >
                {roles.map((role, index) => (
                  <Checkbox key={index} radius="none" className="" value={role}>
                    {role}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>

          <div className="">
            <p className="text-lg text-tertiary-black">節日</p>
            <hr className="" />
            <div className="">
              <CheckboxGroup
                value={selected}
                color="default"
                onValueChange={setSelected}
                className="py-2"
              >
                {occs.map((occ, index) => (
                  <Checkbox key={index} radius="none" className="" value={occ}>
                    {occ}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>
          <div className="">
            <p className="text-lg text-tertiary-black">顏色</p>
            <hr className="" />
            <div className="">
              <CheckboxGroup
                className="gap-1 pb-2"
                orientation="horizontal"
                value={selected}
              >
                {colors.map(({ color, zhName }, index) => (
                  <div key={index} className="flex flex-col items-center">
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
                      isMultiple={true}
                    />
                    <p className="text-sm">{zhName}</p>
                  </div>
                ))}
              </CheckboxGroup>
            </div>
          </div>
          <hr />
          <div className="flex justify-around w-full pt-3">
            <MyButton color="primary" size="md" isOutline>
              清除
            </MyButton>
            <MyButton color="primary" size="md">
              確認
            </MyButton>
          </div>
        </div>
      </div>
    </>
  )
}
