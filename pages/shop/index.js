import React, { useState, useEffect } from 'react'
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
import SearchBtn from '@/components/course/search'
import { BsFillGridFill, BsFillStarFill, BsHeart } from 'react-icons/bs'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { BiSolidLeaf } from 'react-icons/bi'
import { IoMdFlower, IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { FaToolbox } from 'react-icons/fa'
import { IoFilterCircleOutline } from 'react-icons/io5'
import { SlMagnifier } from 'react-icons/sl'
// import { useWindowSize } from 'react-use'

export default function Shop() {
  const [activePage, setActivePage] = useState('shop')
  // backend start
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [colors, setColors] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        // 取得商品資料
        const productsResponse = await fetch(
          'http://localhost:3005/api/products'
        )
        const productsData = await productsResponse.json()
        if (
          productsData.status === 'success' &&
          Array.isArray(productsData.data.products)
        ) {
          // 處理全部商品數據
          setProducts(processProducts(productsData.data.products))
        }

        // 取得種類資料
        const categoriesResponse = await fetch(
          'http://localhost:3005/api/product-categories'
        )
        const categoriesData = await categoriesResponse.json()
        if (
          categoriesData.status === 'success' &&
          Array.isArray(categoriesData.data.categories)
        ) {
          setCategories(categoriesData.data.categories)
        }

        // 取得顏色資料
        const colorsResponse = await fetch(
          'http://localhost:3005/api/share-colors'
        )
        const colorsData = await colorsResponse.json()
        if (
          colorsData.status === 'success' &&
          Array.isArray(colorsData.data.colors)
        ) {
          // 設置顏色資料
          setColors(colorsData.data.colors)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // 找資料夾再找照片
  // 定義資料夾映射表
  // 映射表示在兩個不同的資料之間建立對應關係，通常是以一個資料集合中的值對應到另一個資料集合中的值。
  // 這裡的資料夾映射將產品類別對應到相應的資料夾路徑，以便在前端呈現時可以根據產品類別來動態地載入相應的圖片資源。
  const folderMappings = [
    {
      category: '全部',
      directory: [
        'flowers',
        'flower-pots',
        'foliage',
        'plant-pots',
        'materials',
        'tools',
      ],
    },
    { category: '鮮花', directory: 'flowers' },
    { category: '花盆栽', directory: 'flower-pots' },
    { category: '葉材', directory: 'foliage' },
    { category: '植盆栽', directory: 'plant-pots' },
    { category: '器具', directory: 'tools' },
    { category: '材料', directory: 'materials' },
  ]

  // 處理商品函數
  function processProducts(productsArray) {
    return productsArray.map((product) => {
      // 取得主要圖片
      const mainImage =
        (product.images &&
          product.images.find((image) => image.is_thumbnail)) ||
        (product.images && product.images[0])
      // console.log(mainImage)
      // 初始化資料夾為全部類別的資料夾列表
      let folder =
        folderMappings.find((mapping) => mapping.category === '全部')
          ?.directory || []
      console.log(folder)
      // 根據產品類別查找對應的資料夾
      // 這裡是對應Product_Category的資料表，因此後端有作關聯表格
      const mapping = folderMappings.find(
        (mapping) => mapping.category === product.category.name
      )
      // 如果找到對應的資料夾映射，則將資料夾設為映射的目錄，否則保持不變
      if (mapping) {
        folder = Array.isArray(mapping.directory)
          ? mapping.directory
          : [mapping.directory]
      }
      // 返回處理後的產品資料，包括資料夾和主要圖片
      return {
        ...product,
        folder: folder,
        mainImage: mainImage
          ? mainImage.url
          : '/assets/shop/products/flowers/pink_Gladiola_0.jpg', // 若無取得主圖，則設預設圖片
      }
    })
  }
  // backend end

  // carousel start
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
  // carousel end
  // select first-class categories start
  const icons = [
    {
      name: '全部',
      icon: <BsFillGridFill />,
    },
    {
      name: '鮮花類',
      icon: <IoMdFlower />,
    },
    {
      name: '植栽類',
      icon: <BiSolidLeaf />,
    },
    {
      name: '資材類',
      icon: <FaToolbox />,
    },
  ]
  // select list start
  const selectList = [
    { value: 'hot', label: '最熱門' },
    { value: 'new', label: '最新' },
    { value: 'highToLow', label: '價格由高到低' },
    { value: 'lowToHigh', label: '價格由低到高' },
  ]
  // select list end
  // toaster start
  const notify = () => toast.success('已成功加入購物車')
  // toaster end
  // RWD search & filter modal start
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
  const [modalPlacement, setModalPlacement] = React.useState('bottom-center')
  // RWD search & filter modal end

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
              {/* select categories start */}
              <div className="flex justify-center my-8 w-full whitespace-nowrap gap-2">
                {categories
                  .filter((category) => category.parent_id === 0)
                  .map((category, index) => {
                    // 找到與分類名稱相符的圖示
                    const categoryIcon = icons.find(
                      (icon) => icon.name === category.name
                    )

                    // 如果找到相符的圖示，則顯示該圖示；否則顯示一個默認的圖示
                    const iconToShow = categoryIcon ? (
                      categoryIcon.icon
                    ) : (
                      <BsFillGridFill />
                    )

                    return (
                      <div
                        key={category.id}
                        onClick={() => setSelectedCategory(index)}
                        className={`mx-4 ${
                          index === selectedCategory
                            ? 'border-b-4 border-secondary-100'
                            : ''
                        } sm:mr-4 sm:ml-4 md:mr-6 md:ml-6 lg:mr-12 lg:ml-12`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div
                          className={`icon flex flex-col justify-center items-center text-primary ${
                            index === selectedCategory
                              ? 'text-secondary-100'
                              : ''
                          }`}
                        >
                          <div className="text-5xl sm:text-[140px]">
                            {iconToShow}
                          </div>

                          <p
                            className={`title text-center my-6 ${
                              index === selectedCategory ? 'text-danger' : ''
                            }`}
                          >
                            {category.name}
                          </p>
                        </div>

                        <style jsx>{`
                          .mx-4.icon:hover {
                            border-bottom: 4px solid #68a392;
                          }
                          .icon:hover {
                            color: #ffc1b4;
                          }
                        `}</style>
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
                <p className="text-tertiary-black sm:hidden">共 100 項結果</p>
                {/* RWD end*/}
                <div className="flex items-center space-x-4">
                  <p className="hidden sm:block sm:text-xl sm:text-tertiary-black sm:whitespace-nowrap">
                    排序
                  </p>
                  <Select
                    aria-label="排序"
                    placeholder="排序"
                    defaultSelectedKeys={['']}
                    className="hidden sm:block sm:max-w-xs sm:w-48"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {selectList.map((item, index) => (
                      <SelectItem key={item.label} value={item.label}>
                        {item.label}
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
                                  <RadioGroup>
                                    {selectList.map((item, index) => (
                                      <Radio
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </Radio>
                                    ))}
                                  </RadioGroup>
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
                                  <div className="space-y-0.5 grid grid-cols-2">
                                    {categories
                                      .filter(
                                        (category) => category.parent_id !== 0
                                      )
                                      .map((category) => (
                                        <Checkbox
                                          key={category.id}
                                          defaultSelected
                                          radius="sm"
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
                                    {colors.map((color) => (
                                      <Checkbox
                                        key={color.id}
                                        defaultSelected
                                        radius="sm"
                                        className="mr-2"
                                      >
                                        <div className="flex items-center">
                                          <p className=" mr-2">{color.name}</p>
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
                {/* search & select end */}
              </div>
              {/* search & select end */}

              {/* main section start */}
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* filter start */}
                <div className="hidden sm:block">
                  <div className="bg-white p-4 rounded-lg shadow-md space-y-8 max-w-[335px]">
                    <Subtitle text="篩選" />
                    <p className=" text-tertiary-black">共 100 項結果</p>

                    <div className="space-y-4">
                      <p className="text-lg text-tertiary-black">子類</p>
                      <div className="space-y-2 grid grid-cols-2">
                        {categories
                          .filter((category) => category.parent_id !== 0)
                          .map((category) => (
                            <Checkbox
                              key={category.id}
                              defaultSelected
                              radius="sm"
                              className="mr-2"
                            >
                              <p className=" text-tertiary-black">
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
                            key={color.id}
                            defaultSelected
                            radius="sm"
                            className="mr-2"
                          >
                            <div className="flex items-center">
                              <p className=" mr-2">{color.name}</p>
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
                    {products.map((product, index) => (
                      <Card
                        shadow="sm"
                        key={product.id}
                        isPressable
                        onPress={() => console.log('item pressed')}
                      >
                        <CardBody className="relative overflow-visible p-0">
                          <Link
                            href={{
                              pathname: '/shop/[pid]', // 動態路由
                              query: { pid: product.id }, // 將 pid 設置為商品 ID
                            }}
                            key={index}
                            className="block relative"
                          >
                            <BsHeart className="absolute right-3 top-3 sm:right-5 sm:top:5 sm:w-6 sm:h-6 z-10 text-secondary-100" />
                            {/* 根據產品的資料夾路徑和主圖檔名，組合出完整的圖片路徑 */}
                            <Image
                              isZoomed
                              shadow="none"
                              radius="none"
                              width="100%"
                              alt={product.name}
                              className="w-full object-cover h-[250px] z-0"
                              src={
                                Array.isArray(product.folder) // 檢查資料夾是否為陣列型態
                                  ? product.folder // 如果是陣列，表示有多個資料夾路徑
                                      .map((folder) => {
                                        return `/assets/shop/products/${product.folder}/${product.mainImage}` // 對每個資料夾路徑，組合圖片路徑
                                      })
                                      .join(',') // 將多個圖片路徑組合成字串，用逗號分隔
                                  : `/assets/shop/products/${product.folder}/${product.mainImage}` // 如果只有單個資料夾路徑，直接組合圖片路徑
                              }
                            />
                          </Link>
                        </CardBody>
                        <CardHeader className="block text-left">
                          <div className="flex justify-between">
                            <p className="text-xl truncate">{product.name}</p>
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
                          <p className="text-xl truncate">NT${product.price}</p>
                          <div
                            className="text-base items-center bg-transparent focus:outline-none hover:rounded-full p-1.5 hover:bg-primary-200"
                            onClick={notify}
                          >
                            <PiShoppingCartSimpleFill className="text-primary-100 h-6 w-6" />
                          </div>
                          <Toaster />
                        </CardFooter>
                      </Card>
                    ))}
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

              <ShopSlider />
            </div>
          </main>
        </>
      }
    </DefaultLayout>
  )
}
