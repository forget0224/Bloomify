import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CardGroupClean from '@/components/intro/card-group-clean'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/intro/subtitle'
import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import SearchBtn from '@/components/intro/search-btn'
import { CiSearch } from 'react-icons/ci'

export default function FlowersIndex() {
  const [activePage, setActivePage] = useState('course')
  const underlines = ['none']

  //occList start
  const occList = [
    { id: 0, title: '場合' },
    { id: 1, title: '生日慶祝' },
    { id: 2, title: '情人節' },
    { id: 3, title: '新婚喜慶' },
    {
      id: 4,
      title: '母親節',
    },
    { id: 5, title: '慰問安慰' },
    {
      id: 6,
      title: '感謝禮物',
    },
    { id: 7, title: '慶祝祝賀' },
    {
      id: 8,
      title: '紀念日',
    },
  ]
  //occList end

  //colorList start
  const colorList = [
    {
      id: 0,
      title: '顏色',
    },
    {
      id: 1,
      title: '紅色',
    },
    {
      id: 2,
      title: '橘色',
    },
    {
      id: 3,
      title: '黃色',
    },
    {
      id: 4,
      title: '綠色',
    },
    {
      id: 5,
      title: '藍色',
    },
    {
      id: 6,
      title: '紫色',
    },
    {
      id: 7,
      title: '粉色',
    },
    {
      id: 8,
      title: '棕色',
    },
    {
      id: 9,
      title: '灰色',
    },
    {
      id: 10,
      title: '黑色',
    },
    {
      id: 11,
      title: '白色',
    },
    { id: 12, title: '其他' },
  ]
  //colorList end

  //roleList start
  const roleList = [
    {
      id: 0,
      title: '對象',
    },
    {
      id: 1,
      title: '長輩',
    },
    {
      id: 2,
      title: '朋友',
    },
    {
      id: 3,
      title: '同學',
    },
    {
      id: 4,
      title: '師長',
    },
    {
      id: 5,
      title: '戀人',
    },
    {
      id: 6,
      title: '工作伙伴',
    },
    {
      id: 7,
      title: '新生嬰兒',
    },
    {
      id: 8,
      title: '親人',
    },
    { id: 9, title: '新婚夫婦' },
  ]
  //roleList end

  //seasonList start
  const seasonList = [
    {
      id: 0,
      title: '季節',
    },
    {
      id: 1,
      title: '春',
    },
    { id: 2, title: '夏' },
    {
      id: 3,
      title: '秋',
    },
    { id: 4, title: '冬' },
    {
      id: 5,
      title: '全年',
    },
  ]
  //seasonList end

  //sortList start
  const sortList = [
    {
      id: 0,
      title: '預設排序',
    },
    {
      id: 1,
      title: 'A-Z',
    },
    {
      id: 2,
      title: 'Z-A',
    },
  ]
  //sortList end
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
                  <BreadcrumbItem>花與遊戲</BreadcrumbItem>
                  <BreadcrumbItem color="primary">花圖鑑</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>
          {/* ------------花圖鑑首頁banner  ------------start*/}
          {/* banner圖  */}
          <div className="relative w-full">
            {/* banner圖 */}
            <Image
              alt="花圖鑑首頁banner圖"
              src="/assets/intro/intro_flower_banner.png"
              className="rounded-2xl"
            />
            {/* 文字方塊 */}

            <Card className="flex flex-row p-3 columns-2 m-4 md:m-10 absolute top-0 left-0 z-10 rounded-lg opacity-80">
              <CardBody className="p-0">
                <div className="flex flex-col gap-1 items-start justify-between">
                  {/* <h1>
                    "Si tu aimes une fleur qui se trouve dans un etoile, c'est
                    doux, la nuit, de regarder le ciel."─Le petit Prince
                  </h1> */}
                  <p>
                    「如果你愛著一朵盛開在浩瀚星海裡的花，那麼當你抬頭仰望繁星時，便會感到幸福。」─《小王子Le Petit Prince》
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* ------------花圖鑑首頁banner ------------end*/}

          {/* 卡片群組 */}
          <div className="bg-[url('/assets/intro/vintage_speckles.png')]">
            <div className="m-8 bg-transparent">
              <Subtitle text="花圖鑑" />
              {/* search & select start */}
              <div className="flex py-10 px-15 justify-between w-full">
                {/* searchbar */}
                <SearchBtn />
                {/* filter */}
                <div className="flex flex-cols items-center space-x-2">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['場合']}
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {occList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-cols items-center space-x-4">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['顏色']}
                    className="max-w-xs w-24"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {colorList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-cols items-center space-x-4">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['對象']}
                    className="max-w-xs w-24"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {roleList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-cols items-center space-x-4">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['季節']}
                    className="max-w-xs w-24"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {seasonList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-cols items-center space-x-4">
                  <p className="text-lg text-tertiary-black whitespace-nowrap">
                    排序
                  </p>
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['預設排序']}
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {sortList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              {/* search & select end */}
            </div>
            <div className="grid gap-y-4 my-14 ">
              <CardGroupClean />
              <div class="flex justify-center">
                <MyButton>查看更多</MyButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
