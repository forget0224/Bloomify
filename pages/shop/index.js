import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
import ShopSlider from '../../components/shop/shop-slider.js'
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
// import { useWindowSize } from 'react-use'

export default function Shop() {
  const router = useRouter()
  const [activePage, setActivePage] = useState('shop')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [colors, setColors] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([])

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

  // Product categories and icon setup
  const iconLookup = {
    1: <BsFillGridFill />,
    2: <IoMdFlower />,
    3: <BiSolidLeaf />,
    4: <FaToolbox />,
  }

  // 獲取全部、顏色資料
  useEffect(() => {
    fetchCategories()
    fetchColors()
    fetchData() // Existing call to fetch other data
  }, [])

  function getUniqueCategoryList(products) {
    // Map products to their categories
    const dataList = products.map((product) => product.category)

    // Filter out duplicate categories based on their ID
    const uniqueCategoryList = dataList.filter((category, index, self) => {
      return index === self.findIndex((t) => t.id === category.id)
    })
    return uniqueCategoryList
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/products')
      const data = await response.json()

      if (data.status === 'success') {
        const uniqueCategories = getUniqueCategoryList(data.data.products)
        console.log('Unique Categories:', uniqueCategories)

        setProducts(data.data.products)
      } else {
        console.error('Failed to fetch colors:', data.message)
      }
    } catch (error) {
      console.error('Error fetching category data:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/product-categories'
      )
      const data = await response.json()
      if (data.status === 'success') {
        setCategories(data.data.categories) // Assuming your API returns an array of colors in data.data.colors
      } else {
        console.error('Failed to fetch colors:', data.message)
      }
    } catch (error) {
      console.error('Error fetching category data:', error)
    }
  }

  const fetchColors = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/share-colors')
      const data = await response.json()
      if (data.status === 'success') {
        setColors(data.data.colors) // Assuming your API returns an array of colors in data.data.colors
      } else {
        console.error('Failed to fetch colors:', data.message)
      }
    } catch (error) {
      console.error('Error fetching color data:', error)
    }
  }

  const notify = () => toast.success('已成功加入購物車')

  // 篩選:種類
  const handleCategoryClick = (id) => {
    console.log('Category clicked:', id)
    setActiveCategory(id)
    // Update the query string in the URL, which will then trigger the useEffect
    handleCategoryChange(id)
  }
  // fetch資料
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Construct the query string based on the active category
        const queryStr = new URLSearchParams({
          parent_id: activeCategory,
        }).toString()
        const res = await fetch(
          `http://localhost:3005/api/products/filter?${queryStr}`
        )
        const data = await res.json()
        if (data.status === 'success') {
          setProducts(data.data.products)
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
  }, [activeCategory])

  // 商品 query string更新

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

  // 篩選第二層分類
  const handleCheckboxChange = (subcategoryId, isChecked) => {
    // Log the ID of the subcategory and its new checked status
    console.log(`Subcategory ID: ${subcategoryId}, Checked: ${isChecked}`)

    setSelectedSubcategoryIds((currentIds) => {
      // If the checkbox is checked, add the ID to the array
      if (isChecked) {
        console.log('Adding subcategory ID:', subcategoryId)
        return [...currentIds, subcategoryId]
      } else {
        // If the checkbox is unchecked, remove the ID from the array
        console.log('Removing subcategory ID:', subcategoryId)
        return currentIds.filter((id) => id !== subcategoryId)
      }
    })
  }

  // 搜尋關鍵字
  const baseSearchPath = 'http://localhost:3005/api/products/filter'
  const handleSearch = (searchTerm) => {
    fetch(`${baseSearchPath}?keyword=${encodeURIComponent(searchTerm)}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data.products)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }

  // 排序
  const sortOptions = {
    由新到舊: 'newest',
    由舊到新: 'oldest',
    價格由高到低: 'expensive',
    價格由低到高: 'cheapest',
  }
  const handleSortChange = (selectedLabel) => {
    const selectedSortKey = sortOptions[selectedLabel]
    if (selectedSortKey) {
      // Fetch products based on the selected sort key
      fetchSortedProducts(`sort=${selectedSortKey}`)
    } else {
      console.error('Selected sort key is undefined.')
    }
  }
  // Function to fetch sorted products
  const fetchSortedProducts = (sortQuery) => {
    const url = `http://localhost:3005/api/products/filter?${sortQuery}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          // Update the state with the sorted products
          setProducts(data.data.products)
        }
      })
      .catch((error) => {
        console.error('Error fetching sorted products:', error)
      })
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
                          <p
                            className={`title text-center my-6 ${
                              isActive ? 'text-secondary-100' : 'text-primary'
                            }`}
                          >
                            {category.name}
                          </p>
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
                  <SearchBtn onSearch={handleSearch} />
                </div>
                {/* filter */}
                {/* RWD start*/}
                <p className="text-tertiary-black sm:hidden">
                  共 {products.length} 項結果
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
                      console.log('Selected value: ', e.target.value) // For debugging
                      handleSortChange(e.target.value)
                    }} // handle the change
                  >
                    {Object.keys(sortOptions).map((label) => (
                      <SelectItem key={label} value={sortOptions[label]}>
                        {label}
                      </SelectItem>
                    ))}
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
                                <SearchBtn onSearch={handleSearch} />
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
                          <>
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
                                  <p className="text-tertiary-black my-2">
                                    子類
                                  </p>
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
                                  <p className="text-tertiary-black my-2">
                                    價格
                                  </p>
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
                                  <p className="text-tertiary-black my-2">
                                    顏色
                                  </p>
                                  <div className="space-y-0.5 grid grid-cols-2">
                                    {colors &&
                                      colors.map((color) => (
                                        <Checkbox
                                          key={color.id}
                                          defaultSelected
                                          radius="sm"
                                          className="mr-2"
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
                          </>
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
                      共 {products.length} 項結果
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
                        {colors &&
                          colors.map((color) => (
                            <Checkbox
                              key={color.id}
                              defaultSelected
                              radius="sm"
                              className="mr-2"
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
                    {products
                      .filter(
                        (product) =>
                          selectedSubcategoryIds.length === 0 ||
                          selectedSubcategoryIds.includes(
                            product.product_category_id
                          )
                      )
                      .map((product) => {
                        // Find the image where is_thumbnail is false
                        const nonThumbnailImage = product.images.find(
                          (image) => !image.is_thumbnail
                        )

                        // If nonThumbnailImage is not found, use a fallback image URL
                        const imageUrl = nonThumbnailImage
                          ? nonThumbnailImage.url
                          : 'default_fallback_image.jpg'

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
                                  src={`/assets/shop/products/${product.directory}/${imageUrl}`}
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
                    // onClick={handleLoadMore}
                    // disabled={!hasMore}
                    // className={`${
                    //   !hasMore ? 'opacity-50 pointer-events-none' : ''
                    // }`}
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
