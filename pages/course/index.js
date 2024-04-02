import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Tabs, Tab } from '@nextui-org/react'

import { Image } from '@nextui-org/react'
import CardGroup from '@/components/course/card-group'
import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/common/subtitle'

export default function CourseIndex() {
  const [activePage, setActivePage] = useState('course')
  const underlines = ['none']
  const list = [
    {
      title: '課程一',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_01.png',
      star: '5.0',
      price: 'NT$1200',
    },
    {
      title: '課程二',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_02.png',
      star: '5.0',
      price: 'NT$1000',
    },
    {
      title: '課程三',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_03.png',
      star: '5.0',
      price: 'NT$800',
    },
    {
      title: '課程四',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_04.png',
      star: '5.0',
      price: 'NT$600',
    },
  ]
  return (
    <DefaultLayout
      activePage={activePage}
      className="flex flex-col justify-center items-center"
    >
      {/* 置中 & 背景色 */}
      <main className="flex flex-col justify-center items-center bg-white">
        {/* 主要容器 */}
        <div className="bg-white container justify-center flex flex-col items-start columns-12 static">
          {/* 麵包屑 */}
          <div className="bg-white flex flex-col flex-wrap gap-4 py-6 w-full">
            {underlines.map((u) => (
              <div key={u}>
                <Breadcrumbs underline={u}>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem color="primary">合作課程</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>

          {/* banner圖 & 加入我們 */}
          <div className="relative w-full">
            {/* banner圖 */}
            <Image
              alt="課程首頁banner圖"
              src="/assets/course/img_course_banner.png"
              className="rounded-2xl"
            />
            {/* 加入我們 */}
            <Card className="flex flex-row p-6 columns-2 m-4 md:m-10 absolute top-0 left-0 z-10 rounded-lg">
              <CardBody className="p-0">
                <div className="flex flex-col gap-2 items-start justify-between ">
                  <p>與我們一起提供優質的線下課程，讓更多人愛上花藝</p>
                  <Link
                    href="/pages/join"
                    className="text-primary-100 mb-1 border-b-1 border-primary-100"
                  >
                    加入我們
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* 卡片群組 */}
          <div className="grid gap-y-4 my-14 w-full">
            <Subtitle text="最新課程" className="inline-block" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 w-full">
            <Subtitle text="熱銷課程" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 w-full">
            <Subtitle text="精選商家" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 w-full">
            <Subtitle text="四大分類" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 w-full">
            <Subtitle text="為您推薦" />
            <CardGroup />
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
