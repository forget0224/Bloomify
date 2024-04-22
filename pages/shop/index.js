import React, { useState, useEffect } from 'react'
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
  RadioGroup,
  Radio,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link.js'
import toast, { Toaster } from 'react-hot-toast'
// import ShopSlider from '../../components/shop/shop-slider.js'
import DefaultLayout from '@/components/layout/default-layout'
import Subtitle from '@/components/common/subtitle.js'
import { MyButton } from '@/components/btn/mybutton'
import SearchBtn from '@/components/shop/search'
import { BsFillGridFill, BsFillStarFill, BsHeart } from 'react-icons/bs'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { BiSolidLeaf } from 'react-icons/bi'
import { IoMdFlower, IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { FaToolbox } from 'react-icons/fa'
import { IoFilterCircleOutline } from 'react-icons/io5'
import { SlMagnifier } from 'react-icons/sl'
// 要使用chunk(分塊)函式用
import _ from 'lodash'
// import { useWindowSize } from 'react-use'

export default function Shop() {
  const searchParams = useSearchParams()
  const queryParentId = searchParams.get('parent_id')
  const router = useRouter()
  const [activePage, setActivePage] = useState('shop')
  const limit = 6
  const [loadPage, setLoadPage] = useState(1) // Track the current page
  console.log('load', loadPage)

  // 列表用(原始資料)
  const [products, setProducts] = useState([])
  // 第一層選項 產生資料用
  const [categories, setCategories] = useState([])
  // console.log(categories)
  // 第一層選項用
  const [activeCategory, setActiveCategory] = useState(1)
  // console.log(activeCategory)
  // 用來控制第一層的選擇出現在url
  const [selectedCategoryId, setSelectedCategoryId] = useState([])
  // 切換第二層篩選
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([])

  // didMount 後端資料從這裏來的
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `http://localhost:3005/api/products/filter?parent_id=${activeCategory}`
        )
        const data = await res.json()
        if (data.status === 'success') {
          setProducts(data.data.products)
          // if (loadPage > 1) {
          //   setProducts([...products, ...data.data.products])
          // } else {
          //   setProducts(data.data.products)
          // }
          // setProductTotal(data.data.count)
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
  }, [activeCategory, loadPage])

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
    // fetchData() // Existing call to fetch other data
  }, [])

  // function getUniqueCategoryList(products) {
  //   // Map products to their categories
  //   const dataList = products.map((product) => product.category)

  //   // Filter out duplicate categories based on their ID
  //   const uniqueCategoryList = dataList.filter((category, index, self) => {
  //     return index === self.findIndex((t) => t.id === category.id)
  //   })
  //   return uniqueCategoryList
  // }

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3005/api/products')
  //     const data = await response.json()

  //     if (data.status === 'success') {
  //       const uniqueCategories = getUniqueCategoryList(data.data.products)
  //       console.log('Unique Categories:', uniqueCategories)

  //       setProducts(data.data.products)
  //     } else {
  //       console.error('Failed to fetch colors:', data.message)
  //     }
  //   } catch (error) {
  //     console.error('Error fetching category data:', error)
  //   }
  // }

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
    // console.log('Category clicked:', id)
    setSelectedSubcategoryIds([]) // This line clears the subcategory selections
    setSelectedColors([])
    setLoadPage(1)
    setActiveCategory(id)
    handleCategoryChange(id) // Update the query string in the URL, which will then trigger the useEffect
    // setLoadPage(1)
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
    // Log the ID of the subcategory and its new checked status
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
    // setLoadPage(1)
  }

  useEffect(() => {
    if (!!queryParentId && queryParentId !== activeCategory)
      setActiveCategory(+queryParentId)
  }, [queryParentId])
  // console.log('check', categories, activeCategory, selectedSubcategoryIds)

  // 顏色資料
  const [colors, setColors] = useState([])
  // console.log(colors)
  // 紀錄被選擇的顏色
  const [selectedColors, setSelectedColors] = useState([])
  // console.log(selectedColors)

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
    // setLoadPage(1)
  }

  // 清除條件
  const resetSelection = () => {
    setActiveCategory(1) // If it's a single value, it should not be an array
    setSelectedSubcategoryIds([])
    setSelectedColors([])
  }

  // Carousel State
  const [page, setPage] = useState(0)
  const banners = [
    {
      banner: '/assets/shop/products/flowers/blue_False_Indigoit_0.jpg',
      title: 'a banner',
    },
    {
      banner: '/assets/shop/products/flowers/red_Amaryllis_3.jpg',
      title: 'a banner',
    },
    {
      banner: '/assets/shop/products/flowers/red_Snapdragon_1.jpg',
      title: 'a banner',
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

  // Function to handle clicking the "Load More" button
  const handleLoadMore = () => {
    setLoadPage((prevLoadPage) => prevLoadPage + 1)
  }
  const notify = () => toast.success('已成功加入購物車')
  // RWD Sorting and Filtering Modal State
  const {
    isOpen: isMagnifierOpen,
    onOpen: onMagnifierOpen,
    onOpenChange: onMagnifierOpenChange,
  } = useDisclosure()
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure()
  const [modalPlacement, setModalPlacement] = useState('bottom-center')
  const [order, setOrder] = useState('priceAsc')

  const getFilterProduct = () => {
    console.log('order', order)
    return (
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
        .sort((productA, productB) =>
          order === 'priceAsc'
            ? productA.price - productB.price
            : productB.price - productA.price
        )
    )
  }

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* 置中 & 背景色 */}
          <main className="flex flex-col justify-center items-center bg-white">
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
              <div className="flex justify-center my-8 w-full whitespace-nowrap gap-2">
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
              {/* select categories end */}

              {/* search & select start */}
              <div className="w-full py-4 flex justify-between">
                {/* searchbar */}
                <div className="hidden sm:block sm:w-3/12">
                  <SearchBtn />
                </div>
                {/* filter */}
                {/* RWD start*/}
                <p className="text-tertiary-black sm:hidden">
                  {/* 共 {productTotal} 項結果 */}
                </p>
                {/* RWD end*/}
                <div className="flex items-center space-x-4">
                  <p className="hidden sm:block sm:text-xl sm:text-tertiary-black sm:whitespace-nowrap">
                    排序
                  </p>
                  <Select
                    aria-label="排序"
                    placeholder="排序"
                    className="hidden sm:block sm:max-w-xs sm:w-48"
                    onChange={(e) => {
                      setOrder(e.target.value)
                      console.log('Selected value: ', e.target.value)
                    }} // handle the change
                  >
                    <SelectItem key="priceAsc" value="priceAsc">
                      價格由小到大
                    </SelectItem>
                    <SelectItem key="priceDesc" value="priceDesc">
                      價格由大到小
                    </SelectItem>
                  </Select>

                  {/* RWD start */}
                  <div className="flex flex-row space-x-3 sm:hidden">
                    <div className="flex gap-2 items-center text-xl hover:text-primary">
                      <SlMagnifier
                        onClick={onMagnifierOpen}
                        style={{ cursor: 'pointer' }}
                        className="text-xl"
                      />
                      <Modal
                        isOpen={isMagnifierOpen}
                        placement={modalPlacement}
                        onOpenChange={onMagnifierOpenChange}
                        className="mx-0 my-0 "
                        style={{
                          borderRadius: '4% 4% 0% 0%',
                        }}
                      >
                        <ModalContent>
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              關鍵字搜尋
                            </ModalHeader>
                            <ModalBody>
                              <div className="sm:hidden block">
                                <SearchBtn />
                              </div>
                              <div className="flex space-x-2">
                                <p className="text-primary">HOT</p>
                                <p className="text-tertiary-gray-1">
                                  熱門關鍵字
                                </p>
                              </div>
                              <div className="flex space-x-1.5">
                                <Link
                                  href="/shop/details"
                                  className="text-base px-2 py-0.5 bg-primary-300 hover:bg-primary-200"
                                  style={{ cursor: 'pointer' }}
                                >
                                  哈哈
                                </Link>
                              </div>
                              <p>玫瑰花</p>
                              <p>桔梗</p>
                            </ModalBody>
                          </>
                        </ModalContent>
                      </Modal>
                    </div>

                    <div className="flex gap-2 items-center text-xl hover:text-primary">
                      <IoFilterCircleOutline
                        onClick={onFilterOpen}
                        style={{ cursor: 'pointer' }}
                        className="text-2xl"
                      />
                      <Modal
                        isOpen={isFilterOpen}
                        placement={modalPlacement}
                        onOpenChange={onFilterOpenChange}
                        className="mx-0 my-0"
                        style={{ borderRadius: '4% 4% 0% 0%' }}
                      >
                        <ModalContent>
                          <ModalHeader className="flex flex-col gap-1">
                            排序與篩選
                          </ModalHeader>
                          <ModalBody
                            style={{
                              maxHeight: 'calc(100vh - 200px)',
                              overflowY: 'auto',
                            }}
                          >
                            <div>
                              <p className="text-primary text-center py-0.5 bg-primary-300">
                                排序
                              </p>
                              <div className="my-5">
                                {/* <RadioGroup>
                                    {selectList.map((item, index) => (
                                      <Radio key={index} value={item}>
                                        {item.label}
                                      </Radio>
                                    ))}
                                  </RadioGroup> */}
                              </div>
                            </div>
                            <div>
                              <p className="text-primary text-center py-0.5 bg-primary-300">
                                篩選
                              </p>
                              <div className="my-5">
                                <p className="text-tertiary-black my-2">子類</p>
                                <div className="space-y-2 grid grid-cols-2">
                                  {categories
                                    .filter((category) => {
                                      // If no top-level category is active, or 'all' is selected, show all sub-categories
                                      if (activeCategory === null) {
                                        return category.parent_id !== 0
                                      }
                                      // Otherwise, filter sub-categories based on the active top-level category
                                      return (
                                        category.parent_id === activeCategory
                                      )
                                    })
                                    .map((category) => (
                                      <Checkbox
                                        key={category.id}
                                        className="mr-2"
                                      >
                                        <p className="text-tertiary-black">
                                          {category.name}
                                        </p>
                                      </Checkbox>
                                    ))}
                                </div>
                              </div>
                              <hr />
                              <div className="my-5">
                                <p className="text-tertiary-black my-2">價格</p>
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
                              <hr />
                              <div className="my-5">
                                <p className="text-tertiary-black my-2">顏色</p>
                                <div className="space-y-0.5 grid grid-cols-2">
                                  {colors.map((color) => (
                                    <Checkbox
                                      key={color.id}
                                      defaultSelected
                                      radius="sm"
                                      className="mr-2"
                                      isSelected={selectedColors.includes(
                                        color.id
                                      )}
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
                            </div>
                          </ModalBody>
                          <ModalFooter className="flex gap-2">
                            <MyButton
                              color="primary"
                              size="xl"
                              isOutline
                              className="flex-1"
                              onClick={resetSelection}
                            >
                              清除條件
                            </MyButton>
                            <MyButton
                              color="primary"
                              size="xl"
                              isOutline
                              className="flex-1"
                            >
                              確認
                            </MyButton>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </div>
                  </div>
                  {/* RWD end */}
                </div>
              </div>
              {/* search & select end */}

              {/* main section start */}
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* filter start */}
                <div className="hidden sm:block">
                  <div className="bg-white p-4 rounded-lg shadow-md space-y-8 max-w-[335px]">
                    <Subtitle text="篩選" />
                    <p className=" text-tertiary-black">
                      共{''}
                      {getFilterProduct(products).length}
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
                            // Otherwise, filter sub-categories based on the active top-level category
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
                      <MyButton color="primary" size="xl" isOutline>
                        清除條件
                      </MyButton>
                    </div>
                  </div>
                </div>
                {/* filter end */}
                {/* products starts */}
                <div className="sm:w-10/12">
                  <div className="bg-white rounded-lg gap-4 sm:gap-8 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full">
                    {getFilterProduct(products)
                      .slice(0, limit * loadPage)
                      .map((product) => {
                        {
                          /* console.log(product.images) */
                        }
                        // Find the image where is_thumbnail is false
                        let imageUrl = `/assets/shop/products/default_fallback_image.jpg`

                        if (Array.isArray(product.images)) {
                          const nonThumbnailImage = product.images.find(
                            (image) => !image.is_thumbnail
                          )
                          // console.log(nonThumbnailImage)

                          // If nonThumbnailImage is not found, use a fallback image URL
                          if (nonThumbnailImage)
                            imageUrl = `/assets/shop/products/${product.directory}/${nonThumbnailImage.url}`

                          //console.log(nonThumbnailImage)
                        }

                        return (
                          <Card
                            shadow="sm"
                            key={product.id}
                            isPressable
                            onPress={() => console.log('item pressed')}
                          >
                            <CardBody className="relative overflow-visible p-0">
                              <Link
                                href={{
                                  pathname: '/shop/[pid]', // dynamic route
                                  query: { pid: product.id }, // setting pid to product ID
                                }}
                                className="block relative"
                              >
                                <BsHeart className="absolute right-3 top-3 sm:right-5 sm:top:5 sm:w-6 sm:h-6 z-10 text-secondary-100" />
                                {/* Use the non-thumbnail image URL for the image src */}
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
                              <div
                                className="text-base items-center bg-transparent focus:outline-none hover:rounded-full p-1.5 hover:bg-primary-200"
                                onClick={notify}
                              >
                                <PiShoppingCartSimpleFill className="text-primary-100 h-6 w-6" />
                              </div>
                              <Toaster />
                            </CardFooter>
                          </Card>
                        )
                      })}
                  </div>
                </div>
                {/* products end */}
              </div>
              <div className="flex justify-center my-8 w-full">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-bold mb-4 sm:">繼續探索</h1>
                  <MyButton
                    color="primary"
                    size="xl"
                    onClick={handleLoadMore}
                    // getFilterProduct(products).length, limit, loadPage
                    // disabled={
                    //   getFilterProduct(products).length < limit * loadPage
                    // }
                  >
                    查看更多
                  </MyButton>
                </div>
              </div>
              {/* main section end */}

              {/* <ShopSlider products={products} /> */}
            </div>
          </main>
        </>
      }
    </DefaultLayout>
  )
}
