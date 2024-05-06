import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import CoursePagination from '@/components/course/pagination'
import moment from 'moment'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import CourseSearch from '@/components/course/search'
import CourseOrder from '@/components/course/div-orders'

export default function CenterCourse() {
  const [orders, setOrders] = useState([])
  const [unpaidOrders, setUnpaidOrders] = useState([])
  const [paidOrders, setPaidOrders] = useState([])

  // 分頁 --------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('all') // 管理目前選擇的Tab
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5 // 每頁顯示的訂單卡片數量
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
      : activeTab === 'unpaid'
      ? unpaidOrders
      : paidOrders

  // 根據當前數據源計算總頁數
  useEffect(() => {
    const totalPagesCount = Math.ceil(currentData.length / ordersPerPage)
    setTotalPages(totalPagesCount)
  }, [currentData, ordersPerPage])

  // 計算當前頁面的數據
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = currentData.slice(indexOfFirstOrder, indexOfLastOrder)

  // 處理頁面變更的函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    async function fetchAllOrders() {
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
          setOrders(data.data)
        } else {
          throw new Error('Failed to fetch courses')
        }
      } catch (error) {
        console.error('Error fetching all orders:', error)
      }
    }

    fetchAllOrders()
  }, [])

  // 訂單狀態篩選
  useEffect(() => {
    const unpaidOrders = orders.filter(
      (order) => order.payment_status.name === '未付款'
    )
    const paidOrders = orders.filter(
      (order) => order.payment_status.name === '已付款'
    )
    setUnpaidOrders(unpaidOrders)
    setPaidOrders(paidOrders)
    // console.log('unpaidOrders:', unpaidOrders)
    // console.log('paidOrders:', paidOrders)
  }, [orders])

  const [activePage, setActivePage] = useState('course')

  return (
    <DefaultLayout activePage={activePage}>
      <>
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 hidden sm:block">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>合作課程</BreadcrumbItem>
              <BreadcrumbItem>課程訂單</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          {/* 主要內容 */}
          <div className="flex flex-row w-full justify-center">
            {/* 側邊欄 */}
            <Sidebar />
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
              <Title text="課程訂單" />

              {/* 訂單Tab */}
              <div className="flex w-full flex-col">
                <Tabs
                  radius={'full'}
                  color={'primary'}
                  className="mt-4"
                  aria-label="Order tabs"
                  selectedKey={activeTab}
                  onSelectionChange={handleTabChange}
                >
                  {/* Tab1 - 全部訂單 */}
                  <Tab key="all" title="全部訂單">
                    {/* 搜尋與排序 */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b-1 md:border-0 md:border-0 border-tertiary-gray-200">
                      {/* searchbar */}
                      <div className="w-full md:w-[320px]">
                        <CourseSearch />
                      </div>
                    </div>
                    {/* 訂單卡片 */}
                    {currentOrders.map((order) => (
                      <CourseOrder key={order.id} order={order} />
                    ))}
                  </Tab>

                  {/* Tab2 - 待付款訂單 */}
                  <Tab key="unpaid" title="待付款" className="flex flex-col">
                    {/* 搜尋與排序 */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b-1 md:border-0 md:border-0 border-tertiary-gray-200">
                      {/* searchbar */}
                      <div className="w-full md:w-[320px]">
                        <CourseSearch />
                      </div>
                    </div>
                    {/* 訂單卡片 */}
                    {currentOrders.map((order) => (
                      <CourseOrder key={order.id} order={order} />
                    ))}
                  </Tab>

                  {/* Tab3 - 已付款訂單 */}
                  <Tab key="paid" title="已付款">
                    {/* 搜尋與排序 */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b-1 md:border-0 md:border-0 border-tertiary-gray-200">
                      {/* searchbar */}
                      <div className="w-full md:w-[320px]">
                        <CourseSearch />
                      </div>
                    </div>
                    {/* 訂單卡片 */}
                    {currentOrders.map((order) => (
                      <CourseOrder key={order.id} order={order} />
                    ))}
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
      </>
    </DefaultLayout>
  )
}
