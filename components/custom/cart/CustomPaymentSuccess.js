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

export default function CustomPaymentSuccess() {
  const [activePage, setActivePage] = useState('cart')
  const router = useRouter()

  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth

  // 取資料和方法
  // const { cart, removeFromCart, clearCart, totalSubtotal, totalCartProducts } =
  //   useCart()

  // const { fillOutDetails } = useFillOut()

  // console.log(cart)
  // console.log(cart[0])
  // console.log(fillOutDetails)
  // console.log(auth.userData.id)

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

  //明細 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base', 'py-1', ''], // 表格 text-initial md:text-right
    wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'], // 整個表格
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
              <TableCell>S2024022700</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>訂單金額</TableCell>
              <TableCell>NT$90</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>訂單成立日期</TableCell>
              <TableCell>2024-02-27 11:02:08</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>訂單狀態</TableCell>
              <TableCell>處理中</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>付款方式</TableCell>
              <TableCell>Line Pay</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>付款狀態</TableCell>
              <TableCell>已付款</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell>發票</TableCell>
              <TableCell>載具</TableCell>
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
