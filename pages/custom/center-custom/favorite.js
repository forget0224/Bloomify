import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

import Title from '@/components/course/title'
import { Select, SelectItem } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link'
import Sidebar from '@/components/layout/sidebar'
import CardGroup from '@/components/course/card-group'
import { Pagination } from '@nextui-org/react'

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
  const underlines = ['none']
  return (
    <DefaultLayout activePage={activePage}>
      <>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-start columns-12 mb-20">
            {/* 麵包屑 */}
            <div className="bg-white flex flex-col flex-wrap gap-4 py-6 w-full">
              {underlines.map((u) => (
                <div key={u}>
                  <Breadcrumbs underline={u}>
                    <BreadcrumbItem>首頁</BreadcrumbItem>
                    <BreadcrumbItem>會員中心</BreadcrumbItem>
                    <BreadcrumbItem>代客送花</BreadcrumbItem>
                    <BreadcrumbItem color="primary">收藏花束</BreadcrumbItem>
                  </Breadcrumbs>
                </div>
              ))}
            </div>

            <div className="flex flex-row w-full">
              {/* sidebar start */}
              <Sidebar />
              {/* sidebar end */}

              {/* order content start */}
              <div className="w-10/12 pl-10">
                <Title text="收藏花束" />

                {/* search & select start */}
                <div className="flex justify-between gap-4 py-4">
                  {/* searchbar */}
                  <Input
                    variant="bordered"
                    placeholder="搜尋..."
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => {}}
                      >
                        <CiSearch />
                      </button>
                    }
                    className="max-w-xs"
                  />
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
                {/* search & select end */}
              </div>

              {/* <div className="flex justify-center space-x-10 py-10">
                  <MyButton color="primary" size="xl">
                    繼續查看
                  </MyButton>
                </div> */}
            </div>
            {/* order content end */}
          </div>
        </main>
      </>
    </DefaultLayout>
  )
}
