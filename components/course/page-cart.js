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

  return (
    <>
      <div className="w-[340px] md:w-[600px] lg:w-[800px] h-full flex flex-col gap-2 mt-4">
        {/* 購物車表格 */}
        <div className="flex flex-col w-full border-1 border-tertiary-gray-200 p-4 rounded-lg">
          {/* 表頭 */}
          <div className="flex flex-row justify-between bg-primary-300 rounded-md">
            <div className="w-1/3 p-2 text-nowrap">課程名稱</div>
            <div className="w-1/3 p-2 text-nowrap">課程時間</div>
            <div className="w-1/6 p-2 text-nowrap">價格</div>
            <div className="w-1/6 p-2 text-right text-nowrap">移除</div>
          </div>
          {/* 表內容 */}
          <div className="flex flex-col md:flex-row justify-between border-b">
            <div className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate p-2">
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1">韓系乾燥花課程</span>
            </div>
            <div className="w-full md:w-1/3 flex items-center p-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center p-2">NT$2000</div>
            <div className="flex w-full md:w-1/6 flex items-center text-right justify-start md:justify-end p-2">
              <FaRegTrashAlt />
            </div>
          </div>
          {/* 表內容 */}
          <div className="flex flex-col md:flex-row justify-between border-b">
            <div className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate p-2">
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1">韓系乾燥花課程</span>
            </div>
            <div className="w-full md:w-1/3 flex items-center p-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center p-2">NT$2000</div>
            <div className="flex w-full md:w-1/6 flex items-center text-right justify-start md:justify-end p-2">
              <FaRegTrashAlt />
            </div>
          </div>
          {/* 表內容 */}
          <div className="flex flex-col md:flex-row justify-between border-b">
            <div className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate p-2">
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1">韓系乾燥花課程</span>
            </div>
            <div className="w-full md:w-1/3 flex items-center p-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center p-2">NT$2000</div>
            <div className="flex w-full md:w-1/6 flex items-center text-right justify-start md:justify-end p-2">
              <FaRegTrashAlt />
            </div>
          </div>
          {/* 小計 */}
          <div className="flex flex-col justify-between mt-2">
            <div className="text-right text-right">共 2 堂課程</div>
            <div className="flex justify-end space-x-4">
              <span>小計</span>
              <span className="text-primary text-right">NT$1800</span>
            </div>
          </div>
        </div>
        {/* 按鈕群組 */}
        <div className="flex justify-center space-x-10 py-10">
          <Link href="/course">
            <MyButton color="primary" size="xl" isOutline>
              繼續購物
            </MyButton>
          </Link>
          <Link href="/course/cart/fill-out">
            <MyButton color="primary" size="xl">
              下一步
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}
