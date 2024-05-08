import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import OrderList from '@/components/custom/OrderList'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import Head from 'next/head'
export default function CustomOrder() {
  const [orderList, setOrderList] = useState([])
  const [activePage, setActivePage] = useState('custom')
  return (
    <>
      <Head>
        <title>花束訂單</title>
      </Head>
      <DefaultLayout activePage={activePage}>
        {
          <>
            <CenterLayout>
              <div className="hidden sm:block w-full py-6">
                <Breadcrumbs>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>會員中心</BreadcrumbItem>
                  <BreadcrumbItem>代客送花</BreadcrumbItem>
                  <BreadcrumbItem>商品訂單</BreadcrumbItem>
                </Breadcrumbs>
              </div>
              <div className="flex flex-row w-full justify-center mt-10 sm:mt-0">
                <Sidebar />

                <div className="sm:w-10/12 pl-0 sm:pl-10     w-screen">
                  <Title text="商品訂單" />
                  <div className="flex w-full flex-col">
                    <OrderList />
                  </div>
                </div>
              </div>
            </CenterLayout>
          </>
        }
      </DefaultLayout>
    </>
  )
}
