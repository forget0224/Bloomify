import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CardGroup from '@/components/course/card-group'

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/course/subtitle'

export default function Course() {
  const underlines = ['none']
  return (
    <DefaultLayout className="justify-center flex-col items-center">
      <main className="bg-white flex justify-center items-center">
        <div className="container justify-center flex-col items-center">
          {/* 麵包屑 */}
          <div className="bg-white flex flex-col flex-wrap gap-4 py-6">
            {underlines.map((u) => (
              <div key={u}>
                <Breadcrumbs underline={u}>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem color="primary">合作課程</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>

          {/* banner圖 */}
          <Image
            width={1520}
            alt="課程首頁banner圖"
            src="/assets/course/img_course_banner.png"
            className="rounded-2xl"
          />

          {/* 卡片群組 */}
          <div className="grid gap-y-4 my-14 ">
            <Subtitle text="最新課程" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 ">
            <Subtitle text="熱銷課程" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 ">
            <Subtitle text="精選商家" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 ">
            <Subtitle text="四大分類" />
            <CardGroup />
          </div>
          <div className="grid gap-y-4 my-14 ">
            <Subtitle text="為您推薦" />
            <CardGroup />
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
