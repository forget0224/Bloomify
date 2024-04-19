import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'

export default function CourseDropdown({
  label,
  options,
  selectedOption,
  onChange,
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{selectedOption || label}</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={`${label} selection`}
        selectionMode="single"
        className="max-h-80 overflow-y-auto"
        selectedKeys={new Set([selectedOption])}
        onSelectionChange={(keys) => {
          const newSelectedOption = Array.from(keys)[0]
          onChange(newSelectedOption) // 調用onChange以通知父組件變化
        }}
      >
        {options.map((option) => (
          <DropdownItem key={option.value}>{option.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
