import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CardGroup from '@/components/course/card-group'

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/course/subtitle'

export default function CourseDetails() {
  const [activePage, setActivePage] = useState('course')
  const underlines = ['none']

  return (
    <DefaultLayout
      activePage={activePage}
      className="justify-center flex-col items-center"
    >
      <main className="bg-white flex justify-center items-center">
        <div className="container justify-center flex-col items-center">
          {/* 麵包屑 */}
          <div className="bg-white flex flex-col flex-wrap gap-4 py-6">
            {underlines.map((u) => (
              <div key={u}>
                <Breadcrumbs underline={u}>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>合作課程</BreadcrumbItem>
                  <BreadcrumbItem>基礎花藝課程</BreadcrumbItem>
                  <BreadcrumbItem color="primary">
                    韓系乾燥花束製作
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>
          {/* 課程圖和課程資訊 */}
          {/* 開課商家資訊 */}
          {/* 課程最新訊息 */}
          {/* 上課日期 */}
          {/* 課程評價 */}
          {/* 推薦課程 */}
        </div>
      </main>
    </DefaultLayout>
  )
}
