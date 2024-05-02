import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'

import { MyButton } from '@/components/btn/mybutton'
import { Select, SelectItem } from '@nextui-org/react'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
// import CourseSearch from '@/components/course/search'

import OrderCard from '@/components/shop/order-card'

export default function CenterShop() {
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
            <div className="flex flex-row w-full justify-center mt-10 sm:mt-0">
              {/* 側邊欄 */}
              <Sidebar />

              <div className="md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
                <Title text="商品訂單" />
                <div className="flex w-full flex-col">
                  <Tabs
                    key={''}
                    radius={'full'}
                    color={'primary'}
                    aria-label="Tabs radius"
                    className="pt-4"
                  >
                    <Tab key="all" title="全部訂單">
                      <div className="flex flex-col gap-4">
                        <OrderCard />
                      </div>
                    </Tab>
                    <Tab key="unfinished" title="未完成">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <OrderCard />
                        </Card>
                      </div>
                    </Tab>
                    <Tab key="finished" title="已完成">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <OrderCard />
                        </Card>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
