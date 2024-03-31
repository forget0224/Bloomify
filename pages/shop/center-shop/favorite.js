import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem, table } from '@nextui-org/react'
import Subtitle from '@/components/course/subtitle'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import { Select, SelectItem } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link'
import { BsFillStarFill } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'

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
          <div className="mx-auto md:px-52 sm:24">
            <div className="py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>會員中心</BreadcrumbItem>
                <BreadcrumbItem>線上商城</BreadcrumbItem>
                <BreadcrumbItem>收藏商品</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div className="flex space-x-10">
              {/* sidebar start */}
              <Card className="max-w-60 w-full h-auto">
                <CardBody className="space-y-8">
                  <div className="flex justify-center items-center space-x-2 my-4">
                    <Image
                      // key={}
                      src="/assets/shop/products/pink_Gladiola_0.jpg"
                      alt=""
                      className="w-8 h-8 md:w-8 md:h-8 rounded-full"
                    />
                    <p className="text-2xl text-tertiary-black font-medium">
                      會員姓名
                    </p>
                  </div>
                  {/* custom start */}
                  <div>
                    <p className=" text-tertiary-gray-1">代客送花</p>
                    <div className="py-4">
                      <hr />
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-col gap-2">
                        <Link href="#" className="hover:text-primary">
                          我的訂單
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          收藏花束
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* custom end */}
                  {/* shop start */}
                  <div>
                    <p className=" text-tertiary-gray-1">線上商城</p>
                    <div className="py-4">
                      <hr />
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-col  gap-2">
                        <Link href="#" className="hover:text-primary">
                          我的訂單
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          收藏商品
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* shop end */}
                  {/* course start */}
                  <div>
                    <p className=" text-tertiary-gray-1">課程預約</p>
                    <div className="py-4">
                      <hr />
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-col  gap-2">
                        <Link href="#" className="hover:text-primary">
                          我的課程
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          我的課表
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          收藏課程
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* course end */}
                  {/* intro start */}
                  <div>
                    <p className=" text-tertiary-gray-1">花占卜</p>
                    <div className="py-4">
                      <hr />
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-col  gap-2">
                        <Link href="#" className="hover:text-primary">
                          占卜紀錄
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* intro end */}
                  {/* member start */}
                  <div>
                    <p className=" text-tertiary-gray-1">我的帳戶</p>
                    <div className="py-4">
                      <hr />
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-col  gap-2">
                        <Link href="#" className="hover:text-primary">
                          個人資料
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          優惠券
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* member end */}
                </CardBody>
              </Card>
              {/* sidebar end */}
              {/* order content start */}
              <div className="max-w-296 w-full">
                <div className="my-4">
                  <Subtitle text="收藏商品" />
                </div>
                <div>
                  {/* search & select start */}

                  <div className="flex justify-end space-x-6 my-2">
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
                  <div className="flex w-full flex-col">
                    <div className="bg-white p-4 rounded-lg gap-2 grid grid-cols-3 sm:grid-cols-3 w-full">
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
                              <p class="text-xl truncate">{item.title}</p>
                              <p className="text-base flex items-center space-x-1">
                                <BsFillStarFill className="text-secondary-100" />
                                {item.star}
                                <span>{item.starCount}</span>
                              </p>
                            </div>
                            <p class="text-base">{item.shop}</p>
                          </CardHeader>
                          <CardFooter className="text-small justify-between">
                            <p class="text-xl truncate">{item.price}</p>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-10 py-10">
                  <MyButton color="primary" size="xl">
                    繼續查看
                  </MyButton>
                </div>
              </div>
              {/* order content end */}
            </div>
          </div>
        </>
      }
    </DefaultLayout>
  )
}
