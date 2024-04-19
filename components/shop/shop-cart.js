import React, { useState } from 'react'
import {
  Card,
  Image,
  CardBody,
  CardFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaRegTrashAlt } from 'react-icons/fa'

export default function CourseCart() {
  const cartCourseContent = {
    cartList: [
      {
        image: '/assets/course/category-1/img-course-01-01.jpg',
        name: '韓系乾燥花課程',
        price: '600',
      },
      {
        image: '/assets/course/category-1/img-course-01-01.jpg',
        name: '韓系乾燥花課程',
        price: '600',
      },
      {
        image: '/assets/course/category-1/img-course-01-01.jpg',
        name: '韓系乾燥花課程',
        price: '600',
      },
    ],
  }

  //table 樣式
  const tableStyles = {
    base: ['text-tertiary-black'],
    th: ['text-base', 'text-tertiary-gray-100'],
    td: ['text-base', 'px-3', 'py-3'],
    wrapper: [
      'text-base',
      'shadow-none',
      'border-1',
      'border-tertiary-100',
      'rounded-xl',
    ],
  }

  // shop start
  // const cartContent = [
  //   {
  //     image: '/assets/shop/products/flowers/blue_Bellflower_1.jpg',
  //     store: '花店名稱1',
  //     name: '玫瑰花',
  //     price: '30',
  //   },
  //   {
  //     image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
  //     store: '花店名稱2',
  //     name: '太陽花',
  //     price: '60',
  //   },
  // ]
  // // calculate start
  // const [quantity, setQuantity] = useState(1)
  // const handleIncrement = () => {
  //   setQuantity(quantity + 1)
  // }
  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1)
  //   }
  // }
  // const handleChange = (event) => {
  //   const newQuantity = parseInt(event.target.value)
  //   if (!isNaN(newQuantity) && newQuantity >= 1) {
  //     setQuantity(newQuantity)
  //   } else if (event.target.value === '') {
  //     setQuantity(1)
  //   }
  // }
  // calculate end
  // shop end

  return (
    <>
      <div className="w-[340px] md:w-[600px] lg:w-[800px] h-full flex flex-col gap-2 mt-4">
        {/* 購物車表格 */}
        <div className="flex flex-col w-full border-1 border-tertiary-gray-200 p-4 rounded-lg">
          {/* 表頭 */}
          <div className="flex flex-row justify-between bg-primary-300 py-2 px-2">
            <div className="w-1/3">課程名稱</div>
            <div className="w-1/3">課程時間</div>
            <div className="w-1/6">價格</div>
            <div className="w-1/6 text-right">移除</div>
          </div>
          {/* 表內容 */}
          <div className="flex flex-col md:flex-row justify-between py-2 px-2">
            <div className="w-full md:w-1/3 flex flex-col md:flex-row items-center truncate">
              <span>
                <Image
                  width={80}
                  height={40}
                  alt="課程圖片"
                  src="/assets/course/category-1/img-course-01-01.jpg"
                  className="p-1 border-1 rounded-lg mr-1"
                />
              </span>
              <span>韓系乾燥花課程</span>
            </div>
            <div className="w-full md:w-1/3 flex items-center">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center">NT$2000</div>
            <div className="flex w-full md:w-1/6 flex items-center text-right justify-start md:justify-end md:px-2">
              <FaRegTrashAlt />
            </div>
          </div>
          {/* 表內容 */}
          <div className="flex flex-col md:flex-row justify-between py-2 px-2">
            <div className="w-full md:w-1/3 flex flex-col md:flex-row items-center truncate">
              <span>
                <Image
                  width={80}
                  height={40}
                  alt="課程圖片"
                  src="/assets/course/category-1/img-course-01-01.jpg"
                  className="p-1 border-1 rounded-lg mr-1"
                />
              </span>
              <span>韓系乾燥花課程</span>
            </div>
            <div className="w-full md:w-1/3 flex items-center">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center">NT$2000</div>
            <div className="flex w-full md:w-1/6 flex items-center text-right justify-start md:justify-end md:px-2">
              <FaRegTrashAlt />
            </div>
          </div>
          {/* 小計 */}
          <div className="flex flex-col justify-between">
            <div className="text-right text-right">共 2 堂課程</div>
            <div className="flex justify-end space-x-4">
              <span>小計</span>
              <span className="text-primary text-right">NT$1800</span>
            </div>
          </div>
        </div>
        {/* 按鈕群組 */}
        <div className="flex justify-center space-x-10 py-10">
          <Link href="/shop">
            <MyButton color="primary" size="xl" isOutline>
              繼續購物
            </MyButton>
          </Link>
          <Link href="/cart/fill-out">
            <MyButton color="primary" size="xl">
              下一步
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}
