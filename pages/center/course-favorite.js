import { useState } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { Pagination } from '@nextui-org/react'
import Link from 'next/link'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import CourseSearch from '@/components/course/search'
import Title from '@/components/common/title'
import Sidebar from '@/components/layout/sidebar'
import CardGroup from '@/components/course/card-group'

export default function Favorite() {
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
  // const productList = []
  const [activePage, setActivePage] = useState('course')
  return (
    <DefaultLayout activePage={activePage}>
      <>
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 invisible md:visible">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>合作課程</BreadcrumbItem>
              <BreadcrumbItem>收藏課程</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="flex flex-row w-full">
            {/* sidebar start */}
            <Sidebar />
            {/* sidebar end */}

            {/* order content start */}
            <div className="w-10/12 pl-10">
              <Title text="收藏課程" />

              {/* search & select start */}
              <div className="flex justify-between gap-4 py-4">
                {/* searchbar */}
                <div>
                  <CourseSearch />
                </div>
                {/* filter */}
                <div className="flex flex-cols items-center space-x-4">
                  <p className=" text-tertiary-black whitespace-nowrap">排序</p>
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
              {/* search & select end */}

              <div className="grid gap-y-10 gap-x-6 w-full mt-4">
                <CardGroup />
                <CardGroup />
                <CardGroup />
              </div>

              {/* pagination */}
              <Pagination
                color="secondary-100"
                initialPage={3}
                total={10}
                className="flex justify-center mt-6"
              />
            </div>

            {/* <div className="flex justify-center space-x-10 py-10">
                  <MyButton color="primary" size="xl">
                    繼續查看
                  </MyButton>
                </div> */}
          </div>
          {/* order content end */}
        </CenterLayout>
      </>
    </DefaultLayout>
  )
}
