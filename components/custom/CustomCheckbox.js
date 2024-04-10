import React from 'react'
import { CheckIcon } from './CheckIcon'

export default function CustomCheckbox({
  bgColor = '#fff',
  borderColor = 'gray-900/20',
  checkColor = 'tertiary-black',
  Icon = CheckIcon,
  width = 'w-6',
  height = 'h-6',
  checked = false,
  isMultiple = true,
  onChange,
  value,
}) {
  const textColor =
    bgColor === '#000' || bgColor === '#000000' ? 'white' : 'black'
  const handleChange = (e) => {
    if (isMultiple) {
      // 多选模式：直接调用 onChange 回调
      onChange(e.target.checked)
    } else {
      // 单选模式：只有在勾选复选框时才调用 onChange 回调
      if (e.target.checked) {
        onChange(value)
      }
    }
  }
  return (
    <div className="inline-flex items-center">
      <label className="relative flex items-center p-3 rounded-full cursor-pointer">
        <input
          checked={checked}
          onChange={handleChange}
          type="checkbox"
          style={{ background: bgColor }}
          className={`before:content[''] peer relative ${height} ${width} cursor-pointer appearance-none rounded-full border border-${borderColor} transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-${checkColor} checked:before:bg-${checkColor} hover:scale-105 hover:before:opacity-0`}
        />
        <span
          className={`absolute text-${textColor} transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100`}
        >
          {Icon && <Icon />}
        </span>
      </label>
    </div>
  )
}
