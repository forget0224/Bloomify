import { useState, useEffect } from 'react'
import { Image } from '@nextui-org/react'
import { Card, CardBody, Link } from '@nextui-org/react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Subtitle from '@/components/common/subtitle'
import SearchBtn from '@/components/course/search'
import CardGroup from '@/components/course/card-group'
import CardGroupCategory from '@/components/course/card-group-category'
import CardGroupStore from '@/components/course/card-group-store'

export default function CourseIndex() {
  const [courses, setCourses] = useState([])
  const [latestCourses, setLatestCourses] = useState([])
  const [randomCourses, setRandomCourses] = useState([])

  useEffect(() => {
    async function fetchAllCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/courses')
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data.courses)) {
          // 處理全部課程數據
          setCourses(processCourses(data.data.courses))
        }
      } catch (error) {
        console.error('Error fetching all courses:', error)
      }
    }

    async function fetchNewestCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/courses/latest')
        const data = await response.json()
        if (
          data.status === 'success' &&
          Array.isArray(data.data.latestCourses)
        ) {
          // 處理最新課程數據
          setLatestCourses(processCourses(data.data.latestCourses))
        }
      } catch (error) {
        console.error('Error fetching latest courses:', error)
      }
    }

    async function fetchRandomCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/courses/random')
        const data = await response.json()
        if (
          data.status === 'success' &&
          Array.isArray(data.data.randomCourses)
        ) {
          // 處理隨機課程數據
          setRandomCourses(processCourses(data.data.randomCourses))
        }
      } catch (error) {
        console.error('Error fetching random courses:', error)
      }
    }

    fetchAllCourses()
    fetchNewestCourses()
    fetchRandomCourses()
  }, [])

  // 處理課程函數
  function processCourses(coursesArray) {
    return coursesArray.map((course) => {
      const mainImage =
        (course.images && course.images.find((image) => image.is_main)) ||
        (course.images && course.images[0])
      return {
        ...course,
        mainImage: mainImage
          ? mainImage.path
          : '/assets/course/category-1/img-course-01-01.jpg',
      }
    })
  }

  const [activePage, setActivePage] = useState('course')

  return (
    <DefaultLayout
      activePage={activePage}
      className="flex flex-col justify-center items-center"
    >
      <CenterLayout>
        {/* 麵包屑 */}
        <div className="w-full py-6 hidden md:block">
          <Breadcrumbs>
            <BreadcrumbItem href="/">首頁</BreadcrumbItem>
            <BreadcrumbItem color="primary">合作課程</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* banner圖 & 加入我們 */}
        <div className="relative w-full">
          {/* banner圖 */}
          <Image
            alt="課程首頁banner圖"
            src="/assets/course/img_course_banner.png"
            className="rounded-2xl"
          />

          <div className="flex flex-col gap-4 md:w-4/12 lg:w-3/12 md:ml-10 mt-4 md:mt-10 md:absolute top-0 left-0 right-0 z-10 rounded-lg">
            {/* 加入我們 */}
            <Card className="flex flex-row p-4 w-full">
              <CardBody className="p-0">
                <div className="flex flex-col gap-2 items-start justify-between ">
                  <p>與我們一起提供優質的線下課程，讓更多人愛上花藝</p>
                  <Link
                    href="/join"
                    className="text-primary-100 mb-1 border-b-1 border-primary-100"
                  >
                    加入我們
                  </Link>
                </div>
              </CardBody>
            </Card>
            {/* 搜尋框 */}
            <SearchBtn baseSearchPath="/course/search" />
            {/* </Link> */}
          </div>
        </div>

        {/* 卡片群組 */}
        <div className="grid gap-y-4 my-14 w-full">
          <Subtitle text="全部課程" className="inline-block" />
          <CardGroup courses={courses} />
        </div>
        {/* 最新課程 */}
        <div className="grid gap-y-4 my-14 w-full">
          <Subtitle text="最新課程" className="inline-block" />
          <CardGroup courses={latestCourses} />
        </div>
        {/* 精選商家 */}
        <div className="grid gap-y-4 my-14 w-full">
          <Subtitle text="精選商家" />
          <CardGroupStore />
        </div>
        {/* 四大分類 */}
        <div className="grid gap-y-4 my-14 w-full">
          <Subtitle text="四大分類" />
          <CardGroupCategory />
        </div>
        {/* 為您推薦 */}
        <div className="grid gap-y-4 my-14 w-full">
          <Subtitle text="為您推薦" />
          <CardGroup courses={randomCourses} />
        </div>
      </CenterLayout>
    </DefaultLayout>
  )
}
