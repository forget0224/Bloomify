import React, { useState } from 'react'
import { Card, Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useCart } from '@/context/course-cart-context'
import moment from 'moment'

export default function CourseCart() {
  const { cart, removeFromCart, clearCart, totalSubtotal, totalCartProducts } =
    useCart()
  // console.log(cart)

  return (
    <div className="min-h-[355px]">
      {cart.length > 0 ? (
        <div className="flex flex-col w-[350px] md:w-[600px] lg:w-[800px] h-full gap-2 mt-4">
          {/* 購物車表格 */}
          <div className="flex flex-col gap-3 w-full p-4 rounded-lg">
            {/* 表內容 */}
            {cart.map((course) => (
              <Card
                key={`${course.id}_${course.period}`}
                className="shadow-md border-1 border-tertiary-gray-200 p-2"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="w-full md:w-1/2">
                    <Link
                      href={`/course/${course.id}`}
                      className="flex flex-col md:flex-row gap-2 items-center truncate px-2 py-1 md:py-2"
                    >
                      <div className="w-full md:w-1/4">
                        <Image
                          width={80}
                          height={40}
                          alt="課程圖片"
                          src={course.image}
                          className="rounded-md"
                        />
                      </div>
                      <span className="w-full md:w-3/4 md:ml-1 truncate">
                        {course.name}/{course.period}期
                      </span>
                      <br />
                    </Link>
                  </div>
                  <div className="w-full md:w-1/4 flex items-center px-2 py-1 md:py-2">
                    {moment(course.date).format('YYYY-MM-DD')}
                    <br />
                    {moment(course.startTime, 'HH:mm:ss').format('HH:mm')}-
                    {moment(course.endTime, 'HH:mm:ss').format('HH:mm')}
                  </div>
                  <div className="w-full md:w-1/6 flex items-center justify-end px-2 py-1 md:py-2">
                    NT${course.price}
                  </div>
                  <button
                    onClick={() => removeFromCart(course.id, course.period)}
                    className="flex w-fit flex items-center text-right justify-start text-primary md:justify-end px-2 py-1 md:py-2"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </Card>
            ))}
            {/* 小計 */}
            <div className="flex flex-col justify-between mt-2 border-t-1 border-tertiary-gray-200 pt-4">
              <div className="text-right text-right">
                共 {totalCartProducts} 堂課程
              </div>
              <div className="flex justify-end space-x-4">
                <span>小計</span>
                <span className="text-primary text-right">
                  NT${totalSubtotal}
                </span>
              </div>
            </div>
          </div>
          {/* 按鈕群組 */}
          <div className="flex justify-center gap-2 sm:gap-4 sm:my-10">
            <MyButton color="primary" size="xl" isOutline>
              <Link href="/">上一步</Link>
            </MyButton>
            <MyButton color="primary" size="xl">
              <Link href="/cart/fill-out?source=course">下一步</Link>
            </MyButton>
          </div>
        </div>
      ) : (
        <div className="mt-4">目前尚未加入任何課程</div>
      )}
    </div>
  )
}
