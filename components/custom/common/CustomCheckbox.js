import React, { forwardRef } from 'react'
import { CheckIcon } from './CheckIcon'

const CustomCheckbox = forwardRef(
  (
    {
      bgColor = 'transparent',
      backgroundImage = 'none',
      backgroundSize = 'cover',
      backgroundPosition = 'center',
      borderColor = 'gray-900/20',
      checkColor = 'tertiary-black',
      overlayColor = 'rgba(0, 0, 0, 0.5)',
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
      isBgImage = false,
    },
    ref
  ) => {
    const textColor = isBgImage
      ? 'white'
      : bgColor === '#000' || bgColor === '#000000'
      ? 'white'
      : 'black'

    const handleChange = (e) => {
      const isChecked = e.target.checked

      if (isMultiple) {
        onChange((prev) => {
          const newValue = isChecked
            ? [...prev, value]
            : prev.filter((item) => item !== value)
          return newValue
        })
      } else {
        if (isChecked) {
          onChange(value)
        } else {
          onChange('')
        }
      }
    }
    const backgroundStyles = isBgImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize,
          backgroundPosition,
        }
      : {}
    return (
      <div className="inline-flex items-center" style={{ ...style }}>
        <label className="relative flex items-center p-3 rounded-full cursor-pointer">
          <input
            ref={ref}
            checked={checked}
            onChange={handleChange}
            type="checkbox"
            style={{
              background: bgColor,
              ...backgroundStyles,
            }}
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

CustomCheckbox.displayName = 'CustomCheckbox'

export default CustomCheckbox
