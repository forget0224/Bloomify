import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'
import LayerContent from './LayerContent'
import { IoLayersOutline } from 'react-icons/io5'
export default function LayerFloat() {
  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button
            isIconOnly
            className="rounded-full border-1 text-tertiary-black border-tertiary-black w-12 h-12 bg-secondary-200 flex flex-col items-center justify-center m-4"
          >
            <IoLayersOutline className="text-3xl" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:max-h-[600px] overflow-auto">
          <LayerContent />
        </PopoverContent>
      </Popover>
    </>
  )
}
