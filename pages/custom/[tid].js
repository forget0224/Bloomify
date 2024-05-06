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
import { useAuth } from '@/hooks/use-auth'
import AddFav from '@/components/custom/common/AddFav'
export default function Detail() {
  const auth = useAuth()
  const { isAuth } = auth
  const [activePage, setActivePage] = useState('custom')
  const [isHeart, setIsHeart] = useState(true)
  const { close, open, isLoading } = useLoader()
  const { dispatch, state } = useFlowerCart()
  const [templateId, setTemplateId] = useState('')
  const handleHeartClick = () => {
    setIsHeart(!isHeart)
  }
  const router = useRouter()
  const [product, setProduct] = useState({
    template_id: '',
    image_url: '',
    template_name: '',
    store_name: '',
    store_id: 0,
    store_address: '',
    template_occ: '',
    total_price: 0,
    discount: 0,
    color: '',
    products: [],
  })

  const getProductById = async (tid) => {
    const url = `http://localhost:3005/api/custom/${tid}`

    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const data = await res.json()

      if (data.status === 'success' && data.data) {
        console.log(data.data)
        setProduct(data.data)
      } else {
        console.error('Fetch status not success:', data.message)
      }
      close(3)
    } catch (e) {
      console.error('Error fetching product details:', e)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { tid } = router.query
      getProductById(tid)
      setTemplateId(tid)
    }
  }, [router.isReady])

  const handleCustom = () => {
    const currentProducts = state.products // 從 Redux 或 Context 獲取當前的產品狀態
    const newProducts = product.products.map((prod) => ({
      product_id: prod.product_id,
      product_name: prod.category_name,
      product_price: prod.price,
      image_url: prod.product_url,
      color: prod.color,
      top: prod.top,
      left: prod.left,
      zIndex: prod.zIndex,
      angle: prod.rotate,
    }))

    if (JSON.stringify(currentProducts) !== JSON.stringify(newProducts)) {
      dispatch({
        type: 'ADD_PRODUCTS',
        payload: newProducts,
      })
    }

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

    router.push('/custom/custom')
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'SET_BOUQUET_INFO',
      payload: {
        template_name: product?.template_name,
        image_url: product?.image_url,
        store_id: product?.store_id,
        store_name: product?.store_name,
        store_address: product?.store_address,
      },
    })

    const newProducts = product.products.map((prod) => ({
      product_id: prod.product_id,
      name: prod.category_name,
      product_price: prod.price,
      image_url: prod.product_url,
      color: prod.color,
      top: prod.top,
      left: prod.left,
      zIndex: prod.zIndex,
      angle: prod.rotate,
    }))

    dispatch({
      type: 'CLEAR_PRODUCTS',
    })
    dispatch({
      type: 'ADD_PRODUCTS',
      payload: newProducts,
    })

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
                backgroundImage: `url('${product?.image_url}')`,
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
                  <p className="text-xs">{product?.occ}</p>
                  <div className="sm:hidden">
                    <AddFav templateId={templateId} />
                  </div>
                </div>

                <h1 className="sm:text-3xl">{product?.template_name}</h1>
                <p className="text-tertiary-gray-100 text-xs">
                  {product?.store_name}
                </p>
                <p className="text-right sm:hidden">${product?.total_price}</p>
              </div>
              {/* 詳細資訊 */}
              <div className="w-[300px] text-sm h-full sm:h-auto flex-col gap-3 py-6 hidden sm:flex sm:w-full">
                <div className="flex flex-col w-full px-5">
                  <p className="">詳細資訊</p>
                  <p className="">如當日花材不足會以相似款替代</p>
                </div>
                <div className="flex flex-col justify-center px-5 gap-2">
                  {product?.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center flex-grow"
                    >
                      <p className="flex-grow">{item.category_name}</p>
                      <p className="flex-grow">{item.color}</p>
                      <p className="w-6 text-center flex-grow">${item.price}</p>
                      <p className="flex-grow">x{item ? item.length : 0}</p>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="w-full hidden sm:block" />
              <div className="px-5 py-6 hidden sm:block">
                <p className="text-right text-3xl">${product?.total_price}</p>
              </div>
              {/* 按鈕 */}

              <div className="flex flex-row sm:w-full  w-[300px]  gap-6  justify-around items-center sm:px-5 ">
                <div
                  className="hidden flex-shrink-0 sm:block w-12"
                  onClick={handleHeartClick}
                >
                  <AddFav templateId={templateId} />
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
              {product?.products.map((item, index) => (
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
