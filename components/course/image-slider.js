import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CourseImageSlider() {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="order-1 md:order-2">
        <Image
          width={600}
          height={400}
          alt="課程首頁banner圖"
          src="/assets/course/img-default.jpg"
          className="rounded-2xl"
        />
      </div>
      <div className="flex md:flex-col justify-center gap-2 order-2 md:order-1">
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-lg lg:rounded-2xl"
          />
        </div>
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-lg lg:rounded-2xl"
          />
        </div>
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-lg lg:rounded-2xl"
          />
        </div>
        <div>
          <Image
            width={120}
            height={80}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_01_01.png"
            className="rounded-lg lg:rounded-2xl"
          />
        </div>
      </div>
    </div>
  )
}
