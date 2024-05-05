import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Link } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useLocation } from 'react-use'

export default function CoursePaymentSuccess() {
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth

  const [activePage, setActivePage] = useState('cart')

  const [orderDetails, setOrderDetails] = useState(null)

  const router = useRouter()

  // 用來抓訂單id送去後端
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const orderNumber = queryParams.get('orderNumber')

  // 當組件加載時，發送 API 請求
  useEffect(() => {
    if (orderNumber) {
      fetchOrderDetails(orderNumber)
    }
  }, [orderNumber])

  console.log(orderNumber)

  // GET 獲取單張訂單詳情
  const fetchOrderDetails = async (orderNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/course-orders/${orderNumber}`,
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
        console.log(data)
        setOrderDetails(data.data) // 更新狀態
      } else {
        console.error('Failed to fetch order details')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // 縮短 UUID
  function shortenUUID(uuid) {
    const parts = uuid.split('-')
    const shortUUID = parts.slice(0, 2).join('-')
    return shortUUID
  }

  // 處理日期格式
  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm:ss')
  }

  //商品列表 table 樣式
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
    ], // 整個表格
  }

  return (
    <>
      <div className="w-full flex flex-col md:w-6/12 lg:w-4/12 items-center justify-center gap-4">
        <Subtitle text="訂單明細" className="w-full" />
        <Table hideHeader classNames={tableStyles}>
          <TableHeader>
            <TableColumn>xx</TableColumn>
            <TableColumn>xx</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>訂單編號</TableCell>
              <TableCell>
                {orderDetails
                  ? `#${shortenUUID(orderDetails.order_number)}`
                  : '載入中'}
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>訂單金額</TableCell>
              <TableCell>
                NT${orderDetails ? orderDetails.payment_amount : '載入中'}
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>訂單狀態</TableCell>
              <TableCell>
                {orderDetails ? orderDetails.order_status.name : '載入中'}
              </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>付款方式</TableCell>
              <TableCell>
                {orderDetails ? orderDetails.payment.name : '載入中'}
              </TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>付款狀態</TableCell>
              <TableCell>
                {orderDetails ? orderDetails.payment_status.name : '載入中'}
              </TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>發票</TableCell>
              <TableCell>
                {orderDetails ? orderDetails.invoice.name : '載入中'}
              </TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell>訂單成立日期</TableCell>
              <TableCell>
                {orderDetails ? formatDate(orderDetails.created_at) : '載入中'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="container flex flex-wrap justify-center my-10 mx-4 sm:mx-6">
        <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
          <Link href="/center/course-order">
            <MyButton
              color="primary"
              size="xl"
              isOutline
              className="w-full md:w-[180px] sm:w-auto"
            >
              查看訂單
            </MyButton>
          </Link>

          <Link href="/course">
            <MyButton
              color="primary"
              size="xl"
              className="w-full md:w-[180px] sm:w-auto"
            >
              回課程首頁
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}
