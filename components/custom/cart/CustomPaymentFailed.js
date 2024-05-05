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

export default function CustomPaymentFailed() {
  const [activePage, setActivePage] = useState('cart')
  const [orderResult, setOrderResult] = useState(null)
  const route = useRouter()
  const orderId = route.query.orderId

  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth

  const tableStyles = {
    base: ['text-tertiary-black'],
    th: ['text-base', 'text-tertiary-gray-100'],
    td: ['text-base', 'px-3', 'py-3'],
    wrapper: [
      'text-base',
      'shadow-none',
      'border-1',
      'border-tertiary-100',
      'rounded-xl',
    ],
  }

  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'],
    td: ['text-base', 'py-1', ''],
    wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'],
  }

  const fetchOrderResult = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/custom/order-result/${orderId}`
      )
      const data = await response.json()
      if (data.status === 'success') {
        setOrderResult(data.data)
      } else {
        console.error('Failed to fetch invoices:', data.message)
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error)
    }
  }
  useEffect(() => {
    fetchOrderResult()
  }, [])
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
              <TableCell>訂單編號末十碼</TableCell>
              <TableCell>{orderResult?.orderId}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>訂單金額</TableCell>
              <TableCell>NT${orderResult?.total}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>訂單成立日期</TableCell>
              <TableCell>{orderResult?.createdAt}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>訂單狀態</TableCell>
              <TableCell>{orderResult?.orderStatus}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>付款方式</TableCell>
              <TableCell>{orderResult?.paymentMethod}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>付款狀態</TableCell>
              <TableCell>{orderResult?.paymentStatus}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell>發票</TableCell>
              <TableCell>{orderResult?.orderStatus}</TableCell>
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
              className="w-full sm:w-auto"
            >
              查看訂單
            </MyButton>
          </Link>

          <Link href="/course">
            <MyButton color="primary" size="xl" className="w-full sm:w-auto">
              回課程首頁
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}
