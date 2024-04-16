import { useState, useEffect } from 'react'
import { MyButton } from '@/components/btn/mybutton'
import { RadioGroup, Radio, Checkbox, CheckboxGroup } from '@nextui-org/react'

import CustomCheckbox from '../common/CustomCheckbox'

export default function FilterContent() {
  const [selected, setSelected] = useState([''])
  const [colors, setColors] = useState([''])
  const [roles, setRoles] = useState([''])
  const [occs, setOccs] = useState([''])
  useEffect(() => {
    async function fetchData() {
      try {
        const urls = [
          'http://localhost:3005/api/share-colors',
          'http://localhost:3005/api/share-occs',
          'http://localhost:3005/api/share-roles',
        ]

        const responses = await Promise.all(urls.map((url) => fetch(url)))
        const dataPromises = responses.map((response) => response.json())
        const results = await Promise.all(dataPromises)

        if (
          results[0].status === 'success' &&
          Array.isArray(results[0].data.colors)
        ) {
          setColors(results[0].data.colors)
        }
        if (
          results[1].status === 'success' &&
          Array.isArray(results[1].data.occs)
        ) {
          setOccs(results[1].data.occs)
        }
        if (
          results[2].status === 'success' &&
          Array.isArray(results[2].data.roles)
        ) {
          setRoles(results[2].data.roles)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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
                    {occs.map(({ id, occ }) => (
                      <Checkbox
                        key={id}
                        radius="none"
                        className="h-10"
                        value={occ}
                      >
                        {occ}
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
                    {roles.map(({ id, role }) => (
                      <Checkbox
                        key={id}
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
                    {colors.map(({ code, name }, index) => (
                      <div key={index} className="flex flex-col items-center ">
                        <CustomCheckbox
                          value={name}
                          bgColor={code}
                          checked={selected.includes(name)}
                          onChange={(isChecked) => {
                            if (isChecked) {
                              setSelected((prev) => [...prev, name])
                            } else {
                              setSelected((prev) =>
                                prev.filter((item) => item !== name)
                              )
                            }
                          }}
                          isMultiple={false}
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
          <MyButton size="xl" isOutline>
            清除
          </MyButton>
          <MyButton size="xl">確定</MyButton>
        </div>
      </div>
    </div>
  )
}
