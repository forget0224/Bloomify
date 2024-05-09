import { useState, useEffect } from 'react'
import { useLoader } from '@/hooks/use-loader'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Tabs, Tab } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import moment from 'moment'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Loader from '@/components/common/loader'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import CourseSearch from '@/components/course/search'
import CourseDropdown from '@/components/course/dropdown'
import CourseCard from '@/components/course/div-courses'
import CoursePagination from '@/components/course/pagination'
import Head from 'next/head'

export default function MyCourseItems() {
  // const { close, open, isLoading } = useLoader()
  const [orders, setOrders] = useState([])
  const [expiredItems, setExpiredItems] = useState([])
  const [upcomingItems, setUpcomingItems] = useState([])
  const [unreviewedItems, setUnreviewedItems] = useState([])

  const removeReviewedItem = (courseId) => {
    setUnreviewedItems((prevItems) =>
      prevItems.filter((item) => item.course.id !== courseId)
    )
  }

  // 分頁 --------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 // 每頁顯示的課程項目數量
  const [totalPages, setTotalPages] = useState(1) // 總頁數

  // 切換Tab時重置目前頁面
  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
    setCurrentPage(1)
  }

  // 根據目前選擇的Tab計算目前數據源
  const currentData =
    activeTab === 'all'
      ? orders
      : activeTab === 'upcoming'
      ? upcomingItems
      : expiredItems

  // console.log(currentData)

  // 根據當前數據源計算總頁數
  useEffect(() => {
    const totalPagesCount = Math.ceil(currentData.length / itemsPerPage)
    setTotalPages(totalPagesCount)
  }, [currentData, itemsPerPage])

  // 計算當前頁面的數據
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem)

  // console.log(currentItems)

  // 處理頁面變更的函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `http://localhost:3005/api/course-orders`,
          {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'GET',
          }
        )
        const data = await response.json()
        console.log('API data:', data) // 確認數據已接收
        if (response.ok && data.status === 'success') {
          const allItems = []
          data.data.forEach((order) => {
            allItems.push(...order.items) // 將每個訂單的課程項目添加到 allItems
          })
          setOrders(allItems) // 設置 orders 為包含所有課程項的數組
        } else {
          throw new Error('Failed to fetch orders or wrong data structure')
        }
      } catch (error) {
        console.error('Error fetching all orders:', error)
      }
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    const now = new Date()
    const expired = []
    const upcoming = []
    const unreviewed = [] // 未評價

    orders.forEach((item) => {
      const courseDate = new Date(item.course.datetimes[0].date)
      const startTime = item.course.datetimes[0].start_time.split(':')
      courseDate.setHours(startTime[0], startTime[1])

      if (courseDate < now) {
        expired.push(item)
        // 雙重篩選
        if (item.course.reviews.length === 0) {
          // 檢查 reviews 數組有東西還是沒東西
          unreviewed.push(item) // 如果沒東西，添加到未評價數組
        }
      } else {
        upcoming.push(item)
      }
    })

    setExpiredItems(expired)
    setUpcomingItems(upcoming)
    setUnreviewedItems(unreviewed)
    // console.log(unreviewedItems)
  }, [orders])

  // 排序query string更新
  const [sortOption, setSortOption] = useState('預設排序')
  const sortOptions = [
    { value: 'latest', label: '由新到舊' },
    { value: 'oldest', label: '由舊到新' },
  ]
  const handleSortChange = (value) => {
    // 查找對應的標籤
    const option = sortOptions.find((option) => option.value === value)
    const label = option ? option.label : '最新上架'

    setSortOption(label) // 更新狀態為選中的中文標籤
  }

  // 評價 Modal 變數
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [activePage, setActivePage] = useState('course')

  const display = (
    <>
      <Head>
        <title>我的課程</title>
      </Head>
      <DefaultLayout activePage={activePage}>
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 hidden sm:block">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>合作課程</BreadcrumbItem>
              <BreadcrumbItem>我的課程</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          {/* 主要內容 */}
          <div className="flex flex-row w-full justify-center">
            {/* 側邊欄 */}
            <Sidebar />

            {/* 歷史訂單 */}
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
              {/* 訂單明細 */}
              <Title text="我的課程" />
              <div className="flex w-full flex-col">
                <Tabs
                  radius={'full'}
                  color={'primary'}
                  aria-label="Tabs radius"
                  className="pt-4"
                  selectedKey={activeTab}
                  onSelectionChange={handleTabChange}
                >
                  {/* Tab1 - 全部課程 */}
                  <Tab key="all" title="全部課程">
                    {/* 搜尋與排序 */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 pb-2">
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
                    {/* 歷史訂單卡片 */}
                    <div className="flex flex-col gap-4 mt-4 md:mt-0 md:mt-0">
                      {/* 卡片包手風琴 */}
                      {currentItems.map((item) => (
                        <CourseCard
                          key={item.id}
                          course={item}
                          removeReviewedItem={removeReviewedItem}
                        />
                      ))}
                    </div>
                  </Tab>

                  {/* Tab2 - 未完課訂單 */}
                  <Tab key="upcoming" title="未完課">
                    {/* 搜尋與排序 */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 pb-2">
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
                    {/* 歷史訂單卡片 */}
                    <div className="flex flex-col gap-4 mt-4 md:mt-0 md:mt-0">
                      {/* 卡片包手風琴 */}
                      {currentItems.map((item) => (
                        <CourseCard
                          key={item.id}
                          course={item}
                          removeReviewedItem={removeReviewedItem}
                        />
                      ))}
                    </div>
                  </Tab>

                  {/* Tab3 - 已完課訂單 */}
                  <Tab key="expired" title="已完課">
                    {/* 搜尋與排序 */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 pb-2">
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
                    {/* 歷史訂單卡片 */}
                    <div className="flex flex-col gap-4 mt-4 md:mt-0 md:mt-0">
                      {/* 卡片包手風琴 */}
                      {currentItems.map((item) => (
                        <CourseCard
                          key={item.id}
                          course={item}
                          removeReviewedItem={removeReviewedItem}
                        />
                      ))}
                    </div>
                  </Tab>
                </Tabs>
              </div>

              {/* pagination */}
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

  // 使用 isLoading 狀態決定是顯示 loader 還是顯示頁面內容
  return /*isLoading ? <Loader /> :*/ display
}
