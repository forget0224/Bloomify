import React, { useState } from 'react'
import { Card, Image, CardBody, CardFooter } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaRegTrashAlt } from 'react-icons/fa'

export default function CourseCart() {
  return (
    <div className="flex flex-col w-[350px] md:w-[600px] lg:w-[800px] h-full gap-2 mt-4">
      {/* 購物車表格 */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg">
        {/* 表頭 */}
        {/* <div className="flex flex-row justify-between bg-primary-300 rounded-md">
            <div className="w-1/3 p-2 text-nowrap">課程名稱</div>
            <div className="w-1/3 p-2 text-nowrap">課程時間</div>
            <div className="w-1/6 p-2 text-nowrap">價格</div>
            <div className="w-1/6 p-2 text-right text-nowrap">移除</div>
          </div> */}
        {/* 表內容 */}
        <Card className="shadow-none border-1 border-tertiary-gray-200 p-2">
          <div className="flex flex-col md:flex-row justify-between">
            <Link
              className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate px-2 py-1 md:py-2"
              href={`/course/1`}
            >
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1 truncate">韓系乾燥花課程</span>
            </Link>

            <div className="w-full md:w-1/3 flex items-center px-2 py-1 md:py-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center px-2 py-1 md:py-2">
              NT$2000
            </div>
            <button className="flex w-full md:w-1/6 flex items-center text-right justify-start text-primary md:justify-end px-2 py-1 md:py-2">
              <FaRegTrashAlt />
            </button>
          </div>
        </Card>
        {/* 表內容 */}
        <Card className="shadow-none border-1 border-tertiary-gray-200 p-2">
          <div className="flex flex-col md:flex-row justify-between">
            <Link
              className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate px-2 py-1 md:py-2"
              href={`/course/1`}
            >
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1 truncate">韓系乾燥花課程</span>
            </Link>

            <div className="w-full md:w-1/3 flex items-center px-2 py-1 md:py-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center px-2 py-1 md:py-2">
              NT$2000
            </div>
            <button className="flex w-full md:w-1/6 flex items-center text-right justify-start text-primary md:justify-end px-2 py-1 md:py-2">
              <FaRegTrashAlt />
            </button>
          </div>
        </Card>
        {/* 表內容 */}
        <Card className="shadow-none border-1 border-tertiary-gray-200 p-2">
          <div className="flex flex-col md:flex-row justify-between">
            <Link
              className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate px-2 py-1 md:py-2"
              href={`/course/1`}
            >
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1 truncate">韓系乾燥花課程</span>
            </Link>

            <div className="w-full md:w-1/3 flex items-center px-2 py-1 md:py-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center px-2 py-1 md:py-2">
              NT$2000
            </div>
            <button className="flex w-full md:w-1/6 flex items-center text-right justify-start text-primary md:justify-end px-2 py-1 md:py-2">
              <FaRegTrashAlt />
            </button>
          </div>
        </Card>
        {/* 表內容 */}
        <Card className="shadow-none border-1 border-tertiary-gray-200 p-2">
          <div className="flex flex-col md:flex-row justify-between">
            <Link
              className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate px-2 py-1 md:py-2"
              href={`/course/1`}
            >
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1 truncate">韓系乾燥花課程</span>
            </Link>

            <div className="w-full md:w-1/3 flex items-center px-2 py-1 md:py-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center px-2 py-1 md:py-2">
              NT$2000
            </div>
            <button className="flex w-full md:w-1/6 flex items-center text-right justify-start text-primary md:justify-end px-2 py-1 md:py-2">
              <FaRegTrashAlt />
            </button>
          </div>
        </Card>
        {/* 表內容 */}
        <Card className="shadow-none border-1 border-tertiary-gray-200 p-2">
          <div className="flex flex-col md:flex-row justify-between">
            <Link
              className="w-full md:w-1/3 flex flex-row gap-2 items-center truncate px-2 py-1 md:py-2"
              href={`/course/1`}
            >
              <Image
                width={80}
                height={40}
                alt="課程圖片"
                src="/assets/course/category-1/img-course-01-01.jpg"
                className="rounded-md"
              />
              <span className="md:ml-1 truncate">韓系乾燥花課程</span>
            </Link>

            <div className="w-full md:w-1/3 flex items-center px-2 py-1 md:py-2">
              2024-04-14 17:00
            </div>
            <div className="w-full md:w-1/6 flex items-center px-2 py-1 md:py-2">
              NT$2000
            </div>
            <button className="flex w-full md:w-1/6 flex items-center text-right justify-start text-primary md:justify-end px-2 py-1 md:py-2">
              <FaRegTrashAlt />
            </button>
          </div>
        </Card>
        {/* 小計 */}
        <div className="flex flex-col justify-between mt-2 border-t-1 border-tertiary-gray-200 pt-4">
          <div className="text-right text-right">共 5 堂課程</div>
          <div className="flex justify-end space-x-4">
            <span>小計</span>
            <span className="text-primary text-right">NT$3600</span>
          </div>
        </div>
      </div>
      {/* 按鈕群組 */}
      <div className="flex flex-col md:flex-row gap-3 w-full justify-center md:py-10">
        <Link href="/course">
          <MyButton color="primary" size="xl" isOutline className="w-full">
            繼續購物
          </MyButton>
        </Link>
        <Link href="/course/cart/fill-out">
          <MyButton color="primary" size="xl" className="w-full">
            下一步
          </MyButton>
        </Link>
      </div>
    </div>
  )
}
