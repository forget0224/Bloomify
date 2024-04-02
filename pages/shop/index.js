import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem, Checkbox } from '@nextui-org/react'
import 'react-slideshow-image/dist/styles.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { BsFillStarFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import { Select, SelectItem } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { CiSearch } from 'react-icons/ci'
import { MyButton } from '@/components/btn/mybutton'
import ShopSlider from '../../components/shop/shop-slider.js'
import Subtitle from '@/components/course/subtitle.js'
import Link from 'next/link.js'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { BiSolidLeaf } from 'react-icons/bi'
import { IoMdFlower } from 'react-icons/io'
import { BsFillGridFill } from 'react-icons/bs'
import { FaToolbox } from 'react-icons/fa'

export default function Shop() {
  // carousel start
  const banners = [
    {
      url: '/assets/shop/products/pink_Gladiola_0.jpg',
    },
    {
      url: '/assets/shop/products/red_Amaryllis_3.jpg',
    },
    {
      url: '/assets/shop/products/red_Snapdragon_1.jpg',
    },
  ]
  // carousel end
  // select categories start
  const categories = [
    {
      title: '全部',
      icon: <BsFillGridFill />,
    },
    {
      title: '鮮花類',
      icon: <IoMdFlower />,
    },
    {
      title: '植栽類',
      icon: <BiSolidLeaf />,
    },
    {
      title: '資材類',
      icon: <FaToolbox />,
    },
  ]
  const initialSelectedCategoryIndex = categories.findIndex(
    (category) => category.title === '全部'
  )
  const defaultIndex =
    initialSelectedCategoryIndex !== -1 ? initialSelectedCategoryIndex : 0
  const [selectedCategory, setSelectedCategory] = useState(defaultIndex)
  // select categories end
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
      title: 'Avocado1',
      starCount: '4.0',
      shop: 'shop6',
      tag: 'hot sale',
      price: '$5.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado2',
      starCount: '4.5',
      shop: 'shop7',
      tag: 'hot sale',
      price: '$28.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado3',
      starCount: '5.0',
      shop: 'shop8',
      tag: 'hot sale',
      price: '$35.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado4',
      starCount: '5.0',
      shop: 'shop9',
      tag: 'hot sale',
      price: '$45.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado5',
      starCount: '3.0',
      shop: 'shop10',
      tag: 'hot sale',
      price: '$35.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado6',
      starCount: '4.5',
      shop: 'shop11',
      tag: 'hot sale',
      price: '$10.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado7',
      starCount: '2.0',
      shop: 'shop12',
      tag: 'hot sale',
      price: '$25.70',
    },
  ]
  // products end
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout
      activePage={activePage}
      className="justify-center flex-col items-center"
    >
      <main className="bg-white flex justify-center items-center">
        <div className="container justify-center flex-col items-center">
          <Breadcrumbs>
            <BreadcrumbItem className="font-serif">首頁</BreadcrumbItem>
            <BreadcrumbItem color="primary">線上商城</BreadcrumbItem>
          </Breadcrumbs>

          {/* carousel start */}

          {/* carousel end */}
          {/* select categories start */}
          <div className="flex justify-center flex-wrap">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`mx-4 ${
                  index === selectedCategory
                    ? 'border-b-2 border-secondary-100'
                    : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex justify-center items-center text-primary">
                  {category.icon}
                </div>

                <p className="text-center my-6">{category.title}</p>
              </div>
            ))}
          </div>
          {/* select categories end */}
          {/* search & select start */}
          <div className="flex py-6 justify-between">
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
              <p className="text-xl text-tertiary-black whitespace-nowrap">
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
                {productList.map((item, index) => (
                  <SelectItem key={item.title} value={item.title}>
                    {item.title}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* search & select end */}
          {/* main section start */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* filter start */}
            <div className="bg-white p-4 rounded-lg shadow-md space-y-8 max-w-[335px]">
              <Subtitle text="篩選" />
              <p className=" text-tertiary-black">共 100 項結果</p>

              <div className="space-y-4">
                <p className="text-lg text-tertiary-black">子類</p>
                <div className="space-y-2">
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <p className=" text-tertiary-black">鮮花</p>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <p className=" text-tertiary-black">花盆栽</p>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <p className=" text-tertiary-black">葉材</p>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <p className=" text-tertiary-black">植盆栽</p>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <p className=" text-tertiary-black">器具</p>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <p className=" text-tertiary-black">材料</p>
                  </Checkbox>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="space-y-4">
                <p className="text-lg text-tertiary-black">價格</p>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="最低價格"
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="h-px w-10 bg-gray-400"></div>
                  <input
                    type="text"
                    placeholder="最高價格"
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="space-y-4">
                <p className="text-lg text-tertiary-black">顏色</p>
                <div className="place-items-center space-y-2">
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">红色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#FF0000' }}
                      ></div>
                    </div>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">橙色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#FFA500' }}
                      ></div>
                    </div>
                  </Checkbox>

                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">黃色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#FFFF00' }}
                      ></div>
                    </div>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">綠色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#CFDD81' }}
                      ></div>
                    </div>
                  </Checkbox>

                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">藍色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#0000FF' }}
                      ></div>
                    </div>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">紫色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#8B00FF' }}
                      ></div>
                    </div>
                  </Checkbox>

                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">粉色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#FFC0CB' }}
                      ></div>
                    </div>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">褐色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: 'red' }}
                      ></div>
                    </div>
                  </Checkbox>

                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">灰色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#704214' }}
                      ></div>
                    </div>
                  </Checkbox>
                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">黑色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#808080' }}
                      ></div>
                    </div>
                  </Checkbox>

                  <Checkbox defaultSelected radius="sm" className="mr-2">
                    <div className="flex items-center">
                      <p className=" mr-2">白色</p>
                      <div
                        className="h-4 w-4 rounded-full bg-red-500"
                        style={{ backgroundColor: '#000000' }}
                      ></div>
                    </div>
                  </Checkbox>
                </div>
              </div>
              <div className="flex justify-center">
                <MyButton color="primary" size="xl" isOutline>
                  清除選項
                </MyButton>
              </div>
            </div>
            {/* filter end */}
            {/* products starts */}
            <div className="bg-white p-4 rounded-lg gap-2 grid sm:grid-cols-2 md:grid-cols-3 w-full">
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
                      <BsHeart className="absolute right-3 top-3 sm:right-5 sm:top:5 sm:w-6 sm:h-6 z-10 text-secondary-100" />
                      <Image
                        shadow="none"
                        radius="none"
                        width="100%"
                        height="100%"
                        alt={item.title}
                        className="w-full object-cover h-[200px] z-0"
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
                    <p class="text-base px-2.5 py-0.5 inline-block bg-primary">
                      {item.tag}
                    </p>
                  </CardHeader>
                  <CardFooter className="text-small justify-between">
                    <p class="text-xl truncate">{item.price}</p>
                    <p className="text-base items-center">
                      <PiShoppingCartSimpleFill className="text-primary-100 h-6 w-6" />
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {/* products end */}
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold mb-4 sm:">繼續探索</h1>
              <MyButton color="primary" size="xl">
                查看更多
              </MyButton>
            </div>
          </div>
          {/* main section end */}
          <ShopSlider />
        </div>
      </main>
    </DefaultLayout>
  )
}
