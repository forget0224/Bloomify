import React from 'react'
import { Button } from '@nextui-org/react'
import { CiShoppingCart } from 'react-icons/ci'

export default function CircleBtn() {
  return (
    <div className="flex gap-4 items-center">
      <Button
        isIconOnly
        color="danger"
        variant="faded"
        aria-label="add course to cart"
        className="rounded-full border-1 border-primary-100 bg-white"
      >
        <CiShoppingCart className="text-primary-100" />
      </Button>
    </div>
  )
}
