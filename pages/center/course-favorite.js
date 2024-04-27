import { useState, useEffect } from 'react'
import { useCourseFavorites } from '@/hooks/use-course-fav'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { Pagination } from '@nextui-org/react'
import { useAuth } from '@/hooks/use-auth'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import CourseSearch from '@/components/course/search'
import Title from '@/components/common/title'
import Sidebar from '@/components/layout/sidebar'
import CardGroup from '@/components/course/card-group'
import CourseDropdown from '@/components/course/dropdown'

export default function FavoriteCourses() {
  const [activePage, setActivePage] = useState('course')
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const { courseFavorites } = useCourseFavorites()

  // 排序query string更新
  const [sortOption, setSortOption] = useState('預設排序')
  const sortOptions = [
    { value: 'latest', label: '由新到舊' },
    { value: 'cheapest', label: '價格低到高' },
    { value: 'expensive', label: '價格高到低' },
  ]
  const handleSortChange = (value) => {
    // 查找對應的標籤
    const option = sortOptions.find((option) => option.value === value)
    const label = option ? option.label : '最新上架'

    setSortOption(label) // 更新狀態為選中的中文標籤

    // 不需要再次定義sortOptions
    // router.push({
    //   pathname: '/course/search',
    //   query: { ...router.query, sort: value },
    // })
  }

  // 原本的寫法，現在改成用context
  // useEffect(() => {
  //   async function fetchAllCourses() {
  //     try {
  //       const response = await fetch(
  //         'http://localhost:3005/api/courses/get-fav',
  //         {
  //           credentials: 'include', // 設定cookie需要，有作授權或認證時都需要加這個
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json',
  //           },
  //           method: 'GET',
  //         }
  //       )
  //       const data = await response.json()
  //       console.log('API data:', data) // 確認數據已接收
  //       if (response.ok && data.status === 'success') {
  //         // 重新映射數據屬性，同時保留其他屬性
  //         const formattedCourses = data.data.map((course) => ({
  //           ...course, // 展開操作符保留所有其他屬性
  //           mainImage: course.image_path, // 重命名 image_path 為 mainImage
  //         }))

  //         setCourses(formattedCourses) // 直接使用data.data因為他是課程數組
  //       } else {
  //         throw new Error('Failed to fetch courses')
  //       }
  //     } catch (error) {
  //       console.error('Error fetching all courses:', error)
  //     }
  //   }

  //   fetchAllCourses()
  // }, [])

  // 處理課程圖片函數
  // function processCourses(coursesArray) {
  //   return coursesArray.map((course) => {
  //     const mainImage =
  //       (course.images && course.images.find((image) => image.is_main)) ||
  //       (course.images && course.images[0])
  //     return {
  //       ...course,
  //       mainImage: mainImage
  //         ? mainImage.path
  //         : '/assets/course/img-default.jpg',
  //     }
  //   })
  // }

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
                <div className="w-full md: w-fit flex flex-cols items-center">
                  <span className="mr-4 text-tertiary-black text-nowrap">
                    排序
                  </span>
                  <CourseDropdown
                    label="預設排序"
                    options={sortOptions}
                    selectedOption={sortOption}
                    onChange={handleSortChange}
                  />
                </div>
              </div>

              {/* 卡片群組 */}
              <div className="grid gap-y-10 gap-x-6 w-full mt-4">
                <CardGroup courses={courseFavorites} />
              </div>

              {/* pagination */}
              <Pagination
                color="secondary-100"
                initialPage={3}
                total={10}
                className="flex justify-center mt-6"
              />
            </div>
          </div>
        </CenterLayout>
      </>
    </DefaultLayout>
  )
}
