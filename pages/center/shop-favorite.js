import { useState, useEffect, useMemo } from 'react'
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
// import { MyButton } from '@/components/btn/mybutton'
import SearchBtn from '@/components/shop/search'
import HeartButton from '@/components/shop/btn-heart'

export default function Favorite() {
  const [activePage, setActivePage] = useState('shop')
  const [favProducts, setFavProducts] = useState([])
  console.log(favProducts)

  useEffect(() => {
    async function fetchFavProducts() {
      try {
        const res = await fetch(`http://localhost:3005/api/product-favorites`)
        const data = await res.json()
        if (data.status === 'success') {
          setFavProducts(data.data)
        } else {
          console.error('Failed to fetch products:', data.message)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchFavProducts()
  }, [])

  // const toggleFavClick = (productId) => {
  //   console.log('toggleFavClick called for productId: ', productId)

  //   const deleteFavProduct = favProducts.filter((item) => item.id !== productId)
  //   setFavProducts(deleteFavProduct)
  //   localStorage.setItem('favProducts', JSON.stringify(deleteFavProduct))
  // }

  const [searchTerm, setSearchTerm] = useState('')
  console.log(searchTerm)
  const handleSearch = (term) => {
    console.log('Received search term:', term) // 確認收到的關鍵字
    setSearchTerm(term.toLowerCase())
  }
  const [order, setOrder] = useState('priceAsc')
  // 當 searchTerm 更新時，會重新計算過濾後的商品
  const filteredFavProducts = useMemo(
    () =>
      favProducts
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((productA, productB) =>
          order === 'priceAsc'
            ? productA.price - productB.price
            : productB.price - productA.price
        ),
    [favProducts, order, searchTerm]
  )

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
                    <SearchBtn onSearch={handleSearch} />
                  </div>
                  {/* filter */}
                  <div className="hidden sm:block sm:flex sm:flex-cols sm:items-center sm:space-x-4">
                    <p className="text-tertiary-black whitespace-nowrap">
                      排序
                    </p>
                    <Select
                      aria-label="排序"
                      placeholder="排序"
                      className="hidden sm:block sm:max-w-xs sm:w-48"
                      onChange={(e) => {
                        setOrder(e.target.value)
                        console.log('Selected value: ', e.target.value)
                      }}
                    >
                      <SelectItem key="priceAsc" value="priceAsc">
                        價格由小到大
                      </SelectItem>
                      <SelectItem key="priceDesc" value="priceDesc">
                        價格由大到小
                      </SelectItem>
                    </Select>
                  </div>
                </div>
                {/* search & select end */}

                {/* 卡片 */}
                <div className="bg-white rounded-lg gap-4 sm:gap-8 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {filteredFavProducts.map((product) => {
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
                          <div
                            style={{
                              position: 'absolute',
                              right: '1rem',
                              top: '1rem',
                            }}
                          >
                            <HeartButton
                              productId={product.id}
                              opacity="text-opacity-40"
                            />
                          </div>
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
                                  <span>{product.overall_review}</span>
                                </p>
                              </div>
                              <p className="text-base text-tertiary-gray-100">
                                {product.stores?.store_name}
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
                {/* products end */}

                {/* 按鈕群組 */}
                {/* <div className="flex justify-center space-x-10 py-10">
                  <MyButton color="primary" size="xl">
                    繼續查看
                  </MyButton>
                </div> */}
              </div>
              {/* order content end */}
            </div>
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
