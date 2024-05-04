import { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Link } from '@nextui-org/react'
// 小組元件
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/context/shop-cart-context'
import { useRouter } from 'next/router'
const ShopCheckout = () => {
  const { auth } = useAuth()
  const { clearCart } = useCart()

  const [detailData, setDetailData] = useState({
    products: [],
    detail: {},
  })
  console.log(detailData, 'detailData')

  const getParsedData = (stringifiedJson) => {
    return stringifiedJson ? JSON.parse(stringifiedJson) : ''
  }

  const getDetailData = () => {
    const productList = getParsedData(localStorage.getItem('cartItems'))
    const filledOutDetail = getParsedData(
      localStorage.getItem('fillOutDetails')
    )
    const normalizedProductList = Object.values(productList)
    console.log('productList', productList)
    return {
      products: normalizedProductList,
      detail: filledOutDetail,
    }
  }
  const router = useRouter()

  useEffect(() => {
    const data = getDetailData() // fetch data
    setDetailData(data) // store data in useState
  }, []) // dependencies array 可以用來控制 要執行幾次getDetailData

  // 計算商品總數量
  // total是累加器，item是當前元素
  const totalQuantity = detailData.products.reduce((total, item) => {
    return total + item.quantity
  }, 0) // 0是reduce第2個參數，代表初始值

  // 小計
  const subtotal = detailData.products.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  // 全部的金額
  const deliveryShipping = Number(detailData.detail.deliveryShipping) || 0
  const discount = Number(detailData.detail.discount) || 0
  const totalAmount = subtotal + deliveryShipping - discount

  // 將資料送到後端
  const confirmOrder = async () => {
    console.log('Sending order details:', detailData) // 查看傳送的數據
    try {
      const response = await fetch(
        'http://localhost:3005/api/products/save-order-details',
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            products: detailData.products,
            detail: detailData.detail,
            subtotal: subtotal,
            totalAmount: totalAmount,
            orderStatus: '處理中',
          }),
        }
      )
      console.log('Response received:', response) // 查看響應狀態
      if (response.ok) {
        const data = await response.json()
        console.log('Order confirmed:', data)

        // 訂單成功後清空 localStorage 和本地狀態
        localStorage.removeItem('cartItems')
        localStorage.removeItem('fillOutDetails')
        setDetailData({
          products: [],
          detail: {},
        })
        clearCart()
      } else {
        throw new Error('Something went wrong with the order confirmation.')
      }
    } catch (error) {
      console.error('Failed to confirm order:', error)
    }
    router.push('/cart/payment-successful?source=shop')
  }

  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base', 'py-1', ''], // 表格 text-initial md:text-right
    wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'], // 整個表格
  }
  const tableStyles = {
    base: ['text-tertiary-black'],
    th: ['text-base', 'text-tertiary-gray-100'], // 表頭
    td: ['text-base', 'px-3', 'py-3'], // 表格
    wrapper: [
      'text-base',
      'shadow-none',
      'border-1',
      'border-tertiary-100',
      'rounded-xl',
    ],
  }
  return (
    <div className="flex flex-col w-full lg:w-8/12 gap-14">
      {/* order-detail start */}
      <div className="flex flex-col w-full">
        <Subtitle text="購物明細" />
        {/* 明細 */}
        <div className="flex flex-col gap-3 mt-6 mb-4">
          <Table
            selectionMode="single"
            defaultSelectedKeys={['2']}
            aria-label="Example static collection table"
            classNames={{ ...tableStyles }}
          >
            <TableHeader>
              <TableColumn className="w-1/2 md:w-1/3 lg:w-1/4 bg-primary-300">
                商品
              </TableColumn>
              <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                單價
              </TableColumn>
              <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                數量
              </TableColumn>
              <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                小計
              </TableColumn>
            </TableHeader>
            <TableBody>
              {detailData.products.map((item) => {
                let imageUrl =
                  item.imageUrl ||
                  `/assets/shop/products/default_fallback_image.jpg`
                if (Array.isArray(item.images)) {
                  const nonThumbnailImage = item.images.find(
                    (image) => !image.is_thumbnail
                  )
                  if (nonThumbnailImage) {
                    imageUrl = `/assets/shop/products/${item.directory}/${nonThumbnailImage.url}`
                  }
                }
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="sm:flex sm:flex-row sm:items-center sm:space-x-6">
                        <Image
                          src={imageUrl}
                          alt=""
                          className="md:w-24 md:h-24 mx-auto rounded-md md:rounded-xl"
                        />
                        <div>
                          <p>{item.name}</p>
                          <p className="text-tertiary-gray-100">
                            {item.stores.store_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>NT${item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>NT${item.quantity * item.price}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        {/* 小計 */}
        <div>
          <Table
            hideHeader
            aria-label="Example static collection table"
            classNames={{ ...tableStylesContent }}
          >
            <TableHeader>
              <TableColumn>無</TableColumn>
              <TableColumn>無</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell></TableCell>
                <TableCell className="text-nowrap">
                  共 {detailData.products.length} 項商品，數量 {totalQuantity}{' '}
                  個
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="w-full pr-8">小計</TableCell>
                <TableCell className="text-right">
                  NT$ {''}
                  {subtotal} {''}
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="w-full pr-8">運費</TableCell>
                <TableCell className="text-right">
                  NT$ {detailData.detail.deliveryShipping}
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="w-full pr-8">折扣</TableCell>
                <TableCell className="text-right">NT${}</TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell className="w-full pr-8">總計</TableCell>
                <TableCell className="text-right text-lg font-medium text-primary">
                  NT${totalAmount}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      {/* order-detail end */}
      {/* shipping & payment detail start*/}
      <div className="flex flex-col justify-center w-full gap-6">
        <Subtitle text="配送/付款明細" />

        <Table
          hideHeader
          aria-label="Example static collection table"
          classNames={{ ...tableStylesContent }}
        >
          <TableHeader>
            <TableColumn>header</TableColumn>
            <TableColumn>header內容</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="pr-8 text-nowrap">配送方式</TableCell>
              <TableCell className="w-full text-right">
                {detailData.detail.deliveryOption}
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="pr-8 text-nowrap">配送地址</TableCell>
              <TableCell className="w-full text-right line-clamp-1">
                7-ELEVEN 門市
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="pr-8 text-nowrap">收件人</TableCell>
              <TableCell className="w-full text-right">
                {detailData.detail.recipientName}
              </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell className="pr-8 text-nowrap">連絡電話</TableCell>
              <TableCell className="w-full text-right">
                {detailData.detail.recipientNumber}
              </TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell className="pr-8 text-nowrap">付款方式</TableCell>
              <TableCell className="w-full text-right">
                {detailData.detail.paymentMethod}
              </TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell className="pr-8 text-nowrap">發票</TableCell>
              <TableCell className="w-full text-right">
                {detailData.detail.invoiceOption}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* shipping & payment detail end*/}
      <div className="w-full flex justify-center">
        <Checkbox defaultSelected>
          我同意辦理退貨時，由Bloomify代為處理發票及銷貨退回證明單，以加速退貨退款作業。
        </Checkbox>
      </div>

      <div className="gap-2 flex sm:justify-center sm:gap-4 ">
        <MyButton color="primary" size="xl" isOutline>
          <Link href="/cart/fill-out?source=shop">上一步 </Link>
        </MyButton>

        <MyButton color="primary" size="xl" onClick={confirmOrder}>
          確認，進行付款
        </MyButton>
      </div>
    </div>
  )
}

export default ShopCheckout
