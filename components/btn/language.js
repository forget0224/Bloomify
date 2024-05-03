import { useState, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { TfiWorld } from 'react-icons/tfi'

export default function Language() {
  const { i18n } = useTranslation()
  const [selectedOption, setSelectedOption] = useState(new Set(['zh']))

  const labelsMap = {
    zh: '繁體中文',
    en: 'English',
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const handleSelectionChange = (languageSet) => {
    setSelectedOption(languageSet)
  }

  useEffect(() => {
    const language = Array.from(selectedOption)[0]
    changeLanguage(language)
  }, [selectedOption])

  // const handleSelectionChange = (languageSet) => {
  //   setSelectedOption(languageSet)
  //   const language = Array.from(languageSet)[0]
  //   changeLanguage(language)
  // }

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
          onSelectionChange={handleSelectionChange}
          className="text-tertiary-black"
        >
          <DropdownItem key="zh">{labelsMap['zh']}</DropdownItem>
          <DropdownItem key="en">{labelsMap['en']}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
