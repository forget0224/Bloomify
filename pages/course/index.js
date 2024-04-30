import { useState, useEffect } from 'react'
import { Image, Card, CardBody, Link } from '@nextui-org/react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { useAuth } from '@/hooks/use-auth'
import { useCourseFavorites } from '@/hooks/use-course-fav'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Subtitle from '@/components/common/subtitle'
import SearchBtn from '@/components/course/search'
import CardGroup from '@/components/course/card-group'
import CardGroupCategory from '@/components/course/card-group-category'
import CardGroupStore from '@/components/course/card-group-store'

export default function CourseIndex() {
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const [courses, setCourses] = useState([]) // 全部課程的狀態管理
  const [latestCourses, setLatestCourses] = useState([]) // 最新課程的狀態管理
  const [randomCourses, setRandomCourses] = useState([]) // 隨機課程的狀態管理
  const { addFavoritesStatusToCourses } = useCourseFavorites()

  useEffect(() => {
    async function fetchAllCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/courses')
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data.courses)) {
          // 使用 addFavoritesStatusToCourses 來整合收藏狀態
          const updatedCourses = addFavoritesStatusToCourses(data.data.courses)
          // 處理課程主圖並將處理過後的資料儲存在狀態中
          setCourses(processCourses(updatedCourses))
        }
      } catch (error) {
        console.error('Error fetching all courses:', error)
      }
    }

    async function fetchNewestCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/courses/latest')
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data.courses)) {
          // 使用 addFavoritesStatusToCourses 来整合收藏状态
          const updatedCourses = addFavoritesStatusToCourses(data.data.courses)
          // 處理最新課程數據
          setLatestCourses(processCourses(updatedCourses))
        }
      } catch (error) {
        console.error('Error fetching latest courses:', error)
      }
    }

    async function fetchRandomCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/courses/random')
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data.courses)) {
          // 使用 addFavoritesStatusToCourses 来整合收藏狀態
          const updatedCourses = addFavoritesStatusToCourses(data.data.courses)
          // 處理隨機課程數據
          setRandomCourses(processCourses(updatedCourses))
        }
      } catch (error) {
        console.error('Error fetching random courses:', error)
      }
    }

    fetchAllCourses()
    fetchNewestCourses()
    fetchRandomCourses()
  }, [addFavoritesStatusToCourses])

  // 處理資料添加mainImage屬性(前端處理，不會動到資料)
  function processCourses(coursesArray) {
    return coursesArray.map((course) => {
      const mainImage =
        // 找到被標示為is_main的圖，或者是使用index=0的第一張圖，設定為mainImage
        (course.images && course.images.find((image) => image.is_main)) ||
        (course.images && course.images[0])
      return {
        ...course,
        course_id: course.id, // 新增字段 course_id 等於原 id 字段的值
        mainImage: mainImage
          ? mainImage.path
          : '/assets/course/img-default.jpg',
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
