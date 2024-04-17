import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CardGroup from '@/components/intro/card-group'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/intro/subtitle'
import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'
import { CiSearch } from 'react-icons/ci'
import { Select, SelectItem } from '@nextui-org/react'
import { Input } from '@nextui-org/react'

export default function FlowersIndex() {
  const [activePage, setActivePage] = useState('course')
  const underlines = ['none']
  // products start
  const productList = [
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado',
      starCount: '5.0',
      shop: 'shop1',
      tag: 'hot sale',
      price: '$15.70',
    },
    {
      img: '/assets/shop/products/red_Amaryllis_3.jpg',
      title: 'Watermelon',
      starCount: '4.0',
      shop: 'shop2',
      tag: 'hot sale',
      price: '$8.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Apple',
      starCount: '3.0',
      shop: 'shop3',
      tag: 'hot sale',
      price: '$44.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Orange',
      starCount: '5.0',
      shop: 'shop4',
      tag: 'hot sale',
      price: '$78.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Peach',
      starCount: '2.5',
      shop: 'shop5',
      tag: 'hot sale',
      price: '$24.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: '場合',
      starCount: '4.0',
      shop: 'shop6',
      tag: 'hot sale',
      price: '$5.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: '顏色',
      starCount: '4.5',
      shop: 'shop7',
      tag: 'hot sale',
      price: '$28.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: '對象',
      starCount: '5.0',
      shop: 'shop8',
      tag: 'hot sale',
      price: '$35.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: '季節',
      starCount: '5.0',
      shop: 'shop9',
      tag: 'hot sale',
      price: '$45.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'A-Z',
      starCount: '3.0',
      shop: 'shop10',
      tag: 'hot sale',
      price: '$35.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Z-A',
      starCount: '4.5',
      shop: 'shop11',
      tag: 'hot sale',
      price: '$10.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: '預設排序',
      starCount: '2.0',
      shop: 'shop12',
      tag: 'hot sale',
      price: '$25.70',
    },
  ]
  // products end
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
          {/* banner圖 & 加入我們 */}
          <div className="relative w-full">
            {/* banner圖 */}
            <Image
              alt="花圖鑑首頁banner圖"
              src="/assets/intro/intro_flower_banner.png"
              className="rounded-2xl"
            />
            {/* 文字方塊 */}

            <Card className="flex flex-row p-6 columns-2 m-4 md:m-10 absolute top-0 left-0 z-10 rounded-lg opacity-50">
              <CardBody className="p-0">
                <div className="flex flex-col gap-1 items-start justify-between">
                  {/* <h1>
                    "Si tu aimes une fleur qui se trouve dans un etoile, c'est
                    doux, la nuit, de regarder le ciel."─Le petit Prince
                  </h1> */}
                  <p>
                    「如果你愛著一朵盛開在浩瀚星海裡的花，那麼當你抬頭仰望繁星時，便會感到幸福。」─小王子
                    Le petit Prince
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
                <div className="flex flex-cols items-center space-x-2">
                  
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['場合']}
                    className="max-w-xs w-24"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {productList.map((item, index) => (
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
                    {productList.map((item, index) => (
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
                    {productList.map((item, index) => (
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
                    {productList.map((item, index) => (
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
                    className="max-w-xs w-48"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {productList.map((item, index) => (
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
                <MyButton>查看更多</MyButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
