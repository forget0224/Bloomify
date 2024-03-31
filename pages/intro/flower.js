import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CardGroup from '@/components/intro/card-group'

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/intro/subtitle'
import ButtonGL from '@/components/intro/buttonGL'

export default function FlowersIndex() {
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
                  <BreadcrumbItem className="font-serif">首頁</BreadcrumbItem>
                  <BreadcrumbItem className="font-serif">
                    花與遊戲
                  </BreadcrumbItem>
                  <BreadcrumbItem color="primary">花圖鑑</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>

          {/* banner圖 */}
          <Image
            width={1520}
            alt="花圖鑑首頁banner圖"
            src="/assets/intro/intro_flower_banner.png"
            className="rounded-2xl"
          />
          <div className="m-8">
            <Subtitle text="花圖鑑" />
          </div>

          {/* 卡片群組 */}
          <div class="bg-[url('/assets/intro/vintage_speckles.png')]">
            <div className="grid gap-y-4 my-14 ">
              <CardGroup />
            </div>
            <div className="grid gap-y-4 my-14 ">
              <CardGroup />
            </div>
            <div className="grid gap-y-4 my-14 ">
              <CardGroup />
            </div>
            <div className="grid gap-y-4 my-14 ">
              <CardGroup />
            </div>
            <div className="grid gap-y-4 my-14 ">
              <CardGroup />
              <div class="flex justify-center">
                <ButtonGL text="查看更多"></ButtonGL>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
