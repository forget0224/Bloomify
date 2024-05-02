import { useState, useEffect } from 'react'
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
// import CourseSearch from '@/components/course/search'

import ShopOrderFinish from '@/components/shop/shop-order-finish'
import ShopOrderUnfinish from '@/components/shop/shop-order-unfinish'

export default function CenterShop() {
  const [activePage, setActivePage] = useState('shop')

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
  // 評價 Modal 變數
  const { isOpen, onOpen } = useDisclosure()
  const imageList = [
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
    },
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
    },
  ]

  //商品列表 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base'], // 表格
    wrapper: ['text-base', 'shadow-none', 'border-1'], // 整個表格
  }

  // 獲得訂單明細資料
  const [orderDetails, setOrderDetails] = useState([])
  console.log(orderDetails)

  // 獲得訂單明細
  const getOrderDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/products/get-order-details`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data.data)
      }
    } catch (error) {
      // console.log('Error order detail', error)
    }
  }
  useEffect(() => {
    getOrderDetail()
  }, [])

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
            <div className="flex flex-row w-full justify-center mt-10 sm:mt-0">
              {/* 側邊欄 */}
              <Sidebar />

              {/* 歷史訂單 */}
              <div className="md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
                {/* 訂單明細 */}
                <Title text="商品訂單" />
                <div className="flex w-full flex-col">
                  {/* 搜尋框 */}
                  {/* <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-between pb-4 ">
                    <div>
                      <CourseSearch />
                    </div>
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
                  </div> */}
                  <Tabs
                    key={''}
                    radius={'full'}
                    color={'primary'}
                    aria-label="Tabs radius"
                    className="pt-4"
                  >
                    <Tab key="all" title="全部訂單">
                      <div className="flex flex-col gap-4">
                        <ShopOrderFinish
                          accordionStyle={accordionStyle}
                          tableStyles={tableStyles}
                          imageList={imageList}
                          tableStylesContent={tableStylesContent}
                        />
                        <ShopOrderUnfinish
                          accordionStyle={accordionStyle}
                          tableStyles={tableStyles}
                          imageList={imageList}
                          tableStylesContent={tableStylesContent}
                        />
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
                      {/* <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </CardBody>
                        </Card>
                      </div> */}
                    </Tab>
                    {/* finished end */}
                    {/* review start */}
                    {/* <Tab key="review" title="待評價">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </CardBody>
                        </Card>
                      </div>
                    </Tab> */}
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
            {/* <Review
              onOpen={onOpen}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            /> */}
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
