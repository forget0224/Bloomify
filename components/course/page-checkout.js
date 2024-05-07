import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
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
import { Link } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import { useCart } from '@/context/course-cart-context'
import { useFillOut } from '@/context/fill-out-context'
import moment from 'moment'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function CourseCheckOut() {
  const [activePage, setActivePage] = useState('cart')
  const router = useRouter()
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth

  const [isChecked, setIsChecked] = useState(false) // 處理 checkbox 狀態
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  // 取 context 中的資料們和方法
  const { cart, clearCart, totalSubtotal, totalCartProducts } = useCart()
  const { fillOutDetails } = useFillOut()

  // console.log(cart)
  // console.log(cart[0])
  // console.log(fillOutDetails)
  // console.log(auth.userData.id)

  // 提交訂單動作
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('購物車是空的')
      return
    }

    if (!isChecked) {
      toast.error('請勾選同意事項以繼續')
      return
    }

    try {
      // TODO:
      const payment_status_id = 2 // 預設的值
      const order_status_id = 2 // 預設的值
      // 將選項文字映射回選項id
      const invoiceOptionMap = {
        捐贈發票: 1,
        手機條碼載具: 2,
        三聯電子發票: 3,
      }

      const paymentMethodMap = {
        綠界: 1,
        藍新: 2,
        'Line Pay': 3,
        Paypal: 4,
        現金: 5,
        貨到付款: 6,
      }

      const invoice_id = invoiceOptionMap[fillOutDetails.invoiceOption]
      const payment_id = paymentMethodMap[fillOutDetails.paymentMethod]

      // 根據發票選項決定是否包含 mobileBarcode
      let mobileBarcode = ''
      if (invoice_id === 2) {
        // 如果選了手機條碼載具
        mobileBarcode = fillOutDetails.mobileBarcode || '' // 如果沒有值則默認為空字串
      }

      const response = await fetch(
        `http://localhost:3005/api/course-orders/add`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            member_id: auth.userData.id,
            total_cost: totalSubtotal,
            discount: fillOutDetails.discount,
            payment_amount: totalSubtotal - fillOutDetails.discount,
            share_payment_id: payment_id,
            share_payment_status_id: payment_status_id,
            share_order_status_id: order_status_id,
            invoice_id: invoice_id,
            mobileBarcode: mobileBarcode,
            courses: cart.map((item) => ({
              course_id: item.id,
              period: item.period,
            })),
          }),
        }
      )

      if (response.ok) {
        const data = await response.json() // 解析JSON數據
        console.log(data)
        toast.success('訂單提交成功！')
        const orderNumber = data.data.order_number
        router.push(
          `/cart/payment-successful?source=course&orderNumber=${orderNumber}`
        ) // 跳轉到訂單成功頁
        clearCart() // 清除購物車
      } else {
        throw new Error('Network response was not ok.')
      }
    } catch (error) {
      console.error('Error posting order', error)
      toast.error('訂單提交失敗')
    }
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

  //明細 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base', 'py-1', ''], // 表格 text-initial md:text-right
    wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'], // 整個表格
  }

  return (
    <>
      <div className="flex flex-col w-full lg:w-8/12 gap-14">
        {/* 購物明細 */}
        <div className="flex flex-col w-full">
          <Subtitle text="購物明細" />
          <div className="flex flex-col gap-3 mt-6 mb-4">
            <Table
              selectionMode="single"
              defaultSelectedKeys={['2']}
              aria-label="Example static collection table"
              classNames={{ ...tableStyles }}
            >
              <TableHeader>
                <TableColumn className="w-1/2 md:w-1/3 lg:w-1/4 bg-primary-300">
                  課程名稱/上課時間
                </TableColumn>
                <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300 text-right">
                  價格
                </TableColumn>
              </TableHeader>
              <TableBody>
                {cart.map((item, index) => (
                  <TableRow key="index">
                    <TableCell key={index}>
                      <div className="sm:flex sm:flex-row sm:items-center sm:space-x-6">
                        <Image
                          src={item.image}
                          width={80}
                          height={40}
                          alt=""
                          className="sm:block md:w-[80px] mx-auto rounded-md md:rounded-xl"
                        />
                        <div>
                          <p>
                            {item.name}/{item.period}期
                          </p>
                          <p>
                            {moment(item.date).format('YYYY-MM-DD')}&nbsp;&nbsp;
                            {moment(item.startTime, 'HH:mm:ss').format('HH:mm')}
                            -{moment(item.endTime, 'HH:mm:ss').format('HH:mm')}
                          </p>
                          <p className="text-tertiary-gray-100">{item.store}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      NT${item.price}
                    </TableCell>
                  </TableRow>
                ))}
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
                    共 {totalCartProducts} 堂課程
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell className="w-full pr-8">小計</TableCell>
                  <TableCell className="text-right">
                    NT${totalSubtotal}
                  </TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell className="w-full pr-8">折扣</TableCell>
                  <TableCell className="text-right text-tertiary-black">
                    NT${fillOutDetails.discount}
                  </TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell className="w-full pr-8">總計</TableCell>
                  <TableCell className="text-right font-medium text-primary-100">
                    NT${totalSubtotal - fillOutDetails.discount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 配送/付款明細 */}
        <div className="flex flex-col justify-center w-full gap-6">
          <Subtitle text="付款明細" />
          <Table
            hideHeader
            aria-label="Example static collection table"
            classNames={{ ...tableStylesContent }}
          >
            <TableHeader>
              <TableColumn>項目</TableColumn>
              <TableColumn>內容</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="pr-8 text-nowrap">付款方式</TableCell>
                <TableCell className="w-full text-right">
                  {fillOutDetails.paymentMethod}
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="pr-8 text-nowrap">發票種類</TableCell>
                <TableCell className="w-full text-right">
                  {fillOutDetails.invoiceOption}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* 同意事項 */}
        <div className="w-full flex justify-center">
          <Checkbox onChange={handleCheckboxChange} selected={isChecked}>
            我同意辦理退貨時，由floral_shop代為處理發票及銷貨退回證明單，以加速退貨退款作業。
          </Checkbox>
        </div>

        {/* 按鈕群組 */}
        <div className="w-full gap-2 flex justify-center sm:gap-4 ">
          <Link href="/cart/fill-out?source=course">
            <MyButton
              color="primary"
              size="xl"
              isOutline
              className="max-w-[180px]"
            >
              上一步
            </MyButton>
          </Link>
          <Link className="text-white">
            <MyButton
              color="primary"
              size="xl"
              className="max-w-[180px]"
              onClick={handleCheckout}
            >
              確認，進行付款
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}
