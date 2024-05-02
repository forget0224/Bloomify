import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import { MdEdit } from 'react-icons/md'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { MyButton } from '@/components/btn/mybutton'
import { useLoader } from '@/hooks/use-loader'
import Link from 'next/link'
import Loader from '@/components/common/loader'
import { ColorProvider } from '@/hooks/use-color'
import { useFlowerCart } from '@/hooks/use-flowerCart'
export default function Detail() {
  const [activePage, setActivePage] = useState('custom')
  const [isHeart, setIsHeart] = useState(true)
  const { close, open, isLoading } = useLoader()
  const handleHeartClick = () => {
    setIsHeart(!isHeart)
  }
  // 1. 由router中可以獲得動態路由的pid
  // router.query(物件)中包含pid屬性
  // router.isReady(布林值)，true代表本頁面已完成水化合作用
  const router = useRouter()

  const [product, setProduct] = useState({
    template_id: '',
    src: '',
    template_name: '',
    store_name: '',
    store_id: 0,
    store_address: '',
    template_occ: '',
    total_price: 0,
    discount: 0,
    products: [
      {
        product_id: 0,
        category_name: '',
        color: '',
        price: 0,
        positions: [{ top: 0, left: 0, zIndex: 0, rotate: 0 }],
      },
    ],
  })

  const getProductById = async (pid) => {
    const url = `http://localhost:3005/api/custom/${pid}` // 確保此 URL 正確並能夠返回預期的數據結構

    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const { status, data } = await res.json() // 使用解構賦值確保數據結構的對應

      if (status === 'success' && data) {
        // 進一步檢查 data 是否具有預期的結構
        setProduct({
          id: data.template_id,
          image_url: data.image_url,
          template_name: data.template_name,
          store_name: data.store_name,
          store_id: data.store_id,
          store_address: data.store_address,
          occ: data.template_occ,
          total_price: data.total_price, // 計算總價
          products: data.products, // 直接設定產品列表
        })
      }
      close(3)
    } catch (e) {
      console.error('Error fetching product details:', e)
    }
  }

  // 2. 在useEffet中監聽isReady值為true時，才能得到網址上的pid和伺服器獲取資料  不這樣監聽會得不到router.query
  useEffect(() => {
    if (router.isReady) {
      //確保能得到pid
      const { tid } = router.query
      console.log(tid)
      // 有pid後，向伺服器要求資料
      getProductById(tid)
    }
  }, [router.isReady])

  console.log(product)
  const { dispatch } = useFlowerCart()
  const handleCustom = () => {
    router.push('/custom/custom')
  }
  const handleAddToCart = () => {
    dispatch({
      type: 'SET_BOUQUET_INFO',
      payload: {
        template_name: product.template_name,
        image_url: product.image_url,
        store_id: product.store_id,
        store_name: product.store_name,
        store_address: product.store_address,
      },
    })

    if (product.products && product.products.length > 0) {
      const productPayload = product.products.map((product) => ({
        product_id: product.product_id,
        product_name: product.category_name,
        product_price: product.price,
        image_url: product.product_url,
        color: product.color,
      }))

      dispatch({
        type: 'ADD_PRODUCTS',
        payload: productPayload,
      })
    }

    console.log('Added to cart:', product.template_name)
    router.push('/cart?source=flower')
  }

  const display = (
    <ColorProvider>
      {' '}
      <>
        <div className="w-screen flex flex-col bg-white items-center justify-center text-tertiary-black gap-2 sm:flex-row ">
          <div
            className="w-[300px] sm:w-[1000px]  flex flex-col sm:flex-row justify-center  items-center gap-5"
            style={{ height: 'calc(100vh - 64px)' }}
          >
            <div
              className=" w-[300px] h-[300px] sm:w-[500px]  relative my-5 sm:h-[500px]"
              style={{
                backgroundImage: `url('${product.image_url}')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
              }}
            >
              <div className="absolute top-2 left-2 hover:bg-white hover:text-tertiary-black rounded-full w-5 h-5">
                <MdEdit className="text-xl" />
              </div>
            </div>

            <div className="flex flex-col flex-1 w-full gap-3 sm:h-[500px]">
              {/* 分類花束 */}
              <div className="flex flex-col px-5 py-6 gap-1">
                <div className="flex flex-row justify-between">
                  <p className="text-xs">{product.occ}</p>
                  <div className="sm:hidden" onClick={handleHeartClick}>
                    {isHeart ? (
                      <IoIosHeartEmpty className="text-danger text-xl " />
                    ) : (
                      <IoIosHeart className="text-danger text-xl " />
                    )}
                  </div>
                </div>

                <h1 className="sm:text-3xl">{product.template_name}</h1>
                <p className="text-tertiary-gray-100 text-xs">
                  {product.store_name}
                </p>
                <p className="text-right sm:hidden">${product.total_price}</p>
              </div>
              {/* 詳細資訊 */}
              <div className="w-[300px] text-sm h-full sm:h-auto flex-col gap-3 py-6 hidden sm:flex sm:w-full">
                <div className="flex flex-col w-full px-5">
                  <p className="">詳細資訊</p>
                  <p className="">如當日花材不足會以相似款替代</p>
                </div>
                <div className="flex flex-col justify-center px-5 gap-2">
                  {product.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center flex-grow"
                    >
                      <p className="flex-grow">{item.category_name}</p>
                      <p className="flex-grow">{item.color}</p>
                      <p className="w-6 text-center flex-grow">${item.price}</p>
                      <p className="flex-grow">
                        x{item.positions ? item.positions.length : 0}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="w-full hidden sm:block" />
              <div className="px-5 py-6 hidden sm:block">
                <p className="text-right text-3xl">${product.total_price}</p>
              </div>
              {/* 按鈕 */}
              <div className="flex flex-row sm:w-full  w-[300px]  gap-6  justify-around items-center sm:px-5 ">
                <div
                  className="hidden flex-shrink-0 sm:block w-12"
                  onClick={handleHeartClick}
                >
                  {isHeart ? (
                    <IoIosHeartEmpty className="text-danger text-2xl " />
                  ) : (
                    <IoIosHeart className="text-danger text-2xl " />
                  )}
                </div>
                <div className=" flex-1">
                  <MyButton
                    color="secondary200"
                    size="xl"
                    onClick={handleCustom}
                  >
                    客製化
                  </MyButton>
                </div>
                <div className=" flex-1">
                  <MyButton
                    color="secondary"
                    size="xl"
                    onClick={handleAddToCart}
                  >
                    結帳
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full sm:hidden" />
          {/* 詳細資訊 */}
          <div className="w-[300px] text-sm h-full flex flex-col gap-3 py-6 sm:hidden">
            <div className="flex flex-col ">
              <p className="">詳細資訊</p>
              <p className="">如當日花材不足會以相似款替代</p>
            </div>
            <div className="flex flex-col justify-center px-5 gap-2">
              {product.products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center flex-grow"
                >
                  <p className="flex-grow">{item.category_name}</p>
                  <p className="flex-grow">{item.color}</p>
                  <p className="w-6 text-center flex-grow">${item.price}</p>
                  <p className="flex-grow">
                    x{item.positions ? item.positions.length : 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </ColorProvider>
  )
  return (
    <DefaultLayout activePage={activePage}>
      {isLoading ? <Loader /> : display}
    </DefaultLayout>
  )
}
