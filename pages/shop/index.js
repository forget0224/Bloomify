import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem, Checkbox } from '@nextui-org/react'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image'
import Image from 'next/image'
import SearchSort from '../../components/shop/search-sort.js'
// import { Slider } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import ShopSlider from '../../components/shop/shop-slider.js'

export default function Shop() {
  // carousel start
  const banners = [
    {
      url: 'https://blog.currentcatalog.com/wp-content/uploads/2019/09/AdobeStock_269466462.jpeg',
    },
    {
      url: 'https://blog.currentcatalog.com/wp-content/uploads/2019/09/AdobeStock_234433400-1024x684.jpeg',
    },
  ]
  // carousel end
  // select categories start
  const categories = [
    {
      title: '全部',
      img: '/assets/shop/pink_Gladiola_0.jpg',
    },
    {
      title: '鮮花類',
      img: '/assets/shop/pink_Gladiola_0.jpg',
    },
    {
      title: '植栽類',
      img: '/assets/shop/pink_Gladiola_0.jpg',
    },
    {
      title: '資材類',
      img: '/assets/shop/pink_Gladiola_0.jpg',
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
      title: 'Avocado',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$12.20',
    },
    {
      title: 'Orange',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$5.50',
    },
    {
      title: 'Tangerine',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$3.00',
    },
    {
      title: 'Raspberry',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$10.00',
    },
    {
      title: 'Lemon',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$5.30',
    },
    {
      title: 'Avocado',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$12.20',
    },
  ]
  // products end

  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div className="mx-auto md:px-52 sm:24">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>線上商城</BreadcrumbItem>
            </Breadcrumbs>
            {/* carousel start */}
            <div className="slide-container">
              <Fade>
                {banners.map((image, index) => (
                  <div key={index} className="h-700">
                    <div
                      className="h-96 bg-cover bg-center"
                      style={{ backgroundImage: `url(${image.url})` }}
                    ></div>
                  </div>
                ))}
              </Fade>
            </div>
            {/* carousel end */}
            {/* select categories start */}
            <div className="flex justify-center flex-wrap my-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`mx-4 ${
                    index === selectedCategory
                      ? 'border-b-2 border-pink-500'
                      : ''
                  }`}
                >
                  <Image
                    width={300}
                    height={300}
                    src={category.img}
                    alt={category.title}
                    className="w-36 h-36 rounded-full mx-auto"
                  />
                  <p className="text-center text-2xl my-6">{category.title}</p>
                </div>
              ))}
            </div>
            {/* select categories end */}

            <SearchSort />
            {/* main section start */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* filter start */}
              <div className="col-span-1 sm:col-span-1">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h1 className="text-xl font-bold mb-5">篩選</h1>
                  <h3 className="text-gray-600 mb-5">共 100 項結果</h3>
                  <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3">子類</h2>
                    <div className="space-y-2">
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        鮮花
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        花盆栽
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        葉材
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        植盆栽
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        器具
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        材料
                      </Checkbox>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3">價格</h2>
                    <div className="flex justify-between">
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
                  <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3">顏色</h2>
                    <div className="place-items-center">
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">红色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#FF0000' }}
                          ></div>
                        </div>
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">橙色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#FFA500' }}
                          ></div>
                        </div>
                      </Checkbox>

                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">黃色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#FFFF00' }}
                          ></div>
                        </div>
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">綠色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#CFDD81' }}
                          ></div>
                        </div>
                      </Checkbox>

                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">藍色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#0000FF' }}
                          ></div>
                        </div>
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">紫色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#8B00FF' }}
                          ></div>
                        </div>
                      </Checkbox>

                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">粉色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#FFC0CB' }}
                          ></div>
                        </div>
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">褐色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: 'red' }}
                          ></div>
                        </div>
                      </Checkbox>

                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">灰色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#704214' }}
                          ></div>
                        </div>
                      </Checkbox>
                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">黑色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#808080' }}
                          ></div>
                        </div>
                      </Checkbox>

                      <Checkbox defaultSelected radius="sm" className="mr-2">
                        <div className="flex items-center">
                          <p className="mr-2">白色</p>
                          <div
                            className="h-4 w-4 rounded-full bg-red-500"
                            style={{ backgroundColor: '#000000' }}
                          ></div>
                        </div>
                      </Checkbox>
                    </div>
                  </div>
                  <div>
                    <MyButton color="primary" size="xs" isOutline>
                      清除選項
                    </MyButton>
                  </div>
                </div>
              </div>
              {/* filter end */}
              <div className="col-span-1 sm:col-span-2">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                  {productList.map((item, index) => (
                    <div key={index} className="shadow-sm">
                      <div className="overflow-visible p-0">
                        <Image
                          src={item.img}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-lg"
                          width={300}
                          height={300}
                        />
                      </div>
                      <div className="pb-0 pt-2 px-4 flex flex-col items-start">
                        <div className="flex justify-between w-full">
                          <b>{item.title}</b>
                          <div className="flex items-center">
                            <p>star</p>
                            <p className="text-default-500">4.0</p>
                          </div>
                        </div>
                        <small className="text-default-500">花店名稱</small>
                        <div className="border border-solid border-2 py-1 px-4 mt-1">
                          <p className="text-xs uppercase font-bold">TAGS</p>
                        </div>
                        <div className="flex justify-between w-full">
                          <h4 className="font-bold text-lg">NT{item.price}</h4>
                          <p className="text-default-500">CART</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold mb-4 sm:text-2xl">繼續探索</h1>
                <MyButton color="primary" size="xl">
                  查看更多
                </MyButton>
              </div>
            </div>
            {/* main section end */}
            <ShopSlider />
          </div>
        </>
      }
    </DefaultLayout>
  )
}
