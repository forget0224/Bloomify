import React, { useState, useEffect } from 'react'
import { Card, Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Input, Button } from '@nextui-org/react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useCart } from '@/context/shop-cart-context'
import Swal from 'sweetalert2'

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

  const deleteAlert = (itemId) => {
    Swal.fire({
      title: '是否要刪除?',
      text: '刪除後將無法恢復!',
      icon: 'warning',
      iconColor: '#FF6347', // Tomato color for warning
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的',
      cancelButtonText: '取消',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'w-[100px]',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCartItem(itemId)
      }
    })
  }

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
              <div className="flex flex-col md:flex-row items-center justify-between space-x-2 space-y-1.5">
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '4px',
                  }}
                  aria-label={item.name}
                />
                <div className="flex-grow flex justify-center sm:w-25">
                  <span className="truncate">{item.name}</span>
                </div>
                <div className="flex-grow flex justify-center sm:w-25">
                  <span className="truncate">{item.stores.store_name}</span>
                </div>
                <div className="flex-grow flex justify-center sm:w-25">
                  <span className="truncate">NT${item.price}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    style={{ minWidth: '20px' }}
                    className="bg-primary-300"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <FaMinus />
                  </Button>
                  <div style={{ width: '100px' }}>
                    <Input
                      min={1}
                      style={{ textAlign: 'center' }}
                      value={item.quantity}
                      onChange={(e) => {
                        handleChange(item.id, e)
                      }}
                    />
                  </div>
                  <Button
                    style={{ minWidth: '20px' }}
                    className="bg-primary-300"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <FaPlus />
                  </Button>
                </div>
                <div
                  style={{ width: '100px' }}
                  className="flex items-center justify-center"
                >
                  <span>NT${item.quantity * item.price}</span>
                </div>
                <button onClick={() => deleteAlert(item.id)}>
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
      <div className="flex justify-center gap-2 sm:gap-4 sm:my-10">
        <MyButton color="primary" size="xl" isOutline>
          <Link href="/">繼續購物</Link>
        </MyButton>
        <MyButton color="primary" size="xl">
          <Link href="/cart/fill-out?source=shop">下一步</Link>
        </MyButton>
      </div>
    </div>
  )
}
