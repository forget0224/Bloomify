import React from 'react'
import Image from 'next/image'

export default function CourseSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div className="flex flex-row gap-2">
      <div className="order-1">
        <Image
          width={600}
          height={400}
          alt="課程首頁banner圖"
          src="/assets/course/img_course_01_01.png"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-2xl"
          />
        </div>
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-2xl"
          />
        </div>
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-2xl"
          />
        </div>
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  )
}
