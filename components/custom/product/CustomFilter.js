import { useState, useEffect } from 'react'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CustomCheckbox from '../common/CustomCheckbox'
export default function CustomFilter() {
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
    <>
      <div className="bg-white p-4 rounded-lg shadow-md w-[250px] m-auto h-[600px] text-tertiary-black  overflow-y-auto scrollbar-thumb:bg-tertiary-black scrollbar-thumb:rounded-sm scrollbar-track:bg-transparent items-center ">
        <div className=" ">
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
                {occs.map(({ id, occ }) => (
                  <Checkbox key={id} radius="none" className="" value={occ}>
                    {occ}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>
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
                {roles.map(({ id, role }) => (
                  <Checkbox key={id} radius="none" className="" value={role}>
                    {role}
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
                {colors.map(({ id, code, name }) => (
                  <div key={id} className="flex flex-col items-center">
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
                      isMultiple={true}
                    />
                    <p className="text-sm">{name}</p>
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
