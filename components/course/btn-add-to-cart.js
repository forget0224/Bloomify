import React from 'react'
import { MyButton } from '@/components/btn/mybutton'
import { CiShoppingCart } from 'react-icons/ci'

export default function CircleBtn({ onClick, disabled = false }) {
  return (
    <div className="flex gap-4 items-center">
      <MyButton
        isIconOnly
        isOutline
        isDisabled={disabled}
        color="primary"
        variant="faded"
        aria-label="add course to cart"
        className="rounded-full border-1 border-primary-100 bg-white"
        onClick={onClick} // 綁定動作，接收來自父組件的事件處理器
      >
        <CiShoppingCart className="w-5 h-5 text-primary-100" />
      </MyButton>
    </div>
  )
}
