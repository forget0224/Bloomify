import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
import CardGroup from '@/components/course/card-group'

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/common/subtitle'
import CardNews from '@/components/course/card-news'
import CardTime from '@/components/course/card-time'
import CoursePagination from '@/components/course/pagination'
import CourseRating from '@/components/course/course-rating'
import CourseFavorite from '@/components/course/course-favorite'
import CourseShare from '@/components/course/course-share'
import CourseMap from '@/components/course/course-map-card'
import CourseSlider from '@/components/course/banner-silder'
import CourseComment from '@/components/course/course-comment'
import CourseRatingFilter from '@/components/course/filter-rating'

import { BsChevronRight } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

export default function CourseDetails() {
  const [activePage, setActivePage] = useState('course')
  const underlines = ['none']

  return (
    <DefaultLayout
      activePage={activePage}
      className="justify-center flex-col items-center"
    >
      <main className="bg-white flex justify-center items-center px-5">
        <div className="container justify-center flex flex-col items-center">
          {/* 麵包屑 */}
          <div className="bg-white flex flex-col w-full gap-4 py-6">
            {underlines.map((u) => (
              <div key={u}>
                <Breadcrumbs underline={u}>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>合作課程</BreadcrumbItem>
                  <BreadcrumbItem>基礎花藝課程</BreadcrumbItem>
                  <BreadcrumbItem color="primary">
                    韓系乾燥花束製作
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>
          {/* 課程圖和課程資訊 */}
          <div className="flex flex-col gap-6 md:flex-row mb-12">
            {/* -課程圖 */}
            <div className="md:w-6/12 w-full mb-6 md:mb-0">
              <CourseSlider />
            </div>
            {/* -課程資訊 */}
            <div className="md:w-6/12 w-full flex flex-col gap-6">
              {/* 主要資訊 */}
              <div className="flex flex-col gap-4">
                <div className="">
                  <p className="text-3xl">韓系乾燥花束製作</p>
                  <div className="flex justify-between">
                    <CourseRating />
                    <div className="flex flex-row">
                      <CourseFavorite />
                      <CourseShare />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="line-clamp-4">
                    歡迎參加我們的韓系乾燥花束製作課程！這堂課將教導您如何選擇適合的花材，以及製作出擁有濃厚韓風風格的精美花束。我們將分享製作過程中的技巧和訣竅，包括花材的層次搭配、包裝技術等，讓您能輕鬆打造出獨一無二的乾燥花藝品。無論您是初學者還是有一定經驗的花藝愛好者，都能在這堂課中獲得滿足感和成就感。透過豐富多彩的花束，帶著層層美好，為生活增添一抹花香。我們將分享製作過程中的技巧和訣竅，包括花材的層次搭配、包裝技術等，讓您能輕鬆打造出獨一無二的乾燥花藝品。
                  </div>
                  <p className="text-tertiary-gray-100 flex items-center mt-1">
                    查看詳細
                    <BsChevronRight />
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-primary-300 px-2">基礎花藝課程</span>
                  <span className="bg-primary-300 px-2">熱賣中</span>
                  <span className="bg-primary-300 px-2">可使用優惠券</span>
                </div>
              </div>
              {/* 購買卡片 */}
              <div className="p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col gap-2">
                  <p>
                    課程定價<span className="text-2xl ml-2">NT$1200</span>
                  </p>
                  <p>
                    課程人數<span className="ml-2">4-12人</span>
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  <MyButton
                    color="primary"
                    size="xl"
                    isOutline
                    className="w-full"
                  >
                    加入購物車
                  </MyButton>
                  <MyButton color="primary" size="xl" className="w-full">
                    立即預約
                  </MyButton>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-16 static overflow:auto">
            {/* 開課商家資訊 */}
            <div className="w-full md:w-5/12 order-0 md:order-1 h-fit sticky top-0">
              <CourseMap />
            </div>
            {/* 其他詳細資訊 */}
            <div className="flex md:w-7/12 flex-col w-full gap-[80px]">
              {/* 課程最新訊息 */}
              <div className="flex flex-col gap-6">
                <Subtitle text="課程最新訊息" />
                <CardNews />
              </div>
              {/* 上課日期 */}
              <div className="flex flex-col gap-6">
                <Subtitle text="上課日期" />
                <div className="flex flex-col gap-4">
                  <CardTime />
                  <CardTime />
                  <CardTime />
                </div>
              </div>
              {/* 課程評價 */}
              <div className="flex flex-col gap-6">
                <Subtitle text="課程評價" />
                {/* 總評分 */}
                <div className="flex flex-row gap-2">
                  <span className="text-2xl">4.0</span>
                  <span className="text-2xl">/</span>
                  <span className="text-2xl">5</span>
                  <div className="flex flex-row items-center text-secondary-100">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-secondary-200" />
                    <FaStar className="text-secondary-200" />
                  </div>
                </div>
                {/* filter */}
                <div>
                  <CourseRatingFilter />
                </div>
                {/* 評價 */}
                <div>
                  <CourseComment />
                  <CourseComment />
                  <CourseComment />
                </div>
                <div>
                  <CoursePagination />
                </div>
              </div>
              {/* 推薦課程 */}
              <div className="flex flex-col gap-5 mb-[80px]">
                <Subtitle text="推薦課程" />
                <CardGroup className="overflow-x-auto" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
