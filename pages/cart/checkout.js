import { useState, useEffect } from 'react'
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
import { useAuth } from '@/hooks/use-auth'
import CustomCheckOut from '@/components/custom/CustomCheckOut'
import CourseCheckOut from '@/components/course/page-checkout'
import DefaultLayout from '@/components/layout/default-layout'
// import { MyButton } from '@/components/btn/mybutton'
// import Subtitle from '@/components/common/subtitle'

import ShopCheckout from '@/components/shop/shop-checkout'

export default function Confirm() {
  const { auth } = useAuth()
  const { isAuth, user } = auth
  const [activePage, setActivePage] = useState('cart')
  const route = useRouter()
  const source = route.query.source
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
  // const submitStepper = () => {
  //   console.log('submitted')
  // }

  //商品列表 table 樣式
  // const tableStyles = {
  //   base: ['text-tertiary-black'],
  //   th: ['text-base', 'text-tertiary-gray-100'], // 表頭
  //   td: ['text-base', 'px-3', 'py-3'], // 表格
  //   wrapper: [
  //     'text-base',
  //     'shadow-none',
  //     'border-1',
  //     'border-tertiary-100',
  //     'rounded-xl',
  //   ], // 整個表格
  // }

  //明細 table 樣式
  // const tableStylesContent = {
  //   th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
  //   td: ['text-base', 'py-1', ''], // 表格 text-initial md:text-right
  //   wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'], // 整個表格
  // }
  

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <main className="flex flex-col justify-center items-center bg-white">
            <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 md:px-0 mb-10">
              {/* steps */}
              <div className="flex flex-col w-full md:w-6/12 lg:w-4/12 gap-14 mt-6 mb-4">
                <Stepper
                  steps={steps}
                  pallet={{
                    default: '#E4E4E4',
                    warning: '#FF7C7C',
                    danger: '#FF7C7C',
                    success: '#68A392',
                  }}
                  footerData={{
                    // submitHandler: submitStepper,
                    prevBtnClassName: 'hidden',
                    nextBtnClassName: 'hidden',
                    submitBtnClassName: 'hidden',
                  }}
                />
              </div>
              {/* 提示訊息 */}
              <p className="sm:flex sm:flex-row sm:w-full sm:justify-center lg:w-8/12 py-10">
                用戶
                <span className="text-primary px-2">{auth.userData.name}</span>
                您好，請確認您的購物資訊無誤
              </p>
              {/* 主要內容 */}

              {!source && (
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
                          {cartContent.map((item, index) => (
                            <TableRow key="index">
                              <TableCell key={index}>
                                <div className="sm:flex sm:flex-row sm:items-center sm:space-x-6">
                                  <Image
                                    src={item.image}
                                    alt=""
                                    className="hidden sm:block md:w-24 md:h-24 mx-auto rounded-md md:rounded-xl"
                                  />
                                  <div>
                                    <p>{item.name}</p>
                                    <p className="text-tertiary-gray-100">
                                      {item.store}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>NT${item.price}</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>NT$30</TableCell>
                            </TableRow>
                          ))}

                          {/* <TableRow key="2">
                          <TableCell>
                            <div className="flex flex-row items-center space-x-6">
                              <Image
                                src={
                                  '/assets/shop/products/pink_Gladiola_0.jpg'
                                }
                                alt=""
                                className="w-6 h-6 md:w-24 md:h-24 rounded-md md:rounded-xl"
                              />
                              <p>花的名稱</p>
                            </div>
                          </TableCell>
                          <TableCell>NT$30</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>NT$30</TableCell>
                        </TableRow> */}
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
                              共 2 項商品，數量 6 個
                            </TableCell>
                          </TableRow>
                          <TableRow key="2">
                            <TableCell className="w-full pr-8">小計</TableCell>
                            <TableCell className="text-right">NT$180</TableCell>
                          </TableRow>
                          <TableRow key="3">
                            <TableCell className="w-full pr-8">運費</TableCell>
                            <TableCell className="text-right">NT$60</TableCell>
                          </TableRow>
                          <TableRow key="4">
                            <TableCell className="w-full pr-8">折扣</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow key="5">
                            <TableCell className="w-full pr-8">總計</TableCell>
                            <TableCell className="text-right text-lg font-medium">
                              NT$220
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
                        <TableColumn>配送方式</TableColumn>
                        <TableColumn>內容</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell className="pr-8 text-nowrap">
                            配送方式
                          </TableCell>
                          <TableCell className="w-full text-right">
                            超商取貨
                          </TableCell>
                        </TableRow>
                        <TableRow key="2">
                          <TableCell className="pr-8 text-nowrap">
                            配送地址
                          </TableCell>
                          <TableCell className="w-full text-right line-clamp-1">
                            7-ELEVEN 大安門市 / 台北市大安區xxx路xxx號x樓
                          </TableCell>
                        </TableRow>
                        <TableRow key="3">
                          <TableCell className="pr-8 text-nowrap">
                            收件人
                          </TableCell>
                          <TableCell className="w-full text-right">
                            芙莉蓮
                          </TableCell>
                        </TableRow>
                        <TableRow key="4">
                          <TableCell className="pr-8 text-nowrap">
                            連絡電話
                          </TableCell>
                          <TableCell className="w-full text-right">
                            0912345678
                          </TableCell>
                        </TableRow>
                        <TableRow key="5">
                          <TableCell className="pr-8 text-nowrap">
                            付款方式
                          </TableCell>
                          <TableCell className="w-full text-right">
                            Line Pay
                          </TableCell>
                        </TableRow>
                        <TableRow key="6">
                          <TableCell className="pr-8 text-nowrap">
                            發票
                          </TableCell>
                          <TableCell className="w-full text-right">
                            載具
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  {/* shipping & payment detail end*/}
                  <div className="w-full flex justify-center">
                    <Checkbox defaultSelected>
                      我同意辦理退貨時，由floral_shop代為處理發票及銷貨退回證明單，以加速退貨退款作業。
                    </Checkbox>
                  </div>

                  <div className="w-full gap-2 flex justify-center sm:gap-4 ">
                    <Link href="/cart/fill-out">
                      <MyButton color="primary" size="xl" isOutline>
                        上一步
                      </MyButton>
                    </Link>
                    <Link
                      href="/cart/payment-successful"
                      className="text-white"
                    >
                      <MyButton color="primary" size="xl">
                        確認，進行付款
                      </MyButton>
                    </Link>
                  </div>
                </div>
              )}

              {source === 'flower' && <CustomCheckOut />}
              {source === 'shop'}
              {source === 'course' && <CourseCheckOut />}
            </div>
          </main>
        </>
      }
    </DefaultLayout>
  )
}
