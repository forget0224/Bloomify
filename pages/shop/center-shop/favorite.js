import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import { Breadcrumbs, BreadcrumbItem, table } from '@nextui-org/react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { BsFillStarFill } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import Link from 'next/link'
// 小組元件
import { MyButton } from '@/components/btn/mybutton'
import CourseSearch from '@/components/course/search'

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
  ]
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <CenterLayout>
            {/* 麵包屑 */}
            <div className="w-full py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>會員中心</BreadcrumbItem>
                <BreadcrumbItem>線上商城</BreadcrumbItem>
                <BreadcrumbItem>收藏商品</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* 主要內容 */}
            <div className="flex flex-row w-full">
              {/* 側邊欄 */}
              <Sidebar />

              {/* order content start */}
              <div className="w-10/12 pl-10">
                <Title text="收藏商品" />

                {/* search & select start */}
                <div className="flex justify-between gap-4 py-4">
                  {/* searchbar */}
                  <div>
                    <CourseSearch />
                  </div>
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

                {/* 卡片 */}
                <div className="flex w-full flex-col rounded-lg gap-4 grid grid-cols-3 sm:grid-cols-3">
                  {productList.map((item, index) => (
                    <Card
                      shadow="sm"
                      key={index}
                      isPressable
                      onPress={() => console.log('item pressed')}
                    >
                      <CardBody className="relative overflow-visible p-0">
                        <Link
                          href="/shop/details"
                          key={index}
                          className="block relative"
                        >
                          <BsHeartFill className="absolute right-3 top-3 sm:right-5 sm:top:5 sm:w-6 sm:h-6 z-10 text-secondary-100" />
                          <Image
                            shadow="none"
                            radius="none"
                            width="100%"
                            alt={item.title}
                            className="w-full object-cover h-[140px] z-0"
                            src={item.img}
                          />
                        </Link>
                      </CardBody>
                      <CardHeader className="block text-left">
                        <div className="flex justify-between">
                          <p className="text-xl truncate">{item.title}</p>
                          <p className="text-base flex items-center space-x-1">
                            <BsFillStarFill className="text-secondary-100" />
                            {item.star}
                            <span>{item.starCount}</span>
                          </p>
                        </div>
                        <p className="text-base">{item.shop}</p>
                      </CardHeader>
                      <CardFooter className="text-small justify-between">
                        <p className="text-xl truncate">{item.price}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* 按鈕群組 */}
                <div className="flex justify-center space-x-10 py-10">
                  <MyButton color="primary" size="xl">
                    繼續查看
                  </MyButton>
                </div>
              </div>
              {/* order content end */}
            </div>
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
