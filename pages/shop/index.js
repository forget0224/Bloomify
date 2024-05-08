import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import {
  Breadcrumbs,
  BreadcrumbItem,
  Checkbox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Select,
  SelectItem,
} from '@nextui-org/react'
import Link from 'next/link.js'
import toast, { Toaster } from 'react-hot-toast'
import DefaultLayout from '@/components/layout/default-layout'
import Subtitle from '@/components/common/subtitle.js'
import { MyButton } from '@/components/btn/mybutton'
import SearchBtn from '@/components/shop/search'
import { BsFillGridFill, BsFillStarFill } from 'react-icons/bs'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { BiSolidLeaf } from 'react-icons/bi'
import { IoMdFlower, IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { FaToolbox } from 'react-icons/fa'
import ShopRearchRwd from '@/components/shop/shop-research-rwd'
import { useAuth } from '@/hooks/use-auth'
import Swal from 'sweetalert2'
import { useCart } from '@/context/shop-cart-context'
import { useProductFavorites } from '@/context/shop-fav-context'
import HeartButton from '@/components/shop/btn-heart'
import Head from 'next/head'

export default function Shop() {
  function highlightKeyword(text, keyword) {
    if (!keyword) return text // 如果沒有關鍵字，直接返回原文本
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'))
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    )
  }

  const { cartItems, setCartItems } = useCart()
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const searchParams = useSearchParams()
  const queryParentId = searchParams.get('parent_id')
  const router = useRouter()
  const [activePage, setActivePage] = useState('shop')
  // 列表用(原始資料)
  const [products, setProducts] = useState([])
  // console.log(products)
  // 第一層選項 產生資料用
  const [categories, setCategories] = useState([])
  // console.log(categories)
  // 顏色資料
  const [colors, setColors] = useState([])
  // console.log(colors)
  // 紀錄被選擇的顏色
  const [selectedColors, setSelectedColors] = useState([])
  // console.log(selectedColors)
  // 第一層選項用
  const [activeCategory, setActiveCategory] = useState(1)
  // console.log(activeCategory)
  // 用來控制第一層的選擇出現在url
  const [selectedCategoryId, setSelectedCategoryId] = useState([])
  // 切換第二層篩選
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([])
  // 關鍵字
  const [searchTerm, setSearchTerm] = useState('')
  // console.log(searchTerm)
  // 分頁用
  const [loadPage, setLoadPage] = useState(1) // Track the current page
  // 收藏
  const { addFavoritesStatusToProducts } = useProductFavorites()

  // didMount 後端資料從這裏來的
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `http://localhost:3005/api/products/filter?parent_id=${activeCategory}`
        )
        const data = await res.json()
        if (data.status === 'success') {
          // setProducts(data.data.products)
          const updatedProducts = addFavoritesStatusToProducts(
            data.data.products
          )
          setProducts(updatedProducts)
        } else {
          console.error('Failed to fetch products:', data.message)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    if (activeCategory !== null) {
      // Only fetch products if a category is selected
      fetchProducts()
    }
  }, [activeCategory, loadPage, addFavoritesStatusToProducts])
  // Product categories and icon setup
  const iconLookup = {
    1: <BsFillGridFill />,
    2: <IoMdFlower />,
    3: <BiSolidLeaf />,
    4: <FaToolbox />,
  }

  // 獲取種類、顏色資料
  useEffect(() => {
    fetchCategories()
    fetchColors()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/product-categories'
      )
      const data = await response.json()
      if (data.status === 'success') {
        setCategories(data.data.categories)
      } else {
        console.error('Failed to fetch colors:', data.message)
      }
    } catch (error) {
      console.error('Error fetching category data:', error)
    }
  }

  // 篩選:第一層分類
  const handleCategoryClick = (id) => {
    setSelectedSubcategoryIds([])
    setSelectedColors([])
    setSearchTerm('')
    setLoadPage(1)
    setActiveCategory(id)
    handleCategoryChange(id)
  }
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    // Use the Next.js router to update the URL without triggering a navigation
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, parent_id: categoryId },
      },
      undefined,
      { shallow: true }
    )
  }

  // 篩選:第二層分類
  const handleCheckboxChange = (subcategoryId, isChecked) => {
    // console.log(`Subcategory ID: ${subcategoryId}, Checked: ${isChecked}`)

    setSelectedSubcategoryIds((currentIds) => {
      // If the checkbox is checked, add the ID to the array
      if (isChecked) {
        // console.log('Adding subcategory ID:', subcategoryId)
        return [...currentIds, subcategoryId]
      } else {
        // If the checkbox is unchecked, remove the ID from the array
        // console.log('Removing subcategory ID:', subcategoryId)
        return currentIds.filter((id) => id !== subcategoryId)
      }
    })
  }

  // 關鍵字篩選
  const handleSearch = (term) => {
    console.log('Received search term:', term) // 確認收到的關鍵字
    setSearchTerm(term.toLowerCase())
  }

  useEffect(() => {
    if (!!queryParentId && queryParentId !== activeCategory)
      setActiveCategory(+queryParentId)
  }, [queryParentId])
  // console.log('check', categories, activeCategory, selectedSubcategoryIds)

  // 獲得顏色資料
  const fetchColors = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/share-colors')
      const data = await response.json()
      if (data.status === 'success') {
        setColors(data.data.colors)
      } else {
        console.error('Failed to fetch colors:', data.message)
      }
    } catch (error) {
      console.error('Error fetching color data:', error)
    }
  }

  const handleColorClick = (colorId, isChecked) => {
    console.log(`color ID: ${colorId}, Checked: ${isChecked}`)

    setSelectedColors((currentSelectedColors) => {
      if (isChecked) {
        // Add color_id to the selectedColors state if checked
        return [...currentSelectedColors, colorId]
      } else {
        // Remove color_id from the selectedColors state if not checked
        return currentSelectedColors.filter((id) => id !== colorId)
      }
    })
  }

  // 清除條件
  const resetSelection = () => {
    setActiveCategory(1) // If it's a single value, it should not be an array
    setSelectedSubcategoryIds([])
    setSelectedColors([])
    setOrder('')
  }

  // 分頁
  const limit = 6
  const handleLoadMore = () => {
    setLoadPage((prevLoadPage) => prevLoadPage + 1)
  }

  // Carousel State
  const [page, setPage] = useState(0)
  const banners = [
    {
      banner: '/assets/shop/banner/banner1.jpg',
      title: 'a banner about a flower shop',
    },
    {
      banner: '/assets/shop/banner/banner2.jpg',
      title: 'a banner about flowers',
    },
    {
      banner: '/assets/shop/banner/banner3.jpg',
      title: 'a banner about flowers',
    },
  ]
  const prevPage = () => {
    setPage((prevPage) =>
      prevPage - 1 < 0 ? banners.length - 1 : prevPage - 1
    )
  }
  const nextPage = () => {
    setPage((prevPage) =>
      prevPage + 1 > banners.length - 1 ? 0 : prevPage + 1
    )
  }
  useEffect(() => {
    const timer = setTimeout(nextPage, 3000)
    return () => clearInterval(timer)
  }, [page])

  const notify = () => toast.success('已成功加入購物車')
  const handleCartClick = (product) => {
    if (!isAuth) {
      // 用戶未登入，顯示提示信息
      Swal.fire({
        title: '未登入',
        text: '請先登入才能添加商品到購物車。',
        icon: 'info',
        iconColor: '#68A392',
        confirmButtonColor: '#68A392',
        customClass: {
          popup: 'rounded-xl',
          confirmButton: 'w-[100px]',
        },
      })
    } else {
      // 呼叫 toast 通知
      notify()
      // 將產品加入到購物車
      addToCart(product)
    }
  }

  const [order, setOrder] = useState('priceAsc')

  // 排序、篩選、關鍵字
  const filterProduct = useMemo(
    () =>
      products
        // 子分類
        .filter((product) =>
          selectedSubcategoryIds.length > 0
            ? selectedSubcategoryIds.includes(product.product_category_id)
            : true
        )
        // 顏色
        .filter((product) =>
          selectedColors.length > 0
            ? selectedColors.includes(product.share_color_id)
            : true
        )
        //關鍵字
        .filter((product) => product.name.includes(searchTerm))
        // 排序
        .sort((productA, productB) =>
          order === 'priceAsc'
            ? productA.price - productB.price
            : productB.price - productA.price
        ),
    [products, selectedSubcategoryIds, selectedColors, order, searchTerm]
  )
  // console.log(filterProduct)

  // 加入購物車
  const addToCart = (product) => {
    // 透過展開運算符，創建新的購物車物件
    // 由於狀態不可改變，要增加物件需創建新的購物車物件
    const updatedCartItems = {
      ...cartItems,
      [product.id]: { ...product, quantity: 1 },
    }
    setCartItems(updatedCartItems) // Update state
  }

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <Head>
            <title>線上商城</title>
          </Head>
          {/* 置中 & 背景色 */}
          <main className="flex flex-col justify-center items-center bg-white mt-[64px]">
            {/* 主要容器 */}
            <div className="container justify-center flex flex-col items-start columns-12 mb-20 px-5 md:px-0">
              {/* breadcrumb start */}
              <div className="py-6 w-full hidden sm:block">
                <Breadcrumbs>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem color="primary">線上商城</BreadcrumbItem>
                </Breadcrumbs>
              </div>
              {/* breadcrumb end */}
              {/* carousel start */}
              <div className="box max-w-[1520px] max-h-[220px] sm:max-h-[525px] relative overflow-hidden">
                <div className="carousel">
                  <Image
                    src={banners[page].banner}
                    alt={banners[page].title}
                    className="w-full h-full object-fit rounded-none sm:rounded-lg"
                  />
                </div>
                <div
                  className="prev-btn absolute top-1/2 left-0 transform -translate-y-1/2 z-10 py-4 px-0.5 bg-tertiary-gray-200 hover:bg-primary-300 active:bg-primary-300 focus:outline-none focus:ring focus:ring-tertiary-gray-200 ease-in duration-300 rounded-r-lg"
                  onClick={prevPage}
                  style={{ cursor: 'pointer' }}
                >
                  <IoIosArrowBack className="w-1 h-1 sm:w-3 h-3 md:w-5 h-5 text-primary" />
                </div>
                <div
                  className="next-btn absolute top-1/2 right-0 transform -translate-y-1/2 z-10 py-4 px-0.5 bg-tertiary-gray-200 hover:bg-primary-300 active:bg-primary-300 focus:outline-none focus:ring focus:ring-tertiary-gray-200 ease-in duration-300 rounded-l-lg"
                  onClick={nextPage}
                  style={{ cursor: 'pointer' }}
                >
                  <IoIosArrowForward className="w-1 h-1 sm:w-3 h-3 md:w-5 h-5 text-primary" />
                </div>
              </div>
              {/* carousel end */}
              {/* 第一層選項 start */}
              <div className="flex justify-center mt-4 sm:my-8 w-full whitespace-nowrap gap-2">
                {categories
                  .filter((category) => category.parent_id === 0)
                  .map((category) => {
                    const isActive = activeCategory === category.id
                    return (
                      <div
                        key={category.id}
                        className={`mx-4 ${
                          isActive ? 'text-secondary-100' : ''
                        }`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        <div
                          className={`icon flex flex-col justify-center items-center ${
                            isActive ? 'text-secondary-100' : 'text-primary'
                          }`}
                        >
                          <div className="text-5xl sm:text-[140px]">
                            {iconLookup[category.id.toString()]}
                          </div>
                          <div
                            className={`title text-center my-6 ${
                              isActive ? 'text-secondary-100' : 'text-primary'
                            }`}
                          >
                            {category.name}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              {/* 第一層選項 end */}
              {/* 第二層選項 start */}
              <div className="sm:hidden">
                {categories
                  .filter((category) => {
                    if (activeCategory === 1) {
                      return category.parent_id !== 0
                    }
                    // Otherwise, filter sub-categories based on the active top-level category
                    return category.parent_id === activeCategory
                  })
                  .map((category) => (
                    <Checkbox
                      key={category.id}
                      className="mr-2"
                      isSelected={selectedSubcategoryIds.includes(category.id)}
                      onValueChange={(isChecked) =>
                        handleCheckboxChange(category.id, isChecked)
                      }
                    >
                      <p className="text-tertiary-black">{category.name}</p>
                    </Checkbox>
                  ))}
              </div>
              {/* 第二層選項 end */}

              {/* 搜尋&排序 start */}
              <div className="w-full flex justify-between mb-6">
                <div className="hidden sm:block sm:w-3/12">
                  <SearchBtn onSearch={handleSearch} />
                </div>
                <div className="flex items-center space-x-4">
                  <p className="hidden sm:block sm:text-xl sm:text-tertiary-black sm:whitespace-nowrap">
                    排序
                  </p>
                  <Select
                    aria-label="排序"
                    placeholder="排序"
                    className="hidden sm:block sm:max-w-xs sm:w-48"
                    value={order}
                    onChange={(e) => {
                      setOrder(e.target.value)
                      console.log('Selected value: ', e.target.value)
                    }}
                  >
                    <SelectItem key="priceAsc" value="priceAsc">
                      價格由低到高
                    </SelectItem>
                    <SelectItem key="priceDesc" value="priceDesc">
                      價格由高到低
                    </SelectItem>
                  </Select>
                </div>
              </div>
              {/* 搜尋&排序 end */}

              {/* RWD start */}
              <div className="sm:hidden w-full my-4 flex justify-between">
                <p className="text-tertiary-black">
                  共 {''}
                  {filterProduct.length}
                  {''} 項結果
                </p>
                {/* 搜尋&排序 */}
                <div>
                  <ShopRearchRwd
                    colors={colors}
                    selectedColors={selectedColors}
                    handleColorClick={handleColorClick}
                    order={order}
                    setOrder={setOrder}
                    resetSelection={resetSelection}
                    handleSearch={handleSearch}
                  />
                </div>
              </div>
              {/* RWD end */}
              {/* main section start */}
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* sidebar start */}
                <div className="hidden sm:block" style={{ height: 'auto' }}>
                  <div
                    className="bg-white p-4 rounded-lg shadow-md space-y-8 max-w-[335px]"
                    style={{ position: 'sticky', top: '0px' }}
                  >
                    <Subtitle text="篩選" />
                    <p className=" text-tertiary-black">
                      共{''}
                      {filterProduct.length}
                      {''}項結果
                    </p>
                    <div className="space-y-4">
                      <p className="text-lg text-tertiary-black">子類</p>
                      <div className="space-y-2 grid grid-cols-2">
                        {categories
                          .filter((category) => {
                            if (activeCategory === 1) {
                              return category.parent_id !== 0
                            }
                            return category.parent_id === activeCategory
                          })
                          .map((category) => (
                            <Checkbox
                              key={category.id}
                              className="mr-2"
                              isSelected={selectedSubcategoryIds.includes(
                                category.id
                              )}
                              onValueChange={(isChecked) =>
                                handleCheckboxChange(category.id, isChecked)
                              }
                            >
                              <p className="text-tertiary-black">
                                {category.name}
                              </p>
                            </Checkbox>
                          ))}
                      </div>
                    </div>
                    <hr className="my-6 border-t border-gray-300" />
                    <div className="space-y-4">
                      <p className="text-lg text-tertiary-black">顏色</p>
                      <div className="space-y-2 grid grid-cols-2">
                        {colors.map((color) => (
                          <Checkbox
                            key={color.color_id}
                            radius="sm"
                            className="mr-2"
                            isSelected={selectedColors.includes(color.color_id)}
                            onValueChange={(isChecked) =>
                              handleColorClick(color.color_id, isChecked)
                            }
                          >
                            <div className="flex items-center">
                              <p className="mr-2">{color.name}</p>
                              <div
                                className="h-4 w-4 rounded-full"
                                style={{ background: color.code }}
                              ></div>
                            </div>
                          </Checkbox>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center pb-8">
                      <MyButton
                        color="primary"
                        size="xl"
                        isOutline
                        onClick={resetSelection}
                      >
                        清除條件
                      </MyButton>
                    </div>
                  </div>
                </div>
                {/* sidebar end */}
                {/* main starts */}
                <div className="sm:w-10/12 sm:flex-1">
                  {filterProduct.length > 0 ? (
                    <div className="bg-white rounded-lg gap-4 sm:gap-8 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full">
                      {filterProduct
                        .slice(0, limit * loadPage)
                        .map((product) => {
                          let imageUrl = `/assets/shop/products/default_fallback_image.jpg`
                          if (Array.isArray(product.images)) {
                            const nonThumbnailImage = product.images.find(
                              (image) => !image.is_thumbnail
                            )
                            if (nonThumbnailImage)
                              imageUrl = `/assets/shop/products/${product.directory}/${nonThumbnailImage.url}`
                          }

                          return (
                            <Fragment key={product.id}>
                              <div className="relative">
                                {auth.isAuth && (
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
                                )}

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
                                        {highlightKeyword(
                                          product.name,
                                          searchTerm
                                        )}
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
                                    <div
                                      className="text-base items-center bg-transparent focus:outline-none hover:rounded-full p-1.5 hover:bg-primary-200"
                                      onClick={() => handleCartClick(product)}
                                    >
                                      <PiShoppingCartSimpleFill className="text-primary-100 h-6 w-6" />
                                    </div>
                                    <Toaster />
                                  </CardFooter>
                                </Card>
                              </div>
                            </Fragment>
                          )
                        })}
                    </div>
                  ) : (
                    <p className="text-xl h-full flex justify-center items-center">
                      沒有商品
                    </p>
                  )}
                </div>
                {/* main end */}
              </div>
              <div className="flex justify-center my-8 w-full">
                <div className="flex flex-col items-center">
                  {!(filterProduct.length <= limit * loadPage) && (
                    <>
                      <h1 className="text-xl font-bold mb-4 sm:">繼續探索</h1>
                      <MyButton
                        color="primary"
                        size="xl"
                        onClick={handleLoadMore}
                        className="hover:bg-primary-100"
                      >
                        查看更多
                      </MyButton>
                    </>
                  )}
                </div>
              </div>
              {/* main section end */}
            </div>
          </main>
        </>
      }
    </DefaultLayout>
  )
}
