import React, { useState, useEffect } from 'react'
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
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import { useCart } from '@/context/course-cart-context'
import { useFillOut } from '@/context/fill-out-context'
import moment from 'moment'

export default function CourseCheckOut() {
  const [activePage, setActivePage] = useState('cart')

  // 取資料和方法
  const { cart, removeFromCart, clearCart, totalSubtotal, totalCartProducts } =
    useCart()

  // const [fillOutDetails, setFillOutDetails] = useFillOut()

  console.log(cart)
  console.log(cart[0])

  const handleCheckout = () => {
    // 處理結帳邏輯...
    // 可能需要發送 cart 和 totalSubtotal 到後端
  }

  // const courseStorage = () => {}

  // stepper
  const steps = [
    {
      header: {
        label: '購物車',
      },
      // content: <div>First step content</div>,
      isError: false,
      isWarning: false,
      isComplete: true,
    },
    {
      header: {
        label: '填寫資料',
      },
      // content: <div>Second step content</div>,
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: true,
    },
    {
      header: {
        label: '訂單確認',
      },
      // content: <div>Third step content</div>,
      isError: false,
      isComplete: false,
    },
  ]

  // 假資料
  const cartContent = [
    {
      image: '/assets/shop/products/flowers/blue_Bellflower_1.jpg',
      store: '花店名稱1',
      name: '玫瑰花',
      price: '30',
    },
    {
      image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
      store: '花店名稱2',
      name: '太陽花',
      price: '60',
    },
  ]

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
                  <TableCell className="text-right">{`-`}</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell className="w-full pr-8">總計</TableCell>
                  <TableCell className="text-right text-lg font-medium">
                    NT${totalSubtotal - 0}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 配送/付款明細 */}
        <div className="flex flex-col justify-center w-full gap-6">
          <Subtitle text="配送/付款明細" />
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
                <TableCell className="w-full text-right">超商取貨</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="pr-8 text-nowrap">配送地址</TableCell>
                <TableCell className="w-full text-right line-clamp-1">
                  7-ELEVEN 大安門市 / 台北市大安區xxx路xxx號x樓
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="pr-8 text-nowrap">收件人</TableCell>
                <TableCell className="w-full text-right">芙莉蓮</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="pr-8 text-nowrap">連絡電話</TableCell>
                <TableCell className="w-full text-right">0912345678</TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell className="pr-8 text-nowrap">付款方式</TableCell>
                <TableCell className="w-full text-right">Line Pay</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell className="pr-8 text-nowrap">發票</TableCell>
                <TableCell className="w-full text-right">載具</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* 同意事項 */}
        <div className="w-full flex justify-center">
          <Checkbox defaultSelected>
            我同意辦理退貨時，由floral_shop代為處理發票及銷貨退回證明單，以加速退貨退款作業。
          </Checkbox>
        </div>

        {/* 按鈕群組 */}
        <div className="w-full gap-2 flex justify-center sm:gap-4 ">
          <Link href="/cart/fill-out">
            <MyButton color="primary" size="xl" isOutline>
              上一步
            </MyButton>
          </Link>
          <Link href="/cart/payment-successful" className="text-white">
            {/* TODO: */}
            <MyButton color="primary" size="xl" onClick={handleCheckout()}>
              確認，進行付款
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}
