import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { PiCaretDownThin } from 'react-icons/pi'

export default function FilterButton() {
  const [selectedOption, setSelectedOption] = useState(new Set(['default']))

  const labelsMap = {
    default: '預設',
    new: '依最新上架',
    lowPrice: '依價格低到高',
    highPrice: '依價格高到低',
    hot: '依銷量',
  }

  const selectedOptionValue = Array.from(selectedOption)[0]
  return (
    <ButtonGroup variant="bordered" className="rounded-lg">
      <Dropdown>
        <DropdownTrigger>
          <Button className="border-1 border-tertiary-gary-200 px-unit-2 text-xs h-[30px] min-w-[80px]">
            {labelsMap[selectedOptionValue]}
            <PiCaretDownThin />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="language options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={(key) => setSelectedOption(key)}
          className="text-tertiary-black"
        >
          {Object.entries(labelsMap).map(([key, value]) => (
            <DropdownItem key={key}>{value}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
