import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { useAuth } from '@/hooks/use-auth'
// 小組元件
import { useCourseFavorites } from '@/hooks/use-course-fav'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import CourseSearch from '@/components/course/search'
import Title from '@/components/common/title'
import Sidebar from '@/components/layout/sidebar'
import CardGroup from '@/components/course/card-group'
import CourseDropdown from '@/components/course/dropdown'
import CoursePagination from '@/components/course/pagination'
import Head from 'next/head'

export default function FavoriteCourses() {
  const [activePage, setActivePage] = useState('course')
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const { courseFavorites } = useCourseFavorites()

  // 分頁 ----------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1) // 總頁數
  const cardsPerPage = 12 // 每頁顯示的卡片數量

  // 在 useEffect 中計算總頁數
  useEffect(() => {
    // 根據課程總數計算總頁數
    const totalPagesCount = Math.ceil(courseFavorites.length / cardsPerPage)
    setTotalPages(totalPagesCount)
  }, [courseFavorites, cardsPerPage])

  // 首頁和尾頁索引
  const indexOfLastCourse = currentPage * cardsPerPage
  const indexOfFirstCourse = indexOfLastCourse - cardsPerPage
  // 當前頁顯示的課程
  const currentCourses = courseFavorites.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  )

  // 處理頁面變更的函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 排序query string -------------------------------------------
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

  return (
    <>
      <Head>
        <title>收藏課程</title>
      </Head>
      <DefaultLayout activePage={activePage}>
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 hidden sm:block mt-[64px]">
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
            {/* 標題 */}
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
              <div className="grid gap-y-10 gap-x-6 w-full mt-4 mb-10">
                <CardGroup courses={currentCourses} />
              </div>

              {/* 分頁 */}
              <div className="mt-4">
                <CoursePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </CenterLayout>
      </DefaultLayout>
    </>
  )
}
