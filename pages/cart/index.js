import React, { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import {
  Tabs,
  Tab,
  Card,
  Image,
  CardBody,
  CardFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
} from '@nextui-org/react'
import { Stepper } from 'react-dynamic-stepper'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import ShopCart from '@/components/shop/shop-cart'
import CourseCart from '@/components/course/page-cart'

export default function Cart() {
  const [activePage, setActivePage] = useState('cart')

  // stepper
  const steps = [
    {
      header: {
        label: '購物車',
      },
      // content: <div>First step content</div>,
      isError: false,
      isWarning: false,
      isComplete: false,
    },
    {
      header: {
        label: '填寫資料',
      },
      // content: <div>Second step content</div>,
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: false,
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

  //table 樣式
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
  // const submitStepper = () => {
  //   console.log('submitted')
  // }
  
  // ----------------------------custom----------------------
  const cartCustomContent = {
    store: '花疫室',
    image: '/assets/course/img_course_card_04.png',
    card: '生日快樂!祝你天天開心、賺大錢',
    cartList: [
      {
        image: '/assets/shop/products/flowers/blue_Bellflower_1.jpg',
        name: '玫瑰花',
        category: 'flower',
        price: '30',
        option: '粉紅色',
        count: 2,
      },
      {
        image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
        name: '向日葵',
        category: 'flower',
        price: '60',
        option: '黃色',
        count: 1,
      },
      {
        image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
        name: '玫瑰花',
        category: 'flower',
        price: '60',
        option: '黃色',
        count: 3,
      },
      {
        image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
        name: '包裝',
        category: 'package',
        price: '60',
        option: '櫥窗提盒',
        count: 1,
      },
      {
        image: '/assets/shop/products/flowers/blue_Clematis_0.jpg',
        name: '卡片',
        category: 'card',
        price: '25',
        option: '生日卡',
        count: 1,
      },
    ],
  }

  const totalPrice = cartCustomContent.cartList.reduce((total, item) => {
    return total + item.price * item.count
  }, 0)

  // ----------------------------custom-------------------

  return (
    <>
      <DefaultLayout activePage={activePage}>
        <CenterLayout>
          {/* steps */}
          <div className="flex flex-col w-full md:w-6/12 lg:w-4/12 gap-14 my-4 sm:mt-6 sm:mb-4">
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
              // tabList={{ display: 'none' }}
            />
          </div>
          {/* Tab */}
          <div className="flex w-screen flex-col bg-white items-center justify-around">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              classNames={{
                tabList:
                  'gap-6 sm:max-w-[1024px] w-screen relative  rounded-none p-0 border-b border-divider',
                cursor: 'bg-primary w-full',
                tab: 'w-[400px] px-0 h-12  ',
                tabContent: 'group-data-[selected=true]:text-primary',
              }}
            >
              <Tab
                key="shop"
                title={
                  <div className="flex items-center space-x-2">代客送花</div>
                }
              >
                <div className="w-screen sm:max-w-[600px] sm:h-full flex flex-col px-5 gap-2 relative  mt-4">
                  <h1 className="sm:text-2xl text-xl sm:text-left text-center">
                    {cartCustomContent.store}
                  </h1>
                  <div
                    className=" w-[300px] h-[180px] mx-auto bg-no-repeat bg-center bg-contain"
                    style={{
                      backgroundImage: `url(${cartCustomContent.image})`,
                    }}
                  ></div>
                  <div className="flex flex-col w-full gap-2   overflow-auto sm:overflow-visible">
                    <div className="flex flex-col gap-3 sm:h-auto h-[250px]">
                      {cartCustomContent.cartList.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex flex-row items-center sm:h-[70px] justify-between w-full border-1  rounded-md text-sm shadow-md"
                        >
                          <div className="flex-grow">
                            <div
                              className="my-1 w-[60px] rounded-md m-auto aspect-square  bg-center bg-contain"
                              style={{
                                backgroundImage: `url(${item.image})`,
                              }}
                            ></div>
                          </div>

                          <div className="flex flex-row sm:gap-2 sm:justify-between flex-grow  items-center gap-1">
                            <div className="flex-grow flex sm:flex-row flex-col sm:justify-around">
                              <div className="sm:w-[80px] text-center">
                                {item.name}
                              </div>
                              <div className="sm:w-[80px] text-center sm:text-sm text-xs sm:text-tertiary-black text-tertiary-gray-100">
                                {item.option}
                              </div>
                            </div>

                            <div className="sm:w-[80px] text-center text-sm   text-tertiary-black ">
                              {item.count} {item.category === 'flower' && '朵'}
                              {item.category === 'card' && '張'}
                              {item.category === 'package' && '個'}
                            </div>
                          </div>

                          <div className="flex-grow text-center ">
                            <p>${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>{' '}
                  </div>
                  <div className="sm:static sticky bottom-0 left-0 bg-white">
                    <hr className="w-full mt-2" />
                    <div className="flex justify-end w-full p-3">
                      <div className="flex justify-between items-center sm:w-[180px]">
                        <span className="px-3">小計</span>
                        <div className="flex items-center">
                          <span className="text-primary">NT$</span>
                          <span className="text-primary pl-1">
                            {totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 sm:gap-4 sm:my-10">
                      <MyButton color="primary" size="xl" isOutline>
                        <Link href="/">上一步</Link>
                      </MyButton>
                      <MyButton color="primary" size="xl">
                        <Link href="/cart/fill-out">下一步</Link>
                      </MyButton>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab
                key="custom"
                title={
                  <div className="flex items-center space-x-2">線上商城</div>
                }
              >
                <ShopCart />
              </Tab>

              <Tab
                key="course"
                title={
                  <div className="flex items-center space-x-2">合作課程</div>
                }
              >
                {/* 課程購物車的頁面 */}
                <CourseCart />
              </Tab>
            </Tabs>
          </div>
        </CenterLayout>
      </DefaultLayout>
    </>
  )
}
