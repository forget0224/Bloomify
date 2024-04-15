import { useState } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { Pagination } from '@nextui-org/react'
import { BsChevronRight } from 'react-icons/bs'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import CourseSearch from '@/components/course/search'

export default function CenterCourse() {
  const imageList = [
    {
      src: '/assets/course/img_course_01_01.png',
    },
  ]
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
                        <Card className="shadow-none border-1 border-tertiary-gray-200">
                          <Accordion itemClasses={accordionStyle}>
                            <AccordionItem
                              key="1"
                              aria-label="Accordion 1"
                              title={
                                <>
                                  <div className="flex flex-row gap-2 items-center">
                                    訂單號碼
                                    <span className="text-primary-100">
                                      #1234567812345678
                                    </span>
                                  </div>
                                  <div className="pt-2">
                                    <div className="flex flex-col md:flex-row text-base border-b-1 py-1">
                                      <span className="md:w-[350px] truncate">
                                        韓系乾燥花課程
                                      </span>
                                      <span className="md:w-[150px]">
                                        NT$1000
                                      </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row text-base border-b-1 py-1">
                                      <span className="md:w-[350px] truncate">
                                        多肉小盆栽課程
                                      </span>
                                      <span className="md:w-[150px]">
                                        NT$800
                                      </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row text-base py-1">
                                      <span className="md:w-[350px] truncate">
                                        母親節花束製作課程
                                      </span>
                                      <span className="md:w-[150px]">
                                        NT$200
                                      </span>
                                    </div>
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
                                      <span className="ml-1">NT$3600</span>
                                    </div>
                                    <div className="flex justify-between md:justify-start">
                                      折扣優惠：
                                      <span className="ml-1 text-primary-100">
                                        NT$50
                                      </span>
                                    </div>
                                    <div className="flex justify-between md:justify-start">
                                      訂單總價：
                                      <span className="ml-1">NT$3550</span>
                                    </div>
                                    <div className="flex justify-between md:justify-start">
                                      訂單狀態：
                                      <span className="ml-1">
                                        已完成/未完成
                                      </span>
                                    </div>
                                    <div className="flex justify-between md:justify-start">
                                      付款狀態：
                                      <span className="ml-1">
                                        已付款/未付款
                                      </span>
                                    </div>
                                    <div className="flex justify-between md:justify-start">
                                      付款方式：
                                      <span className="ml-1">LINE PAY</span>
                                    </div>
                                    <div className="flex justify-between md:justify-start">
                                      成立時間：
                                      <span className="ml-1">
                                        2024/04/14 16:53:08
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionItem>
                          </Accordion>
                        </Card>
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
