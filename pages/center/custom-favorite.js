import { useState, useEffect } from 'react'
import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Select,
  SelectItem,
} from '@nextui-org/react'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import CourseSearch from '@/components/course/search'
import Title from '@/components/common/title'
import Sidebar from '@/components/layout/sidebar'
import { ColorProvider } from '@/hooks/use-color'
import FavoriteCard from '@/components/custom/common/FavoriteCard'
export default function FavoriteCustom() {
  return (
    <ColorProvider>
      <DefaultLayout activePage="custom">
        <CenterLayout>
          {/* Breadcrumbs */}
          <div className="w-full py-6 invisible md:visible">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>代客送花</BreadcrumbItem>
              <BreadcrumbItem>收藏花束</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div className="flex flex-row w-full justify-center">
            <Sidebar />

            <div className="w-full sm:w-10/12 pl-0 md:pl-10">
              <Title text="收藏花束" />

              <div className="flex flex-col  justify-between gap-4 py-4 border-b border-tertiary-gray-200 flex-wrap">
                <div className="  md:w-[320px] md:flex-shrink-0">
                  <CourseSearch />
                </div>

                <div className="flex-grow w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 justify-items-center">
                    <FavoriteCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CenterLayout>
      </DefaultLayout>
    </ColorProvider>
  )
}
