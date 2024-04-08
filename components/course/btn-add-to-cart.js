import React from 'react'
import { MyButton } from '@/components/btn/mybutton'
import { CiShoppingCart } from 'react-icons/ci'

export default function CircleBtn() {
  return (
    <div className="flex gap-4 items-center">
      <MyButton
        isIconOnly
        isOutline
        color="primary"
        variant="faded"
        aria-label="add course to cart"
        className="rounded-full border-1 border-primary-100 bg-white"
      >
        <CiShoppingCart className="w-5 h-5 text-primary-100" />
      </MyButton>
    </div>
  )
}
