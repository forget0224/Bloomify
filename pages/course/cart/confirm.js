import { useState } from 'react'
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
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'

export default function Confirm() {
  const [activePage, setActivePage] = useState('course')

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

  // 假資料
  // const cartCourseContent = {
  //   cartList: [
  //     {
  //       image: '/assets/course/category-1/img-course-01-01.jpg',
  //       name: 'AA課程',
  //       price: '600',
  //     },
  //     {
  //       image: '/assets/course/category-1/img-course-01-01.jpg',
  //       name: 'BB課程',
  //       price: '600',
  //     },
  //     {
  //       image: '/assets/course/category-1/img-course-01-01.jpg',
  //       name: 'CC課程',
  //       price: '600',
  //     },
  //   ],
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
              <p className="flex flex-row w-full justify-center lg:w-8/12 py-10">
                用戶 <span className="text-primary px-2">訂購人姓名</span>
                您好，請確認您的購物資訊無誤
              </p>
              {/* 主要內容 */}
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
                        <TableRow key="1">
                          <TableCell>
                            <div className="flex flex-row items-center space-x-6">
                              <Image
                                src={
                                  '/assets/course/category-1/img-course-01-01.jpg'
                                }
                                alt=""
                                className="h-6 md:h-24 mx-auto rounded-md md:rounded-xl"
                              />
                              <p>花的名稱</p>
                            </div>
                          </TableCell>
                          <TableCell>NT$30</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>NT$30</TableCell>
                        </TableRow>
                        <TableRow key="2">
                          <TableCell>
                            <div className="flex flex-row items-center space-x-6">
                              <Image
                                src={
                                  '/assets/course/category-1/img-course-01-01.jpg'
                                }
                                alt=""
                                className="h-6 md:h-24 mx-auto rounded-md md:rounded-xl"
                              />
                              <p>花的名稱</p>
                            </div>
                          </TableCell>
                          <TableCell>NT$30</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>NT$30</TableCell>
                        </TableRow>
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
                  <Subtitle text="付款資訊" />
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
                          訂購人
                        </TableCell>
                        <TableCell className="w-full text-right">
                          芙莉蓮
                        </TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell className="pr-8 text-nowrap">
                          訂購人手機號碼
                        </TableCell>
                        <TableCell className="w-full text-right">
                          0912345678
                        </TableCell>
                      </TableRow>
                      <TableRow key="3">
                        <TableCell className="pr-8 text-nowrap">
                          付款方式
                        </TableCell>
                        <TableCell className="w-full text-right">
                          Line Pay
                        </TableCell>
                      </TableRow>
                      <TableRow key="4">
                        <TableCell className="pr-8 text-nowrap">
                          發票類型
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

                <div className="w-full flex justify-center gap-4">
                  <Link href="/shop/cart/fill-out">
                    <MyButton color="primary" size="xl" isOutline>
                      上一步
                    </MyButton>
                  </Link>
                  <Link href="/course/cart/payment-successful">
                    <MyButton color="primary" size="xl">
                      確認，進行付款
                    </MyButton>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </>
      }
    </DefaultLayout>
  )
}
