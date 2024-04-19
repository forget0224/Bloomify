import React from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import { BsFillStarFill } from 'react-icons/bs'
import HeartButton from './btn-heart'

export default function CardGroup({ courses, isActive, onToggle }) {
  // 如果 courses 是 undefined 或者為空數組，就渲染一個提示訊息或者 loading...
  if (!courses || courses.length === 0) {
    return <div>課程資料正在加載中或者沒有可用的課程。</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Card
          shadow="sm"
          key={course.id}
          isPressable
          onPress={() => console.log('item pressed', course.id)}
          className="relative"
        >
          <Link
            href={`/course/${course.id}`}
            key={course.id}
            className="block relative"
          >
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
              <p className="text-xl line-clamp-1 mb-2">{course.name}</p>
              <p className="line-clamp-2 mb-2">{course.intro}</p>
              <div className="text-small flex justify-between pt-0">
                <p className="text-lg">NT${course.price}</p>
                <p className="text-base flex items-center">
                  <BsFillStarFill className="text-secondary-100 mr-1" />
                  {/* TODO: */}
                  {/* {course.star} */}5
                </p>
              </div>
            </CardFooter>
          </Link>
          {/* <BsFillHeartFill
            className="text-secondary-100 absolute top-4 right-4 z-10 w-6 h-6 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation() // 阻止事件冒泡到卡片的 onPress
              alert('Heart clicked', course.id)
              // 這裡添加切換收藏的邏輯
            }}
          /> */}
          <HeartButton />
        </Card>
      ))}
    </div>
  )
}
