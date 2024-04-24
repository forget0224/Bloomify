import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link.js'
import DefaultLayout from '@/components/layout/default-layout'
import ShareModal from '@/components/common/modal-share'
import {
  Breadcrumbs,
  BreadcrumbItem,
  Image,
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  Input,
  Pagination,
  useDisclosure,
} from '@nextui-org/react'
import Subtitle from '@/components/common/subtitle'
import { MyButton } from '@/components/btn/mybutton'
// import ShopSlider from '@/components/shop/shop-slider'
import { FaStar, FaShareAlt, FaRegHeart } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import moment from 'moment'
import { useLoader } from '@/hooks/use-loader'
import Loader from '@/components/common/loader'

export default function Detail() {
  const [activePage, setActivePage] = useState('shop')
  const router = useRouter()
  const [product, setProduct] = useState({
    id: '',
    name: '',
    product_category_id: 0,
    share_color_id: '',
    price: 0,
    stock: 0,
    purchase_count: 0,
    info: '',
    share_store_id: '',
    size: '',
    note: '',
    overall_review: 0,
    product_review_id: '',
    created_at: '',
    updated_at: '',
    images: [],
    mainImage: '',
    reviews: [],
  })
  const [stars, setStars] = useState([])
  const { close, open, isLoading } = useLoader()

  useEffect(() => {
    open()
    async function fetchData() {
      if (!router.isReady) return
      try {
        // 取得單筆商品資料
        const { pid } = router.query
        const productResponse = await fetch(
          `http://localhost:3005/api/products/${pid}`
        )
        const productData = await productResponse.json()
        if (productData.status === 'success' && productData.data.product) {
          setProduct(processProduct(productData.data.product))
        }
        // 取得星等資料
        const starsResponse = await fetch(
          'http://localhost:3005/api/share-star'
        )
        const starsData = await starsResponse.json()
        if (
          starsData.status === 'success' &&
          Array.isArray(starsData.data.stars)
        ) {
          setStars(starsData.data.stars)

          console.log('Reviews loaded:', product.reviews)
        }
        close(3)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchData()
  }, [])

  // images start
  function processProduct(product) {
    const folderMappings = [
      { category: '鮮花', directory: '/assets/shop/products/flowers/' },
      { category: '花盆栽', directory: '/assets/shop/products/flower-pots/' },
      { category: '葉材', directory: '/assets/shop/products/foliage/' },
      { category: '植盆栽', directory: '/assets/shop/products/plant-pots/' },
      { category: '器具', directory: '/assets/shop/products/tools/' },
      { category: '材料', directory: '/assets/shop/products/materials/' },
    ]

    const categoryMapping = folderMappings.find(
      (mapping) => mapping.category === product.category.name
    )
    const basePath = categoryMapping
      ? categoryMapping.directory
      : '/assets/shop/products/default_fallback_image.jpg'

    const mainImage =
      product.images?.find((img) => img.is_thumbnail)?.url ||
      product.images?.[0]?.url ||
      'default_fallback_image.jpg'

    return {
      ...product,
      basePath,
      mainImage: `${basePath}${mainImage}`,
    }
  }
  function handleThumbnailClick(imageUrl) {
    setProduct((prevState) => ({
      ...prevState,
      mainImage: `${prevState.basePath}${imageUrl}`, // Use stored basePath
    }))
  }
  // images end

  //table樣式
  const tableStyles = {
    th: 'text-base', // 表頭
    td: 'text-base', // 表格
    wrapper: 'text-base', // 整個表格
  }

  // toaster start
  const notify = () => toast.success('已成功加入購物車')
  // toaster end

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-secondary-100' : 'text-secondary-200'}
      />
    ))
  }

  // 分享 Modal 變數
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onOpenChange: onShareOpenChange,
  } = useDisclosure()

  // localStorage
  const [cartItems, setCartItems] = useState({})
  // Save cartItems to localStorage
  useEffect(() => {
    localStorage.setItem('productToCart', JSON.stringify(cartItems))
  }, [cartItems])

  // Load cartItems from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('productToCart'))
    if (storedProducts) {
      setCartItems(storedProducts)
    }
  }, [])

  const addToCart = (product) => {
    const newProduct = {
      ...product,
      quantity: quantity, // use the current quantity state
    } // check if the product is already in the cart
    const productAlreadyInCart = cartItems[product.id]

    // create a new object for the updated cart
    const updatedCartItems = {
      ...cartItems,
      [product.id]: productAlreadyInCart
        ? {
            ...productAlreadyInCart,
            quantity: productAlreadyInCart.quantity + quantity,
          }
        : newProduct,
    }
    setCartItems(updatedCartItems)
  }

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('productToCart', JSON.stringify(cartItems))
  }, [cartItems])

  // 計算器
  const [quantity, setQuantity] = useState(1)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value)
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity)
    } else if (event.target.value === '') {
      setQuantity(1)
    }
  }

  const display = (
    <>
      <DefaultLayout
        activePage={activePage}
        className="flex flex-col justify-center items-center"
      >
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-start columns-12 static px-5 md:px-0">
            {/* 麵包屑 */}
            <div className="bg-white flex flex-col flex-wrap gap-4 py-6 w-full">
              <div>
                <Breadcrumbs>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>線上商城</BreadcrumbItem>
                  <BreadcrumbItem color="primary">商品細節</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </div>
            <div className="w-full sm:flex sm:justify-center">
              {/* imgs start */}
              <div className="hidden sm:w-full sm:block sm:flex">
                <div className="space-y-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center w-12 h-12 sm:w-15 sm:h-15 md: w-24 h-24"
                      style={{
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        isZoomed
                        src={`${product.basePath}${image.url}`}
                        alt={`Thumbnail ${product.name}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          width: 'auto',
                          height: 'auto',
                        }}
                        onClick={() => handleThumbnailClick(image.url)}
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-2 mr-8">
                  {product.mainImage && (
                    <Image
                      src={product.mainImage}
                      alt="Main Image"
                      style={{
                        maxWidth: 'auto',
                        height: 'auto',
                        width: '100%',
                      }}
                    />
                  )}
                </div>
              </div>
              {/* imgs  end*/}
              {/* RWD imgs start */}
              <div className="sm:hidden">
                <div>
                  {product.mainImage && (
                    <Image
                      width={500}
                      height={500}
                      src={product.mainImage} // Already includes the basePath
                      alt="Main Image"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  )}
                </div>
                <div className="flex gap-2 my-2">
                  {product.images.map((image, index) => (
                    <Image
                      key={index}
                      src={`${product.basePath}${image.url}`}
                      alt={`Thumbnail ${product.name}`}
                      style={{
                        width: '70px',
                        height: '70px',
                        cursor: 'pointer',
                        objectFit: 'cover',
                        display: 'block',
                        margin: 'auto',
                      }}
                      onClick={() => handleThumbnailClick(image.url)}
                    />
                  ))}
                </div>
              </div>
              {/* RWD imgs  end*/}
              {/* info start*/}
              <div className="w-full space-y-4 sm:space-y-8">
                <div className="space-y-2">
                  <p className="text-4xl text-tertiary-black font-bold">
                    {product.name}
                  </p>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-xl">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < product.overall_review
                              ? 'text-secondary-100'
                              : 'text-secondary-200'
                          }
                        />
                      ))}
                      <div>
                        <p className="text-tertiary-black ml-2">
                          {product.overall_review}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <div className="flex flex-row items-center text-secondary-100 hover:text-[#FFAC9A] h-6 w-6 justify-center">
                        {/* <FaHeart /> */}
                        <FaRegHeart className="w-5 h-5" />
                      </div>
                      {/* <BsHeart className="text-secondary-100" /> */}
                      <button
                        onClick={onShareOpen}
                        className="flex flex-row items-center h-6 w-6 justify-center text-secondary-100 hover:text-[#FFAC9A]"
                      >
                        <FaShareAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    {product.tags &&
                      product.tags.map((tag) => (
                        <span
                          key={product.id}
                          className="bg-primary text-secondary-300 text-base me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                          {tag.name}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex justify-start text-xl">
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr className="">
                        <td className="text-nowrap">商品定價</td>
                        <td>NT${product.price}</td>
                      </tr>
                      <tr className="h-5"></tr>
                      <tr>
                        <td className="text-nowrap">商品庫存</td>
                        <td>{product.stock}支</td>
                      </tr>
                      <tr className="h-5"></tr>
                      <tr>
                        <td className="text-nowrap pr-2">累積購買數</td>
                        <td>{product.purchase_count}支</td>
                      </tr>
                      <tr className="h-5"></tr>
                      <tr>
                        <td className="text-nowrap">購買數量</td>
                        <td>
                          <div className="flex gap-4 items-center">
                            <Button
                              isIconOnly
                              variant="faded"
                              className="border-transparent"
                              onClick={handleDecrement}
                            >
                              -
                            </Button>
                            <Input
                              type="text"
                              value={quantity}
                              onChange={handleChange}
                              min="1"
                              className="w-full rounded-md p-1 text-center"
                              style={{ textAlign: 'center' }}
                            />
                            <Button
                              isIconOnly
                              variant="faded"
                              className="border-transparent"
                              onClick={handleIncrement}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-2 flex-col sm:flex-row sm:gap-4">
                  <div className="sm:flex-1">
                    <MyButton
                      color="primary"
                      size="xl"
                      // onClick={notify}
                      isOutline
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      加入購物車
                    </MyButton>
                  </div>
                  <Toaster />
                  <Link href="/cart" className="sm:flex-1">
                    <MyButton
                      color="primary"
                      size="xl"
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      立即購買
                    </MyButton>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col my-16">
              <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList:
                    'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                  cursor: 'w-full bg-[#68A392]',
                  tab: 'max-w-fit px-0 h-12',
                  tabContent: 'group-data-[selected=true]:text-[#68A392]',
                }}
              >
                <Tab
                  key="information"
                  title={
                    <div className="flex items-center text-base space-x-2">
                      商品訊息
                    </div>
                  }
                >
                  <Card className="p-8 space-y-6">
                    <p className="flex flex-col gap-3 text-xl">
                      {product.name}
                    </p>
                    <p className="flex flex-col gap-3">{product.info}</p>
                  </Card>
                </Tab>
                <Tab
                  key="store"
                  title={
                    <div className="flex items-center text-base space-x-2">
                      販售店家
                    </div>
                  }
                >
                  {product.stores && (
                    <Card
                      className="p-8 space-y-6"
                      key={product.stores.store_id}
                    >
                      <p className="flex flex-col gap-3 text-xl">
                        {product.stores.store_name}
                      </p>
                      <p className="flex flex-col gap-3">
                        {product.stores.store_info}
                      </p>
                    </Card>
                  )}
                </Tab>
                <Tab
                  key="size"
                  title={
                    <div className="flex items-center text-base space-x-2">
                      商品尺寸
                    </div>
                  }
                >
                  <Card className="p-8 space-y-6">
                    {/* <p className="flex flex-col gap-3 text-xl">商品尺寸</p> */}
                    <p className="flex flex-col gap-3">{product.size}</p>
                  </Card>
                </Tab>
                <Tab
                  key="note"
                  title={
                    <div className="flex items-center text-base space-x-2">
                      注意事項
                    </div>
                  }
                >
                  <Card className="p-8 space-y-6">
                    <p className="flex flex-col gap-3">{product.note}</p>
                  </Card>
                </Tab>
              </Tabs>
            </div>

            {/* 商品評價 */}
            <div className="space-y-2 container">
              <Subtitle text="商品評價" />
              <div className="flex flex-row gap-2">
                <span className="text-2xl">{product.overall_review}</span>
                <span className="text-2xl">/</span>
                <span className="text-2xl">5</span>
                <div className="flex flex-row items-center text-secondary-100">
                  {renderStars(product.overall_review)}
                </div>
              </div>
              <div className="flex w-full flex-col bg-transparent">
                <Tabs
                  aria-label="Dynamic tabs"
                  items={stars}
                  classNames={{
                    tabList: 'bg-transparent',
                    tabContent: 'group-data-[selected=true]:text-[#68A392]',
                  }}
                >
                  {(star) => (
                    <Tab
                      key={star.id}
                      title={
                        <div className="flex items-center text-base space-x-2">
                          {star.name}
                        </div>
                      }
                    >
                      <Card>
                        {Array.isArray(product.reviews) &&
                        product.reviews.length > 0 ? (
                          product.reviews
                            .filter((review) =>
                              star.id === 1
                                ? true
                                : review.share_star_id === star.id
                            )
                            .map((review, index) => (
                              <CardBody key={index} className="space-y-2 p-6">
                                <div className="flex space-x-2 items-center">
                                  <p className="text-xl">
                                    {review.member.name}
                                  </p>
                                  <p className="text-tertiary-gray-100">
                                    {moment(review.created_at).format(
                                      'YYYY-MM-DD HH:MM'
                                    )}
                                  </p>
                                </div>
                                <div className="flex flex-row items-center text-secondary-100">
                                  {renderStars(review.star.numbers)}
                                </div>
                                <div>{review.comment}</div>
                              </CardBody>
                            ))
                        ) : (
                          <CardBody>
                            <div>尚未有評價</div>
                          </CardBody>
                        )}
                      </Card>
                      <div className="mt-6">
                        <Pagination
                          color="secondary-100"
                          initialPage={3}
                          total={10}
                          className="flex justify-center"
                        />
                      </div>
                    </Tab>
                  )}
                </Tabs>
              </div>
            </div>
            <hr className="my-16" />
            {/* <ShopSlider /> */}
          </div>
        </main>
        {/* 分享 Modal */}
        <>
          <ShareModal
            // onOpen={onShareOpen}
            isShareOpen={isShareOpen}
            onShareOpenChange={onShareOpenChange}
          />
        </>
      </DefaultLayout>
    </>
  )

  return <>{isLoading ? <Loader /> : display}</>
}
