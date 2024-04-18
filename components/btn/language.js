import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'

import { TfiWorld } from 'react-icons/tfi'
export default function Language() {
  const [selectedOption, setSelectedOption] = useState(new Set(['chinese']))

  const labelsMap = {
    chinese: '繁體中文',
    english: 'English',
  }

  const selectedOptionValue = Array.from(selectedOption)[0]
  return (
    <ButtonGroup variant="bordered" className="rounded-lg z-0">
      <Dropdown>
        <DropdownTrigger>
          <Button className="border-1 border-black px-unit-6 text-xs min-h-[34px] min-w-[120px]">
            <TfiWorld />
            {labelsMap[selectedOptionValue]}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="language options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className=" text-tertiary-black"
        >
          <DropdownItem key="chinese">{labelsMap['chinese']}</DropdownItem>
          <DropdownItem key="english">{labelsMap['english']}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
