import React, { forwardRef } from 'react'
import { CheckIcon } from './CheckIcon'

const CustomCheckbox = forwardRef(
  (
    {
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
      labelText = '',
      style = {},
      ariaLabel = 'checkbox',
    },
    ref
  ) => {
    const textColor =
      bgColor === '#000' || bgColor === '#000000' ? 'white' : 'black'

    // const handleChange = (e) => {
    //   if (isMultiple) {
    //     onChange(e.target.checked)
    //   } else {
    //     if (e.target.checked) {
    //       onChange(value)
    //     }
    //   }
    // }
    const handleChange = (e) => {
      const isChecked = e.target.checked

      if (isMultiple) {
        // 多选模式：直接调用 onChange
        // 这里应当传递完整的更新后的数组，而不是单一的状态改变
        onChange((prev) => {
          const newValue = isChecked
            ? [...prev, value]
            : prev.filter((item) => item !== value)
          return newValue
        })
      } else {
        // 单选模式：只有在勾选复选框时才调用 onChange
        if (isChecked) {
          onChange(value)
        } else {
          // 如果需要支持取消选择，则添加逻辑处理取消选择的情况
          onChange('') // 或者传递一个 null 或其他标识没有选择的值
        }
      }
    }

    return (
      <div className="inline-flex items-center" style={{ ...style }}>
        <label className="relative flex items-center p-3 rounded-full cursor-pointer">
          <input
            ref={ref}
            checked={checked}
            onChange={handleChange}
            type="checkbox"
            style={{ background: bgColor }}
            className={`before:content[''] peer relative ${height} ${width} cursor-pointer appearance-none rounded-full border border-${borderColor} transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-${checkColor} checked:before:bg-${checkColor} hover:scale-105 hover:before:opacity-0`}
            aria-label={ariaLabel}
          />
          <span
            className={`absolute text-${textColor} transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100`}
          >
            {Icon && <Icon />}
          </span>
          {labelText && <span className="ml-2">{labelText}</span>}
        </label>
      </div>
    )
  }
)

CustomCheckbox.displayName = 'CustomCheckbox' // 显式设置显示名称

export default CustomCheckbox
