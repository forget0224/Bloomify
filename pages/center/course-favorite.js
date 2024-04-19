import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { Pagination } from '@nextui-org/react'
import Link from 'next/link'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import CourseSearch from '@/components/course/search'
import Title from '@/components/common/title'
import Sidebar from '@/components/layout/sidebar'
import CardGroup from '@/components/course/card-group'

export default function FavoriteCourses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function fetchAllCourses() {
      try {
        const response = await fetch(
          'http://localhost:3005/api/course-favorites'
        )
        const data = await response.json()
        console.log('API data:', data) // 確認數據已接收
        if (response.ok && data.status === 'success') {
          setCourses(processCourses(data.data)) // 直接使用data.data因為他是課程數組
        } else {
          throw new Error('Failed to fetch courses')
        }
      } catch (error) {
        console.error('Error fetching all courses:', error)
      }
    }

    fetchAllCourses()
  }, [])

  // 處理課程圖片函數
  function processCourses(coursesArray) {
    return coursesArray.map((course) => {
      const mainImage =
        (course.images && course.images.find((image) => image.is_main)) ||
        (course.images && course.images[0])
      return {
        ...course,
        mainImage: mainImage
          ? mainImage.path
          : '/assets/course/img-default.jpg',
      }
    })
  }

  const list = [
    {
      title: 'Orange',
    },
    {
      title: 'Tangerine',
    },
    {
      title: 'Raspberry',
    },
  ]

  const [activePage, setActivePage] = useState('course')

  return (
    <DefaultLayout activePage={activePage}>
      <>
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 invisible md:visible">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>合作課程</BreadcrumbItem>
              <BreadcrumbItem>收藏課程</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          {/* 主要內容 */}
          <div className="flex flex-row w-full justify-center">
            {/* 側邊欄 */}
            <Sidebar />

            {/* order content start */}
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
              <Title text="收藏課程" />

              {/* 搜尋與排序 */}
              <div className="flex flex-col md:flex-row justify-between gap-4 py-4 border-b-1 md:border-0 md:border-0 border-tertiary-gray-200">
                {/* searchbar */}
                <div className="w-full md:w-[320px]">
                  <CourseSearch />
                </div>
                {/* filter */}
                <div className="flex flex-cols items-center space-x-4">
                  <p className=" text-tertiary-black whitespace-nowrap">排序</p>
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['Orange']}
                    className="max-w-xs md:w-48 w-full"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {list.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              {/* 卡片群組 */}
              <div className="grid gap-y-10 gap-x-6 w-full mt-4">
                <CardGroup courses={courses} />
              </div>

              {/* pagination */}
              <Pagination
                color="secondary-100"
                initialPage={3}
                total={10}
                className="flex justify-center mt-6"
              />
            </div>

            {/* <div className="flex justify-center space-x-10 py-10">
                  <MyButton color="primary" size="xl">
                    繼續查看
                  </MyButton>
                </div> */}
          </div>
          {/* order content end */}
        </CenterLayout>
      </>
    </DefaultLayout>
  )
}
