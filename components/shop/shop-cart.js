import React, { useState, useEffect } from 'react'
import { Card, Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Button, Input } from '@nextui-org/react'
import { FaMinus } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa6'

export default function ShopCart() {
  // 拿取localStorage資料
  const [cartItems, setCartItems] = useState([])
  console.log(cartItems)
  useEffect(() => {
    // 從 localstorage獲取資料
    const storedProduct = localStorage.getItem('productToCart')
    if (storedProduct) {
      setCartItems(JSON.parse(storedProduct))
    }
  }, [])

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('productToCart', JSON.stringify(cartItems))
  }, [cartItems])

  // 計算器
  const handleIncrement = (itemId) => {
    setCartItems((prevItems) =>
      Object.values(prevItems).map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    )
  }

  const handleDecrement = (itemId) => {
    setCartItems((prevItems) =>
      Object.values(prevItems).map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
    )
  }

  // 根據用戶的輸入更新某個項目的數量。
  const handleChange = (itemId, e) => {
    // 從輸入欄目前的值解析新的數量，確保它是一個整數。
    const newQuantity = parseInt(e.target.value, 10)

    // 從輸入欄目前的值解析新的數量，確保它是一個整數。
    if (!isNaN(newQuantity) && newQuantity > 0) {
      // 更新 cartItems 狀態。
      setCartItems((prevItems) =>
        // 遍歷之前的項目來找到需要更新的那一個。
        prevItems.map((item) => {
          // 當找到匹配 id 的項目時，更新其數量。
          if (item.id === itemId) {
            return { ...item, quantity: newQuantity }
          }
          // 對於所有其他項目，保持不變返回。
          return item
        })
      )
    }
  }

  const [subTotal, setSubtotal] = useState(0)
  const calculateSubtotals = () => {
    return Object.values(cartItems).reduce((accumulator, item) => {
      const itemTotal = item.price * item.quantity
      return {
        ...accumulator,
        [item.id]: itemTotal,
      }
    }, {})
  }
  // This effect hook is used to update the subtotals whenever cartItems changes.
  useEffect(() => {
    const newSubtotals = calculateSubtotals()
    setSubtotal(newSubtotals)
  }, [cartItems])

  // 總商品數量
  const totalCartProducts = Object.values(cartItems).length
  // 總商品小計
  const [totalSubtotal, setTotalSubtotal] = useState(0)
  useEffect(() => {
    const subtotals = calculateSubtotals()
    const total = Object.values(subtotals).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalSubtotal(total)
  }, [cartItems])

  // 刪除
  const deleteCartItem = (itemId) => {
    // 找出要刪除的項目
    const updatedCartItems = Object.values(cartItems).filter(
      (item) => item.id !== itemId
    )
    setCartItems(updatedCartItems)

    // Update the localStorage with the new cart items array.
    localStorage.setItem('productToCart', JSON.stringify(updatedCartItems))
  }

  return (
    <div className="flex flex-col w-[350px] md:w-[600px] lg:w-[800px] h-full gap-2 mt-4">
      {/* 購物車表格 */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg">
        {/* 表內容 */}
        {Object.values(cartItems).map((item) => {
          let imageUrl = `/assets/shop/products/default_fallback_image.jpg`
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
              <div className="flex flex-col md:flex-row items-center sm:justify-between">
                <div className="flex-grow flex flex-row gap-2 items-center truncate px-2 py-1 md:py-2">
                  <Image
                    width={80}
                    height={40}
                    alt={item.name}
                    src={imageUrl}
                    className="rounded-md"
                  />
                  <span className="md:ml-1 truncate">{item.name}</span>
                </div>
                <div className="flex-grow flex items-center px-2 py-1 md:py-2">
                  {item.stores.store_name}
                </div>
                <div className="flex-grow flex items-center px-2 py-1 md:py-2">
                  NT${item.price}
                </div>
                <div className="flex-grow flex items-center justify-center px-2 py-1 md:py-2">
                  <Button
                    isIconOnly
                    variant="faded"
                    className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <FaMinus />
                  </Button>
                  <Input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, e)}
                    className="max-w-20 w-full rounded-md p-1 text-center"
                    style={{ textAlign: 'center' }}
                  />
                  <Button
                    isIconOnly
                    variant="faded"
                    className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <FaPlus />
                  </Button>
                </div>
                <div className="flex-grow flex items-center px-2 py-1 md:py-2">
                  NT$ {subTotal[item.id]}
                </div>
                <div className="flex-grow flex items-center justify-end px-2 py-1 md:py-2">
                  <button
                    className="text-primary md:px-2 py-1"
                    onClick={() => deleteCartItem(item.id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </Card>
          )
        })}

        {/* 小計 */}
        <div className="flex flex-col justify-between mt-2 border-t-1 border-tertiary-gray-200 pt-4">
          <div className="text-right text-right">
            共 {totalCartProducts} 項商品
          </div>
          <div className="flex justify-end space-x-4">
            <span>小計</span>
            <span className="text-primary text-right">NT${totalSubtotal}</span>
          </div>
        </div>
      </div>
      {/* 按鈕群組 */}
      <div className="flex flex-col md:flex-row gap-3 w-full justify-center md:py-10">
        <Link href="/shop">
          <MyButton color="primary" size="xl" isOutline className="w-full">
            繼續購物
          </MyButton>
        </Link>
        <Link href="/cart/fill-out">
          <MyButton color="primary" size="xl" className="w-full">
            下一步
          </MyButton>
        </Link>
      </div>
    </div>
  )
}
