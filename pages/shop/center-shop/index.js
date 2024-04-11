import { useState } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import { Select, SelectItem } from '@nextui-org/react'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import Review from '@/components/shop/center/review'
import CourseSearch from '@/components/course/search'

export default function CenterShop() {
  const imageList = [
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
    },
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
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
    base: ['p-0', 'text-tertiary-black'], // 訂單明細
    content: ['p-0'], // 商品列表
    title: ['text-tertiary-black'],
    trigger: ['px-0', 'py-1', 'pb-4'],
  }

  //訂單明細 table 樣式
  const tableStyles = {
    base: ['text-tertiary-black'],
    th: ['text-base'], // 表頭
    td: ['text-base', 'px-0', 'py-1'], // 表格
    wrapper: ['text-base'], // 整個表格
  }

  //商品列表 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base'], // 表格
    wrapper: ['text-base', 'shadow-none', 'border-1'], // 整個表格
  }

  // 評價 Modal 變數
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <CenterLayout>
            {/* 麵包屑 */}
            <div className="hidden sm:block w-full py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>會員中心</BreadcrumbItem>
                <BreadcrumbItem>線上商城</BreadcrumbItem>
                <BreadcrumbItem>商品訂單</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* 主要內容 */}
            <div className="flex flex-row w-full justify-center">
              {/* 側邊欄 */}
              <Sidebar />

              {/* 歷史訂單 */}
              <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
                {/* 訂單明細 */}
                <Title text="商品訂單" />
                <div className="flex w-full flex-col">
                  <Tabs
                    key={''}
                    radius={'full'}
                    color={'primary'}
                    aria-label="Tabs radius"
                    className="pt-4"
                  >
                    {/* all order start */}
                    <Tab key="all" title="全部訂單">
                      {/* 搜尋框 */}
                      <div className="space-y-4 flex flex-col justify-center sm:flex sm:justify-between sm:gap-4 pb-4">
                        {/* searchbar */}
                        <div>
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
                            className="max-w-xs w-48"
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
                      <div className="flex flex-col gap-4">
                        {/* 卡片一 */}
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            {/* 手風琴 */}
                            <Accordion itemClasses={accordionStyle}>
                              <AccordionItem
                                key="1"
                                aria-label="Accordion 1"
                                title="訂單編號#2024010901234567"
                                // 訂單資訊(手風琴標題)
                                subtitle={
                                  <div className="flex flex-col gap-2 mt-2">
                                    <Table
                                      hideHeader
                                      aria-label="Example static collection table"
                                      removeWrapper
                                      classNames={tableStyles}
                                    >
                                      <TableHeader>
                                        <TableColumn>xx</TableColumn>
                                        <TableColumn>xx</TableColumn>
                                      </TableHeader>
                                      <TableBody>
                                        <TableRow
                                          key="1"
                                          className="flex gap-4"
                                        >
                                          <TableCell>訂單金額</TableCell>
                                          <TableCell>NT$90</TableCell>
                                        </TableRow>
                                        <TableRow
                                          key="2"
                                          className="flex gap-4"
                                        >
                                          <TableCell>付款狀態</TableCell>
                                          <TableCell>已付款</TableCell>
                                        </TableRow>
                                        <TableRow
                                          key="3"
                                          className="flex gap-4"
                                        >
                                          <TableCell>訂單狀態</TableCell>
                                          <TableCell className="text-danger">
                                            處理中
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>

                                    <div className="flex gap-2">
                                      {imageList.map((image, index) => (
                                        <Image
                                          key={index}
                                          src={image.src}
                                          alt=""
                                          className="w-24 h-24 rounded-md md:rounded-xl"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                }
                              >
                                {/* 商品列表(手風琴內容) */}
                                <div className="flex flex-col">
                                  <Table
                                    selectionMode="single"
                                    defaultSelectedKeys={['2']}
                                    aria-label="Example static collection table"
                                    classNames={tableStylesContent}
                                  >
                                    <TableHeader className="bg-secondary-200">
                                      <TableColumn className="w-1/2 md:w-1/3 lg:w-1/4 bg-primary-300">
                                        商品
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        單價
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        數量
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        小計
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        評價
                                      </TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow key="1">
                                        <TableCell>
                                          <div className="flex flex-row items-center sm:gap-4">
                                            <Image
                                              src={
                                                '/assets/shop/products/flowers/pink_Gladiola_0.jpg'
                                              }
                                              alt=""
                                              className="hidden sm:block sm:w-16 sm:h-16 mx-auto rounded-xl"
                                            />
                                            <div>
                                              <p className="text-nowrap">
                                                花的名稱
                                              </p>
                                              <p className="text-nowrap md:contents text-tertiary-gray-100">
                                                店家名稱
                                              </p>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>NT$30</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>NT$90</TableCell>
                                        <TableCell>
                                          <MyButton
                                            color="primary"
                                            size="xs"
                                            className="text-base"
                                            isOutline
                                            onClick={onOpen}
                                          >
                                            去評價
                                          </MyButton>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow key="2">
                                        <TableCell>
                                          <div className="flex flex-row items-center sm:gap-4">
                                            <Image
                                              src={
                                                '/assets/shop/products/flowers/pink_Gladiola_0.jpg'
                                              }
                                              alt=""
                                              className="hidden sm:block sm:w-16 sm:h-16 mx-auto rounded-xl"
                                            />
                                            <div>
                                              <p className="text-nowrap">
                                                花的名稱
                                              </p>
                                              <p className="text-nowrap md:contents text-tertiary-gray-100">
                                                店家名稱
                                              </p>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>NT$30</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>NT$90</TableCell>
                                        <TableCell>
                                          <MyButton
                                            color="primary"
                                            size="xs"
                                            isOutline
                                            className="text-base"
                                            onClick={onOpen}
                                          >
                                            去評價
                                          </MyButton>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                  {/* 付款資訊, 運送資訊 */}
                                  <div className="flex flex-col pt-4 w-full">
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        付款方式
                                      </div>
                                      <div className="py-1 text-nowrap">
                                        Line Pay
                                      </div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        寄送方式
                                      </div>
                                      <div className="py-1">7-ELEVEN 超商</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        運送資訊
                                      </div>
                                      <div className="py-1">已取貨</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        發票種類
                                      </div>
                                      <div className="py-1">載具</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        送達時間
                                      </div>
                                      <div className="py-1">
                                        2024-02-27 11:02:08
                                      </div>
                                    </div>
                                    <hr className="my-1" />
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        小計
                                      </div>
                                      <div className="py-1">NT$90</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        運費
                                      </div>
                                      <div className="py-1">NT$60</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        折扣
                                      </div>
                                      <div className="py-1 text-primary-100">
                                        -NT$50
                                      </div>
                                    </div>
                                    <div className="flex w-full text-nowrap items-center">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        總計
                                      </div>
                                      <div className="py-1 text-lg font-medium">
                                        NT$100
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </AccordionItem>
                            </Accordion>
                          </CardBody>
                        </Card>
                        {/* 卡片二 */}
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            {/* 手風琴 */}
                            <Accordion itemClasses={accordionStyle}>
                              <AccordionItem
                                key="1"
                                aria-label="Accordion 1"
                                title="訂單編號#2024010901234567"
                                // 訂單資訊(手風琴標題)
                                subtitle={
                                  <div className="flex flex-col gap-2 mt-2">
                                    <Table
                                      hideHeader
                                      aria-label="Example static collection table"
                                      removeWrapper
                                      classNames={tableStyles}
                                    >
                                      <TableHeader>
                                        <TableColumn>xx</TableColumn>
                                        <TableColumn>xx</TableColumn>
                                      </TableHeader>
                                      <TableBody>
                                        <TableRow
                                          key="1"
                                          className="flex gap-4"
                                        >
                                          <TableCell>訂單金額</TableCell>
                                          <TableCell>NT$90</TableCell>
                                        </TableRow>
                                        <TableRow
                                          key="2"
                                          className="flex gap-4"
                                        >
                                          <TableCell>付款狀態</TableCell>
                                          <TableCell>已付款</TableCell>
                                        </TableRow>
                                        <TableRow
                                          key="3"
                                          className="flex gap-4"
                                        >
                                          <TableCell>訂單狀態</TableCell>
                                          <TableCell className="text-primary">
                                            已完成
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>

                                    <div className="flex gap-2">
                                      {imageList.map((image, index) => (
                                        <Image
                                          key={index}
                                          src={image.src}
                                          alt=""
                                          className="w-24 h-24 rounded-md md:rounded-xl"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                }
                              >
                                {/* 商品列表(手風琴內容) */}
                                <div className="flex flex-col">
                                  <Table
                                    selectionMode="single"
                                    defaultSelectedKeys={['2']}
                                    aria-label="Example static collection table"
                                    classNames={tableStylesContent}
                                  >
                                    <TableHeader className="bg-secondary-200">
                                      <TableColumn className="w-1/2 md:w-1/3 lg:w-1/4 bg-primary-300">
                                        商品
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        單價
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        數量
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        小計
                                      </TableColumn>
                                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                                        評價
                                      </TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow key="1">
                                        <TableCell>
                                          <div className="flex flex-row items-center sm:gap-4">
                                            <Image
                                              src={
                                                '/assets/shop/products/flowers/pink_Gladiola_0.jpg'
                                              }
                                              alt=""
                                              className="hidden sm:block sm:w-16 sm:h-16 mx-auto rounded-xl"
                                            />
                                            <div>
                                              <p className="text-nowrap">
                                                花的名稱
                                              </p>
                                              <p className="text-nowrap md:contents text-tertiary-gray-100">
                                                店家名稱
                                              </p>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>NT$30</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>NT$90</TableCell>
                                        <TableCell>
                                          <MyButton
                                            color="primary"
                                            size="xs"
                                            className="text-base"
                                            isOutline
                                            onClick={onOpen}
                                          >
                                            去評價
                                          </MyButton>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow key="2">
                                        <TableCell>
                                          <div className="flex flex-row items-center sm:gap-4">
                                            <Image
                                              src={
                                                '/assets/shop/products/flowers/pink_Gladiola_0.jpg'
                                              }
                                              alt=""
                                              className="hidden sm:block sm:w-16 sm:h-16 mx-auto rounded-xl"
                                            />
                                            <div>
                                              <p className="text-nowrap">
                                                花的名稱
                                              </p>
                                              <p className="text-nowrap md:contents text-tertiary-gray-100">
                                                店家名稱
                                              </p>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>NT$30</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>NT$90</TableCell>
                                        <TableCell>
                                          <MyButton
                                            color="primary"
                                            size="xs"
                                            isDisabled
                                            className="text-base"
                                          >
                                            已評價
                                          </MyButton>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                  {/* 付款資訊, 運送資訊 */}
                                  <div className="flex flex-col pt-4 w-full">
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        付款方式
                                      </div>
                                      <div className="py-1 text-nowrap">
                                        Line Pay
                                      </div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        寄送方式
                                      </div>
                                      <div className="py-1">7-ELEVEN 超商</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        運送資訊
                                      </div>
                                      <div className="py-1">已取貨</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        發票種類
                                      </div>
                                      <div className="py-1">載具</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        送達時間
                                      </div>
                                      <div className="py-1">
                                        2024-02-27 11:02:08
                                      </div>
                                    </div>
                                    <hr className="my-1" />
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        小計
                                      </div>
                                      <div className="py-1">NT$90</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        運費
                                      </div>
                                      <div className="py-1">NT$60</div>
                                    </div>
                                    <div className="flex w-full text-nowrap">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        折扣
                                      </div>
                                      <div className="py-1 text-primary-100">
                                        -NT$50
                                      </div>
                                    </div>
                                    <div className="flex w-full text-nowrap items-center">
                                      <div className="py-1 mr-2 text-tertiary-gray-100">
                                        總計
                                      </div>
                                      <div className="py-1 text-lg font-medium">
                                        NT$100
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </AccordionItem>
                            </Accordion>
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                    {/* all order end */}
                    {/* unfinished start */}
                    <Tab key="unfinished" title="未完成">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                    {/* unfinished end */}
                    {/* finished start */}
                    <Tab key="finished" title="已完成">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                    {/* finished end */}
                    {/* review start */}
                    <Tab key="review" title="待評價">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                    {/* review end */}
                  </Tabs>
                </div>

                {/* 按鈕群組 */}
                <div className="flex justify-center py-10">
                  <MyButton color="primary" size="xl">
                    繼續查看
                  </MyButton>
                </div>
              </div>
            </div>

            {/* 評價 Modal */}
            <Review
              onOpen={onOpen}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
