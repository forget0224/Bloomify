import React, { useState, useEffect } from 'react'
import { Card, Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Input } from '@nextui-org/react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useCart } from '@/context/shop-cart-context'

export default function ShopCart() {
  const {
    cartItems,
    handleIncrement,
    handleDecrement,
    handleChange,
    deleteCartItem,
    totalSubtotal,
    totalCartProducts,
  } = useCart()

  return (
    <div className="flex flex-col w-[350px] md:w-[600px] lg:w-[800px] h-full gap-2 mt-4">
      {/* 購物車表格 */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg">
        {/* 表内容 */}
        {Object.values(cartItems).map((item) => {
          let imageUrl =
            item.imageUrl || `/assets/shop/products/default_fallback_image.jpg`
          if (Array.isArray(item.images)) {
            const nonThumbnailImage = item.images.find(
              (image) => !image.is_thumbnail
            )
            if (nonThumbnailImage) {
              imageUrl = `/assets/shop/products/${item.directory}/${nonThumbnailImage.url}`
            }
          }
          return (
            <Card
              key={item.id}
              className="shadow-none border-1 border-tertiary-gray-200 p-2 shadow-md"
            >
              <div className="flex flex-col md:flex-row items-center justify-between space-x-2">
                <Image
                  width={80}
                  height={40}
                  src={imageUrl}
                  alt={item.name}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <span className="truncate">{item.name}</span>
                </div>
                <div className="flex-grow">
                  <span className="truncate">{item.stores.store_name}</span>
                </div>
                <div className="flex-grow">
                  <span className="truncate">NT${item.price}</span>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-primary-300 p-1.5 rounded-sm mr-1 hover:bg-primary-200"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <FaMinus />
                  </button>
                  <Input
                    style={{ textAlign: 'center' }}
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, e)}
                  />
                  <button
                    className="bg-primary-300 p-1.5 rounded-sm ml-1 hover:bg-primary-200"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex items-center">
                  <span>NT${item.quantity * item.price}</span>
                </div>
                <button onClick={() => deleteCartItem(item.id)}>
                  <FaRegTrashAlt />
                </button>
              </div>
            </Card>
          )
        })}
        {/* 小計 */}
        <div className="text-right">
          <div>共 {totalCartProducts} 項商品</div>
          {/* 共 {shopCartItems.length} 項商品，數量 {totalQuantity} 個 */}
          <div>
            小計{' '}
            <span className="text-primary text-right">NT$ {totalSubtotal}</span>
          </div>
        </div>
      </div>
      {/* 按鈕群组 */}
      <div className="flex flex-col md:flex-row gap-3 w-full justify-center md:py-10">
        <MyButton color="primary" size="xl" isOutline className="w-full">
          <Link href="/shop">繼續購物</Link>
        </MyButton>

        <MyButton color="primary" size="xl" className="w-full">
          <Link href="/cart/fill-out">下一步</Link>
        </MyButton>
      </div>
    </div>
  )
}
