import { useState, useEffect } from 'react'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CustomCheckbox from '../common/CustomCheckbox'
import { useColors } from '@/hooks/use-color'
import { useOccs } from '@/hooks/use-occ'
import { useRoles } from '@/hooks/use-role'

export default function CustomFilter({ onFilterChange }) {
  const colors = useColors()
  const occs = useOccs()
  const roles = useRoles()
  const [selectedOccs, setSelectedOccs] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  const handleColorChange = (updateFunction) => {
    setSelectedColors(updateFunction)
  }
  const handleConfirm = () => {
    const query = {
      occ_id: selectedOccs.join(','),
      role_id: selectedRoles.join(','),
      color_id: selectedColors.join(','),
    }

    console.log(query)
    onFilterChange(query)
  }

  const handleClear = () => {
    setSelectedOccs([])
    setSelectedRoles([])
    setSelectedColors([])
    handleConfirm()
  }

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md w-[250px] m-auto h-[600px] text-tertiary-black  overflow-y-auto scrollbar-thumb:bg-tertiary-black scrollbar-thumb:rounded-sm scrollbar-track:bg-transparent items-center ">
        <div className="">
          <div className="">
            <p className="text-lg text-tertiary-black">節日</p>
            <hr className="" />

            <div className="">
              <CheckboxGroup
                value={selectedOccs}
                onValueChange={setSelectedOccs}
                className="py-2"
                color="primary"
              >
                {occs.map(({ occ_id, occ }) => (
                  <Checkbox
                    key={occ_id}
                    className=""
                    radius="xs"
                    value={occ_id}
                  >
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
                value={selectedRoles}
                onValueChange={setSelectedRoles}
                className="py-2"
                color="primary"
              >
                {roles.map(({ role_id, role }) => (
                  <Checkbox
                    key={role_id}
                    className=""
                    radius="xs"
                    value={role_id}
                  >
                    {role}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>

          <div className="">
            <p className="text-lg text-tertiary-black">顏色</p>
            <hr className="" />
            <CheckboxGroup
              className="gap-1 pb-2"
              orientation="horizontal"
              value={selectedColors}
              onValueChange={setSelectedColors}
            >
              {colors.map(({ color_id, code, name }) => (
                <div key={color_id} className="flex flex-col items-center">
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
            </CheckboxGroup>
          </div>
          <hr />
          <div className="flex justify-around w-full pt-3 ">
            <MyButton color="primary" size="md" isOutline onClick={handleClear}>
              清除
            </MyButton>
            <MyButton color="primary" size="md" onClick={handleConfirm}>
              確認
            </MyButton>
          </div>
        </div>
      </div>
    </>
  )
}
