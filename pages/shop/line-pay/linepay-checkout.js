import { useState, useEffect } from 'react'
import {
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import moment from 'moment'
import DefaultLayout from '@/components/layout/default-layout'
import Head from 'next/head'

export default function OrderSuccess() {
  const [activePage, setActivePage] = useState('shop')
  const tableStyles = {
    th: 'text-base', // 表頭
    td: 'text-base', // 表格
    wrapper: 'text-base', // 整個表格
  }
  const [orderDetails, setOrderDetails] = useState([])
  console.log(orderDetails)
  const [orderItems, setOrderItems] = useState([])
  // console.log(orderItems)

  // 獲得訂單明細
  const getOrderDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/products/get-all-order-details`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
      if (response.ok) {
        const data = await response.json()
        if (data && data.orderDetails) {
          setOrderDetails(data.orderDetails)
          setOrderItems(data.orderItems)
        } else {
          console.log('No order details available or data is malformed:', data)
          setOrderDetails([])
          setOrderItems([])
        }
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
      setOrderDetails([])
      setOrderItems([])
    }
  }
  useEffect(() => {
    getOrderDetails()
  }, [])

  // 取數據陣列的最後一項，確保數據已加載
  // const latestDetail = orderDetails[orderDetails.length - 1] 這樣寫結果會是undefined
  const latestDetail =
    orderDetails.length > 0 ? orderDetails[orderDetails.length - 1] : null
  console.log('latestDetail', latestDetail)
  // 根據訂單找出相對應的結帳總商品
  const orderProducts = orderItems.filter(
    (item) => +item.product_order_detail_id === latestDetail.id
  )

  console.log('orderProducts', orderProducts)

  // 按下付費按鈕
  const sendPoToLine = async () => {
    try {
      // 將資料轉成Line Pay
      const linePayOrder = await convertOrderForLinePay()
      console.log('linePayOrder', linePayOrder)
      const r = await fetch(
        'http://localhost:3005/api/products/create-line-pay-order', // 與LINE PAY串接
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: latestDetail.order_number,
            total_amount: latestDetail.subtotal,
            linePayOrder: linePayOrder,
          }),
        }
      )
      const d = await r.json() //將 fetch 請求的回應轉換成一個 JSON 物件
      console.log('linpayresWeb:', d) //??
      window.location.replace(`${d}`)
    } catch (ex) {
      console.log(ex)
    }
  }

  // // 將訂單資訊轉換成line要求的格式
  const convertOrderForLinePay = async () => {
    try {
      const linePayOrder = {
        orderId: latestDetail.order_number,
        currency: 'TWD',
        amount: latestDetail.subtotal,
        packages: orderProducts.map((v, i) => {
          return {
            id: `products_${i + 1}`,
            amount: v.quantity * v.price,
            products: [
              {
                name: v.name,
                quantity: v.quantity,
                price: v.price,
              },
            ],
          }
        }),
      }
      return linePayOrder
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <DefaultLayout activePage={activePage}>
      <>
        <Head>
          <title>付款</title>
        </Head>
        <main className="flex flex-col justify-center items-center bg-white mt-[64px]">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-start columns-12 static px-5 md:px-0">
            {/* 麵包屑 */}
            <div className="bg-white flex flex-col flex-wrap gap-4 py-6 w-full">
              <div>
                <Breadcrumbs>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>線上商城</BreadcrumbItem>
                  <BreadcrumbItem color="primary">訂單明細</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </div>
            <div className="w-full sm:flex sm:justify-center">
              <div className="w-full flex flex-col md:w-6/12 lg:w-4/12 items-center justify-center gap-4">
                <Subtitle text="訂單明細" className="w-full" />
                <Table
                  hideHeader
                  classNames={tableStyles}
                  aria-label="Order Details"
                >
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                  </TableHeader>

                  <TableBody>
                    <TableRow key="1">
                      <TableCell>訂單編號</TableCell>
                      <TableCell>#{latestDetail?.order_number.substring(0, 7)}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>訂單金額</TableCell>
                      <TableCell>
                        NT${''}
                        {latestDetail?.total_cost}
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>訂單成立日期</TableCell>
                      <TableCell>
                        {moment(latestDetail?.created_at).format('YYYY-MM-DD')}
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>訂單狀態</TableCell>
                      <TableCell>{latestDetail?.order_status}</TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell>付款方式</TableCell>
                      <TableCell>{latestDetail?.payment_method}</TableCell>
                    </TableRow>
                    <TableRow key="6">
                      <TableCell>付款狀態</TableCell>
                      <TableCell className="text-danger">未付款</TableCell>
                    </TableRow>
                    <TableRow key="7">
                      <TableCell>發票</TableCell>
                      <TableCell>{latestDetail?.invoice_option}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="container flex flex-wrap justify-center my-10 mx-4 sm:mx-6">
              <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                <MyButton
                  color="primary"
                  size="xl"
                  className="w-full sm:w-auto"
                  onClick={(e) => {
                    sendPoToLine(e)
                  }}
                >
                  LINE PAY 付款
                </MyButton>
              </div>
            </div>
          </div>
        </main>
      </>
    </DefaultLayout>
  )
}
