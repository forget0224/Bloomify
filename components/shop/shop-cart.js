import React, { useState, useEffect } from 'react'
import { Card, Image, CardBody, CardFooter } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Button, Input } from '@nextui-org/react'
import { FaMinus } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa6'

export default function ShopCart() {
  const [cartContent, setCartContent] = useState([
    {
      id: '1',
      image: '/assets/shop/products/flowers/blue_Bellflower_1.jpg',
      store: '花店名稱1',
      name: '玫瑰花',
      price: '30',
    },
    {
      id: '2',
      image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
      store: '花店名稱2',
      name: '太陽花',
      price: '60',
    },
    {
      id: '3',
      image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
      store: '花店名稱2',
      name: '太陽花',
      price: '60',
    },
  ])

  const deleteOrderItem = (id) => {
    // 過濾掉具有指定id的項目
    const updateCartContent = cartContent.filter((item) => item.id !== id)
    setCartContent(updateCartContent)
    // 更新數量和小計，移除已刪除項目的資料
    const { [id]: value, ...remainingQuantities } = quantities
    setQuantities(remainingQuantities)

    const { [id]: value2, ...remainingSubtotals } = subTotal
    setSubtotal(remainingSubtotals)
  }

  const [quantities, setQuantities] = useState(
    cartContent.reduce(
      (accumulator, item) => ({ ...accumulator, [item.id]: 1 }),
      {}
    )
  )
  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }))
  }

  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1),
    }))
  }
  const handleChange = (id, event) => {
    const newQuantity = parseInt(event.target.value, 10)
    console.log(`Changed quantity for item ${id}:`, newQuantity)
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }))
    }
  }

  const [subTotal, setSubtotal] = useState(0)
  const calculateSubtotals = () => {
    return cartContent.reduce((accumulator, item) => {
      const itemTotal = item.price * quantities[item.id]
      return {
        ...accumulator,
        [item.id]: itemTotal,
      }
    }, {})
  }
  useEffect(() => {
    const newSubtotals = calculateSubtotals()
    setSubtotal(newSubtotals)
  }, [quantities])

  const [totalSubtotal, setTotalSubtotal] = useState(0)

  useEffect(() => {
    const subtotals = calculateSubtotals()
    const total = Object.values(subtotals).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalSubtotal(total)
  }, [quantities])

  return (
    <div className="flex flex-col w-[350px] md:w-[600px] lg:w-[800px] h-full gap-2 mt-4">
      {/* 購物車表格 */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg">
        {/* 表內容 */}
        {cartContent.map((item) => (
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
                  src={item.image}
                  className="rounded-md"
                />
                <span className="md:ml-1 truncate">{item.name}</span>
              </div>
              <div className="flex-grow flex items-center px-2 py-1 md:py-2">
                {item.store}
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
                  value={quantities[item.id]}
                  onChange={(event) => handleChange(item.id, event)}
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
                  onClick={() => deleteOrderItem(item.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          </Card>
        ))}

        {/* 小計 */}
        <div className="flex flex-col justify-between mt-2 border-t-1 border-tertiary-gray-200 pt-4">
          <div className="text-right text-right">
            共 {cartContent.length} 項商品
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
