import { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Stepper } from 'react-dynamic-stepper'
import { Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import { useFlowerCart } from '@/hooks/use-flowerCart'
import { useAuth } from '@/hooks/use-auth'
export default function CustomCheckOut() {
  const [activePage, setActivePage] = useState('cart')
  const [orderId, setOrderId] = useState('')
  const { state, dispatch } = useFlowerCart()
  const [responseMessage, setResponseMessage] = useState('')
  const route = useRouter()
  const { auth } = useAuth()
  const { userData } = auth
  //明細 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base', 'py-1', ''], // 表格 text-initial md:text-right
    wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'], // 整個表格
  }

  const flowerStorage = JSON.parse(
    localStorage.getItem('flowerCartState') || '{}'
  )

  const contactStorage = JSON.parse(
    localStorage.getItem('fillOutDetails') || '{}'
  )
  console.log(contactStorage)
  console.log(flowerStorage)
  function groupProductsByProductId(products, packageInfo, cardInfo) {
    const grouped = products.reduce((acc, item) => {
      const key = item.product_id
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 0,
          total: 0,
        }
      }
      acc[key].count += 1
      acc[key].total += item.product_price
      return acc
    }, {})
    if (packageInfo && packageInfo.product_id != '') {
      const packageKey = packageInfo.product_id || 'package'
      grouped[packageKey] = {
        ...packageInfo,
        count: 1,
        total: packageInfo.product_price,
        sortOrder: 3,
      }
    }

    if (cardInfo && cardInfo.product_id != '') {
      const cardKey = cardInfo.product_id || 'card'
      grouped[cardKey] = {
        ...cardInfo,
        count: 1,
        total: cardInfo.product_price,
        sortOrder: 2,
      }
    }
    return Object.values(grouped).sort(
      (a, b) => (a.sortOrder || 1) - (b.sortOrder || 1)
    )
  }

  const groupedProducts = groupProductsByProductId(
    state.products,
    state.package,
    state.card
  )

  const subTotal = groupedProducts.reduce(
    (total, item) => total + item.total,
    0
  )

  const deliveryShipping = Number(contactStorage.deliveryShipping) || 0
  const discount = Number(contactStorage.discount) || 0
  const [paymentHTML, setPaymentHTML] = useState('')
  const total = subTotal + deliveryShipping - discount

  const handleSubmit = async () => {
    const orderData = {
      bouquet_name: flowerStorage.bouquet_name,
      card_content: flowerStorage.card.content, // 確保這些值不是undefined
      card_url: flowerStorage.card.card_url || '', // 提供默認值以防undefined

      image_url: flowerStorage.image_url,
      products: flowerStorage.products.map((product) => ({
        product_id: product.product_id,
        top: product.top,
        left: product.left,
        z_index: product.z_index,
        rotate: product.rotate,
      })),
      delivery_date: contactStorage.deliveryDate.replace(/\//g, '-'), // 將日期格式從 YYYY/MM/DD 改為 YYYY-MM-DD
      delivery_time: `${contactStorage.deliveryTime}:00:00`, // 時間格式為 HH:MM:SS
      member_id: userData.id,
      store_id: flowerStorage.store_id,
      shipping_id: contactStorage.shipping_id || 1, // 預設值為1
      sender_name: contactStorage.senderName,
      sender_tel: contactStorage.senderNumber,
      recipient_name: contactStorage.recipientName,
      recipient_tel: contactStorage.recipientNumber,
      recipient_address: contactStorage.deliveryAddress,
      total,
      payment_method: contactStorage.paymentMethod,
      payment_status: 2,
      shipping_method: contactStorage.shippingMethod || 1, // 預設值為1
      shipping_status: contactStorage.shippingStatus || 1, // 預設值為1
      order_status: 1, // 預設值為1
      discount: contactStorage.discount || 0, // 預設值為0
    }
    console.log(orderData)
    console.log(orderData.image_url)
    try {
      const response = await fetch(
        'http://localhost:3005/api/custom/submit-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      )
      dispatch({ type: 'CLEAR_PACKAGE' })
      dispatch({ type: 'CLEAR_CARD' })
      dispatch({ type: 'CLEAR_PRODUCTS_AND_BOUQUET' })
      const data = await response.json()

      if (response.ok && data.status == 'success') {
        const paymentResponse = await fetch(
          `http://localhost:3005/api/custom/initiate-payment/${data.data.order_id}`
        )
        const paymentData = await paymentResponse.json()
        if (paymentData.status == 'success') {
          insertAndSubmitForm(paymentData.data)
        } else {
          throw new Error(paymentData.message || 'Failed to initiate payment')
        }
      } else {
        throw new Error(data.message || 'Failed to create order')
      }
    } catch (error) {
      // route.push('/cart/payment-failed')
      setResponseMessage(error.message)
      console.error('Submit error:', error)
    }
  }

  const insertAndSubmitForm = (formHtml) => {
    const formContainer = document.createElement('div')
    formContainer.innerHTML = formHtml
    document.body.appendChild(formContainer)

    const form = document.querySelector('form[name="payment"]')
    form.submit()
  }

  return (
    <>
      <div className="flex flex-col w-full lg:w-8/12 gap-14">
        <div className="flex flex-col w-full">
          <Subtitle text="購物明細" />

          <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto w-full text-base shadow-none border-1 rounded-xl">
            <h1 className="sm:text-2xl text-xl sm:text-left text-center">
              {flowerStorage.store_name} {' - '}
              {flowerStorage.bouquet_name}
            </h1>
            <div
              className=" w-[300px] h-[180px] mx-auto bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: `url(${flowerStorage.image_url})`,
              }}
            ></div>
            <div className="flex flex-col gap-3 mt-6 mb-4">
              {groupedProducts.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-row items-center sm:h-[70px] justify-between w-full  text-sm "
                >
                  <div className="flex-grow">
                    <div
                      className="my-1 w-[60px] rounded-md m-auto aspect-square  bg-center bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${item.image_url})`,
                        backgroundSize:
                          item &&
                          (item.product_category === 'package' ||
                            item.product_category === 'card')
                            ? 'cover'
                            : 'contain',
                      }}
                    ></div>
                  </div>

                  <div className="flex flex-row sm:gap-2 sm:justify-between flex-grow  items-center gap-1 ">
                    <div className="flex-grow flex sm:flex-row flex-col sm:justify-around items-center">
                      <div className="sm:w-[80px] text-center text-wrap sm:text-nowrap ">
                        {item.name}
                      </div>
                      <div className="sm:w-[80px] text-center sm:text-sm text-xs  sm:text-tertiary-black text-tertiary-gray-100">
                        {item.color ? item.color : '-'}
                      </div>
                    </div>

                    <div className="sm:w-[80px] text-center text-sm   text-tertiary-black ">
                      {item.count}
                      {item.product_category === 'card'
                        ? '張'
                        : item.product_category === 'package'
                        ? '個'
                        : '朵'}
                    </div>
                  </div>

                  <div className="text-center min-w-[108px]">
                    <p>${item.product_price}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="w-full " />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <div className="w-full pr-8">小計</div>
                <div className="text-right">NT${subTotal}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-full pr-8">運費</div>
                <div className="text-right">
                  NT${contactStorage.deliveryShipping.toFixed(0)}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-full pr-8">折扣</div>
                <div className="text-right">-{contactStorage.discount}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-full pr-8">總計</div>
                <div className="text-right text-lg font-medium">
                  NT$
                  {total.toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full gap-6">
          <Subtitle text="配送明細" />
          <Table
            hideHeader
            aria-label="Example static collection table"
            classNames={{ ...tableStylesContent }}
          >
            <TableHeader>
              <TableColumn>配送方式</TableColumn>
              <TableColumn>內容</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="pr-8 text-nowrap">配送方式</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.deliveryOption}
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="pr-8 text-nowrap">配送地址</TableCell>
                <TableCell className="w-full text-right line-clamp-1">
                  {contactStorage.deliveryAddress}
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="pr-8 text-nowrap">配送日期</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.deliveryDate}
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="pr-8 text-nowrap">配送時間</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.deliveryTime}
                </TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell className="pr-8 text-nowrap">收件人</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.recipientName}
                </TableCell>
              </TableRow>

              <TableRow key="6">
                <TableCell className="pr-8 text-nowrap">收件人電話</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.recipientNumber}
                </TableCell>
              </TableRow>

              <TableRow key="7">
                <TableCell className="pr-8 text-nowrap">寄件人</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.senderName}
                </TableCell>
              </TableRow>

              <TableRow key="8">
                <TableCell className="pr-8 text-nowrap">寄件人電話</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.recipientNumber}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col justify-center w-full gap-6">
          <Subtitle text="付款明細" />
          <Table
            hideHeader
            aria-label="Example static collection table"
            classNames={{ ...tableStylesContent }}
          >
            <TableHeader>
              <TableColumn>付款方式</TableColumn>
              <TableColumn>內容</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="pr-8 text-nowrap">付款方式</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.paymentMethod}
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="pr-8 text-nowrap">發票格式</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.invoiceOption}
                </TableCell>
              </TableRow>

              {contactStorage.mobileBarcode && (
                <TableRow key="3">
                  <TableCell className="pr-8 text-nowrap">載具編號</TableCell>
                  <TableCell className="w-full text-right">
                    {contactStorage.mobileBarcode}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="w-full flex justify-center">
          <Checkbox defaultSelected>
            我同意辦理退貨時，由floral_shop代為處理發票及銷貨退回證明單，以加速退貨退款作業。
          </Checkbox>
        </div>

        <div className="w-full gap-2 flex justify-center sm:gap-4 ">
          <Link href="/cart/fill-out?source=flower">
            <MyButton color="primary" size="md" isOutline>
              上一步
            </MyButton>
          </Link>
          {/* <Link href="/cart/payment-successful" className="text-white"> */}
          <MyButton color="primary" size="md" onClick={handleSubmit}>
            確認，進行付款
          </MyButton>
          {/* </Link> */}
        </div>
      </div>
    </>
  )
}
