import { extendVariants, Button } from '@nextui-org/react'

export const MyButton = extendVariants(Button, {
  variants: {
    // 修改或新增變體
    color: {
      primary: 'bg-primary-200 hover:bg-primary-100 text-white',
      secondary: 'bg-secondary-200 hover:bg-secondary-100 text-tertiary-black',
    },
    isDisabled: {
      true: 'bg-tertiary-gray-200 text-tertiary-gray-100 opacity-50 cursor-not-allowed  rounded-[30px]', // 禁用狀態
    },
    isOutline: {
      true: 'border-[1px] border-solid', //外框
    },
    size: {
      xs: 'px-4 py-3 text-tiny rounded-[30px]', // 小尺寸
      md: 'px-8 py-3 text-small rounded-[30px]', // 中尺寸
      xl: 'px-16 py-3 text-medium rounded-[30px]', // 大尺寸
    },
  },
  compoundVariants: [
    {
      isOutline: true,
      color: 'primary',
      class:
        'border-primary-100 text-primary-100 bg-transparent hover:bg-primary-300',
    },
    {
      isOutline: true,
      color: 'secondary',
      class: 'border-secondary-100  bg-transparent hover:bg-secondary-200',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})
