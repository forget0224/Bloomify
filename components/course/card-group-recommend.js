import React, { useRef } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import { BsFillStarFill } from 'react-icons/bs'
import HeartButton from './btn-heart'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { MyButton } from '@/components/btn/mybutton'
import { useAuth } from '@/hooks/use-auth'

export default function CardGroupRecommend({ courses }) {
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const sliderRef = useRef(null)

  if (!courses || courses.length === 0) {
    return <div>課程資料正在加載中或者沒有可用的課程。</div>
  }
  // console.log(courses)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
    ],
  }

  return (
    <div className="slider-container relative">
      <Slider ref={sliderRef} {...settings}>
        {courses.map((course) => (
          <Card
            shadow="sm"
            key={course.id}
            className="relative card-width"
            // isPressable // 加這個會變成button包button，會報錯
            // onPress={() => console.log('item pressed', course.id)}
          >
            <Link href={`/course/${course.id}`} className="block relative">
              <CardBody className="relative overflow-visible p-0">
                <Image
                  isZoomed
                  shadow="none"
                  radius="none"
                  // className="w-full object-cover h-[180px]"
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
                    {course.average_stars}
                  </p>
                </div>
              </CardFooter>
            </Link>
            <div className="absolute top-0 right-0 p-4">
              {/* 傳遞課程 ID 到愛心元件 */}
              {/* 未登入不顯示愛心 */}
              {auth.isAuth && (
                <HeartButton
                  courseId={course.course_id}
                  opacity="text-opacity-40"
                />
              )}
            </div>
          </Card>
        ))}
      </Slider>
      <MyButton
        onClick={() => sliderRef.current.slickPrev()}
        color="white"
        className="shadow-md rounded-full absolute z-20 left-0 -translate-x-1/2 transform top-1/2 -translate-y-1/2"
        isIconOnly
      >
        <BsChevronLeft className="w-4 h-4" />
      </MyButton>
      <MyButton
        onClick={() => sliderRef.current.slickNext()}
        color="white"
        className="shadow-md rounded-full absolute z-20 right-0 translate-x-1/2 transform top-1/2 -translate-y-1/2"
        isIconOnly
      >
        <BsChevronRight className="w-4 h-4" />
      </MyButton>
    </div>
  )
}
