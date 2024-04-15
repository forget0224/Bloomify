import React from 'react'
// import { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import { BsFillStarFill, BsFillHeartFill } from 'react-icons/bs'

export default function CardGroup({ courses }) {
  // 如果 courses 是 undefined 或者为空数组，就渲染一个提示信息或者加载指示器
  if (!courses || courses.length === 0) {
    return <div>課程資料正在加載中或者沒有可用的課程。</div>
  }

  // const [courses, setCourses] = useState([])
  // const getCourses = async () => {
  //   //後端的url
  //   const url = 'http://localhost:3005/api/courses'
  //   try {
  //     const res = await fetch(url)
  //     const data = await res.json()
  //     if (Array.isArray(data.data.courses)) {
  //       // 這裡進行資料預處理
  //       const processedCourses = data.data.courses.map((course) => {
  //         if (Array.isArray(course.images) && course.images.length > 0) {
  //           // 如果有主圖片，則選擇它
  //           const mainImage =
  //             course.images.find((image) => image.is_main) || course.images[0]
  //           return { ...course, mainImage: mainImage.path } // 儲存路徑而不是整個物件
  //         } else {
  //           // 否則設置一個預設圖片
  //           return {
  //             ...course,
  //             mainImage: '/assets/course/category-1/img-course-01-01.jpg',
  //           } // 只儲存路徑
  //         }
  //       })
  //       setCourses(processedCourses) // 使用處理過的課程更新狀態
  //     }
  //   } catch (error) {
  //     console.error('Error fetching courses:', error)
  //   }
  // }
  // useEffect(() => {
  //   getCourses()
  // }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course, index) => (
        <Card
          shadow="sm"
          key={course.id}
          isPressable
          onPress={() => console.log('item pressed', course.id)}
          className="relative"
        >
          <Link href="/course/details" key={index} className="block relative">
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
              <p className="text-xl truncate mb-2">{course.name}</p>
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
            <BsFillHeartFill className="text-secondary-100 absolute top-4 right-4 z-10 w-6 h-6" />
          </Link>
        </Card>
      ))}
    </div>
  )
}
