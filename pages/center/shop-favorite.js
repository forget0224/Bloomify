import { useState, useEffect } from 'react'
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
import { BsFillStarFill, BsHeartFill, BsHeart } from 'react-icons/bs'
import Link from 'next/link'
// 小組元件
import { MyButton } from '@/components/btn/mybutton'
import CourseSearch from '@/components/course/search'

export default function Favorite() {
  // const list = [
  //   {
  //     title: 'Orange',
  //   },
  //   {
  //     title: 'Tangerine',
  //   },
  //   {
  //     title: 'Raspberry',
  //   },
  // ]
  // const productList = [
  //   {
  //     img: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
  //     title: 'Avocado',
  //     starCount: '5.0',
  //     shop: 'shop1',
  //     tag: 'hot sale',
  //     price: '$15.70',
  //   },
  //   {
  //     img: '/assets/shop/products/flowers/red_Amaryllis_3.jpg',
  //     title: 'Watermelon',
  //     starCount: '4.0',
  //     shop: 'shop2',
  //     tag: 'hot sale',
  //     price: '$8.70',
  //   },
  //   {
  //     img: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
  //     title: 'Apple',
  //     starCount: '3.0',
  //     shop: 'shop3',
  //     tag: 'hot sale',
  //     price: '$44.70',
  //   },
  //   {
  //     img: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
  //     title: 'Orange',
  //     starCount: '5.0',
  //     shop: 'shop4',
  //     tag: 'hot sale',
  //     price: '$78.70',
  //   },
  //   {
  //     img: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
  //     title: 'Peach',
  //     starCount: '2.5',
  //     shop: 'shop5',
  //     tag: 'hot sale',
  //     price: '$24.70',
  //   },
  // ]

  // 拿取localStorage資料
  const [isFavClicked, setIsFavClicked] = useState([])
  console.log(isFavClicked)
  useEffect(() => {
    // 從本地端拿資料
    const storedFav = localStorage.getItem('favProducts')
    if (storedFav) {
      setIsFavClicked(JSON.parse(storedFav))
    }
  }, [])

  // 收藏用
  const [isFavHovered, setIsFavHovered] = useState([])
  const handleMouseEnter = (productId) => {
    // prev:更新基於前一個狀態值
    setIsFavHovered((prev) => [...prev, productId])
  }
  const handleMouseLeave = (productId) => {
    setIsFavHovered((prev) => prev.filter((id) => id !== productId))
  }

  // const toggleFavClick = (productId) => {
  //   // 判斷產品是否已是收藏
  //   const newFavStatus = !isFavClicked.includes(productId)

  //   // 更新狀態
  //   setIsFavClicked((prev) => {
  //     const updatedFavs = newFavStatus
  //       ? [...prev, productId]
  //       : prev.filter((id) => id !== productId)
  //     return updatedFavs
  //   })

  //   // 更新LocalStorage
  //   if (newFavStatus) {
  //     // 新增收藏，找到該商品id並存入本地端
  //     const productToAdd = isFavClicked.find(
  //       (product) => product.id === productId
  //     )
  //     if (productToAdd) {
  //       const favProducts = JSON.parse(
  //         localStorage.getItem('favProducts') || '[]'
  //       )
  //       localStorage.setItem(
  //         'favProducts',
  //         JSON.stringify([...favProducts, productToAdd])
  //       )
  //     }
  //   } else {
  //     // 取消收藏，從LocalStorage移除
  //     const favProducts = JSON.parse(
  //       localStorage.getItem('favProducts') || '[]'
  //     )
  //     const filteredProducts = favProducts.filter(
  //       (product) => product.id !== productId
  //     )
  //     localStorage.setItem('favProducts', JSON.stringify(filteredProducts))
  //   }
  // }

  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <CenterLayout>
            {/* 麵包屑 */}
            <div className="hidden sm:block sm:w-full sm:py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>會員中心</BreadcrumbItem>
                <BreadcrumbItem>線上商城</BreadcrumbItem>
                <BreadcrumbItem>收藏商品</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* 主要內容 */}
            <div className="flex flex-row w-full justify-center mt-10 sm:mt-0">
              {/* 側邊欄 */}
              <Sidebar />

              {/* order content start */}
              <div className="md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
                <Title text="收藏商品" />

                {/* search & select start */}
                <div className="space-y-4 mt-4 mt-0 sm:space-y-0 sm:flex sm:justify-between pb-4 ">
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
                      {/* {list.map((item, index) => (
                        <SelectItem key={item.title} value={item.title}>
                          {item.title}
                        </SelectItem>
                      ))} */}
                    </Select>
                  </div>
                </div>
                {/* search & select end */}

                {/* 卡片 */}
                <div className="sm:w-10/12">
                  <div className="bg-white p-4 rounded-lg gap-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full">
                    {isFavClicked.map((product, index) => {
                      let imageUrl = `/assets/shop/products/default_fallback_image.jpg`
                      if (Array.isArray(product.images)) {
                        const nonThumbnailImage = product.images.find(
                          (image) => !image.is_thumbnail
                        )
                        if (nonThumbnailImage) {
                          imageUrl = `/assets/shop/products/${product.directory}/${nonThumbnailImage.url}`
                        }
                      }
                      return (
                        <>
                          <div className="relative">
                            <button
                              onMouseEnter={() => handleMouseEnter(product.id)}
                              onMouseLeave={() => handleMouseLeave(product.id)}
                              className="absolute z-20 text-secondary-100 ${isFavClicked.includes(product.id) ? 'selected-class' : ''}"
                              style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '1rem',
                              }}
                            >
                              {isFavClicked.includes(product.id) ||
                              isFavHovered.includes(product.id) ? (
                                <BsHeart size={24} />
                              ) : (
                                <BsHeartFill size={24} />
                              )}
                            </button>
                            <Card
                              shadow="sm"
                              key={product.id}
                              isPressable
                              onPress={() => console.log('item pressed')}
                              className="w-full"
                            >
                              <CardBody className="overflow-visible p-0">
                                <Link
                                  href={{
                                    pathname: '/shop/[pid]', // dynamic route
                                    query: { pid: product.id }, // setting pid to product ID
                                  }}
                                  className="block relative"
                                >
                                  <Image
                                    isZoomed
                                    shadow="none"
                                    radius="none"
                                    width="100%"
                                    alt={product.name}
                                    className="w-full object-cover h-[250px] z-0"
                                    src={imageUrl}
                                  />
                                </Link>
                              </CardBody>
                              <CardHeader className="block text-left">
                                <div className="flex justify-between">
                                  <p className="text-xl truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-base flex items-center space-x-1">
                                    <BsFillStarFill className="text-secondary-100" />
                                    {product.star}
                                    <span>{product.overall_review}</span>
                                  </p>
                                </div>
                                <p className="text-base text-tertiary-gray-100">
                                  {product.stores.store_name}
                                </p>
                                <div className="flex flex-wrap">
                                  {product.tags.map((tag) => (
                                    <p
                                      key={tag.id}
                                      className="text-base px-2.5 py-0.5 inline-block bg-primary-300 mr-2"
                                    >
                                      {tag.name}
                                    </p>
                                  ))}
                                </div>
                              </CardHeader>
                              <CardFooter className="text-small justify-between">
                                <p className="text-xl truncate">
                                  NT${product.price}
                                </p>
                              </CardFooter>
                            </Card>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
                {/* products end */}

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
