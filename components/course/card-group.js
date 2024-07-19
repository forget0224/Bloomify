import React, { useState } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import { BsFillStarFill } from 'react-icons/bs'
import HeartButton from './btn-heart'
import { useLocation } from 'react-use'
import { useAuth } from '@/hooks/use-auth'

export default function CardGroup({ courses }) {
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const keyword = queryParams.get('keyword')

  // 如果 courses 是 undefined 或者為空數組，就渲染一個提示訊息或者 loading...
  if (!courses || courses.length === 0) {
    return <div>課程資料正在加載中或者沒有可用的課程。</div>
  }
  console.log(courses)

  function highlightKeyword(text, keyword) {
    if (!keyword) return text // 如果沒有關鍵字，直接返回原文本
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'))
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Card
          shadow="sm"
          key={course.id}
          className="relative"
          // isPressable // 加這個會變成button包button，會報錯
          // onPress={() => console.log('item pressed', course.id)}
        >
          <Link href={`/course/${course.id}`} className="block relative">
            <CardBody className="relative overflow-visible p-0">
              <Image
                isZoomed
                shadow="none"
                radius="none"
                width="100%"
                className="w-full object-cover h-[180px]"
                alt={course.name}
                src={course.mainImage}
              />
            </CardBody>
            <CardFooter className="block text-left">
              <p className="text-xl line-clamp-1 mb-2">
                {highlightKeyword(course.name, keyword)}
              </p>
              <p className="line-clamp-2 mb-2">
                {highlightKeyword(course.intro, keyword)}
              </p>
              <div className="text-small flex justify-between pt-0">
                <p className="text-lg">NT${course.price}</p>
                <p className="text-base flex items-center">
                  <BsFillStarFill className="text-secondary-100 mr-1" />
                  {course.average_stars}
                </p>
              </div>
            </CardFooter>
          </Link>
          <div className="absolute top-0 right-0 p-4">
            {/* 傳遞課程 ID 到愛心元件 */}
            {/* 判斷是否登入，沒有登入就隱藏愛心 */}
            {isAuth && (
              <HeartButton
                courseId={course.course_id}
                opacity="text-opacity-40"
              />
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
