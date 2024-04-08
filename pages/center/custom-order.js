import { useState } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'

export default function Profile() {
  const [activePage, setActivePage] = useState('center')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 invisible md:visible">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>我的訂單</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="flex flex-row w-full justify-center">
            <Sidebar />
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
              <Title text="我的訂單" />
            </div>
          </div>
        </CenterLayout>
      }
    </DefaultLayout>
  )
}
