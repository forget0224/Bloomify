import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { Pagination } from '@nextui-org/react'
import { BsChevronRight } from 'react-icons/bs'
import moment from 'moment'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import CourseSearch from '@/components/course/search'

export default function CenterCourse() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchAllCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/course-orders')
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

    fetchAllCourses()
  }, [])

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

  //外層手風琴樣式
  const accordionStyle = {
    base: ['p-0', 'text-tertiary-black', 'p-4'], // 訂單明細
    content: ['p-0'], // 商品列表
    title: ['text-tertiary-black'],
    trigger: ['px-0', 'py-1'],
  }

  const [activePage, setActivePage] = useState('course')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <CenterLayout>
            {/* 麵包屑 */}
            <div className="w-full py-6 invisible md:visible">
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
                <Title text="課程訂單" />
                <div className="flex w-full flex-col">
                  <Tabs
                    key={''}
                    radius={'full'}
                    color={'primary'}
                    aria-label="Tabs radius"
                    className="pt-4"
                  >
                    {/* Tab1 - 全部訂單 */}
                    <Tab key="all" title="全部訂單">
                      {/* 搜尋與排序 */}
                      <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b-1 md:border-0 md:border-0 border-tertiary-gray-200">
                        {/* searchbar */}
                        <div className="w-full md:w-[320px]">
                          <CourseSearch />
                        </div>
                        {/* filter */}
                        <div className="flex flex-cols items-center space-x-4">
                          <p className=" text-tertiary-black whitespace-nowrap">
                            排序
                          </p>
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
                      {/* 歷史訂單卡片 */}
                      <div className="flex flex-col gap-4 mt-4 md:mt-0 md:mt-0">
                        {/* 卡片包手風琴 */}
                        {orders.map((order) => (
                          <Card
                            key={order.id}
                            className="shadow-none border-1 border-tertiary-gray-200"
                          >
                            <Accordion itemClasses={accordionStyle}>
                              <AccordionItem
                                key={''}
                                aria-label={'Accordion 1'}
                                title={
                                  <>
                                    <div className="flex flex-row gap-2 items-center text-nowrap">
                                      訂單號碼
                                      <span className="text-primary-100">
                                        #{order.order_number}
                                      </span>
                                    </div>
                                    <div className="pt-2">
                                      {order.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className="flex flex-col md:flex-row text-base border-b-1 py-1"
                                        >
                                          <span className="md:w-[350px] truncate">
                                            {item.course.name}
                                          </span>
                                          <span className="md:w-[150px]">
                                            {item.course.price}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                }
                              >
                                {/* 手風琴內容 */}
                                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                                  {/* 新表格 */}
                                  <div className="flex flex-col w-full gap-2">
                                    <div className="flex flex-col border-1 border-tertiary-gray-200 rounded-lg p-4 mt-2">
                                      <div className="flex justify-between md:justify-start">
                                        訂單原價：
                                        <span className="ml-1">
                                          NT${order.payment_amount}
                                        </span>
                                      </div>
                                      <div className="flex justify-between md:justify-start">
                                        折扣優惠：
                                        <span className="ml-1 text-primary-100">
                                          NT${order.discount}
                                        </span>
                                      </div>
                                      <div className="flex justify-between md:justify-start">
                                        訂單總價：
                                        <span className="ml-1">
                                          NT${order.total_cost}
                                        </span>
                                      </div>
                                      <div className="flex justify-between md:justify-start">
                                        訂單狀態：
                                        <span className="ml-1">
                                          {order.order_status.name}
                                        </span>
                                      </div>
                                      <div className="flex justify-between md:justify-start">
                                        付款狀態：
                                        <span className="ml-1">
                                          {order.payment_status.name}
                                        </span>
                                      </div>
                                      <div className="flex justify-between md:justify-start">
                                        付款方式：
                                        <span className="ml-1">
                                          {order.payment.name}
                                        </span>
                                      </div>
                                      <div className="flex justify-between md:justify-start">
                                        購買日期：
                                        <span className="ml-1">
                                          {moment(order.created_at).format(
                                            'YYYY/MM/DD'
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </AccordionItem>
                            </Accordion>
                          </Card>
                        ))}
                      </div>
                    </Tab>
                    {/* Tab2 - 未完成訂單 */}
                    <Tab key="unfinished" title="未完成">
                      {/* 搜尋與排序 */}
                      <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b-1 md:border-0 border-tertiary-gray-200">
                        {/* searchbar */}
                        <div className="w-full md:w-[320px]">
                          <CourseSearch />
                        </div>
                        {/* filter */}
                        <div className="flex flex-cols items-center space-x-4">
                          <p className=" text-tertiary-black whitespace-nowrap">
                            排序
                          </p>
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
                      {/* 卡片 */}
                      <div className="flex flex-col gap-4 mt-4 md:mt-0">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            範例範例範例範例範例範例
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                    {/* Tab3 - 已完成訂單 */}
                    <Tab key="finished" title="已完成">
                      {/* 搜尋與排序 */}
                      <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b-1 md:border-0 border-tertiary-gray-200">
                        {/* searchbar */}
                        <div className="w-full md:w-[320px]">
                          <CourseSearch />
                        </div>
                        {/* filter */}
                        <div className="flex flex-cols items-center space-x-4">
                          <p className=" text-tertiary-black whitespace-nowrap">
                            排序
                          </p>
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
                      {/* 卡片 */}
                      <div className="flex flex-col gap-4 mt-4 md:mt-0">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            範例範例範例範例範例範例
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                    {/* Tab4 - 待評價 */}
                    <Tab key="review" title="待評價">
                      {/* 搜尋與排序 */}
                      <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b-1 md:border-0 border-tertiary-gray-200">
                        {/* searchbar */}
                        <div className="w-full md:w-[320px]">
                          <CourseSearch />
                        </div>
                        {/* filter */}
                        <div className="flex flex-cols items-center space-x-4">
                          <p className=" text-tertiary-black whitespace-nowrap">
                            排序
                          </p>
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
                      {/* 卡片 */}
                      <div className="flex flex-col gap-4 mt-4 md:mt-0">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            範例範例範例範例範例範例
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                  </Tabs>
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
      }
    </DefaultLayout>
  )
}
