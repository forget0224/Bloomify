import React, { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import ShopSlider from '@/components/shop/shop-slider'
import { MyButton } from '@/components/btn/mybutton'
import { Button, Input } from '@nextui-org/react'
import { Tabs, Tab, Card, Image, CardBody, CardFooter } from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Stepper } from 'react-dynamic-stepper'
import Link from 'next/link.js'
import { FaMinus } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa6'

export default function Cart() {
  const [activePage, setActivePage] = useState('shop')

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
  // const submitStepper = () => {
  //   console.log('submitted')
  // }

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

  // cart content start
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
  // cart content end

  // calculate start
  const [quantity, setQuantity] = useState(1)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value)
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity)
    } else if (event.target.value === '') {
      setQuantity(1)
    }
  }
  // calculate end

  return (
    <>
      <DefaultLayout activePage={activePage}>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
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
            {/* 主要內容 start */}
            <div className="hidden sm:flex sm:flex-col sm:w-full sm:lg:w-10/12 sm:gap-14">
              {/* cart content start*/}
              <div className="flex w-full flex-col">
                <Tabs
                  aria-label="Options"
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList:
                      'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                    cursor: 'w-full bg-[#68A392]',
                    tab: 'max-w-fit px-0 h-12',
                    tabContent: 'group-data-[selected=true]:text-[#68A392]',
                  }}
                >
                  <Tab
                    key="information"
                    title={
                      <div className="flex items-center text-base space-x-2">
                        購物車
                      </div>
                    }
                  >
                    <Card className="shadow-none border-1 border-tertiary-gray-200 rounded-xl p-4">
                      <div className="flex flex-col gap-3">
                        <Table
                          selectionMode="single"
                          defaultSelectedKeys={['2']}
                          aria-label="Example static collection table"
                          removeWrapper
                          classNames={tableStyles}
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
                            <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                              變更
                            </TableColumn>
                          </TableHeader>
                          <TableBody>
                            {cartContent.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <div className="flex flex-row items-center space-x-6">
                                    <Image
                                      src={item.image}
                                      alt=""
                                      className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                                    />
                                    <div className="flex flex-col">
                                      <p>{item.name}</p>
                                      <p className="text-tertiary-gray-100">
                                        {item.store}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>NT${item.price}</TableCell>
                                <TableCell>
                                  <div className="flex gap-4 items-center ">
                                    <Button
                                      isIconOnly
                                      variant="faded"
                                      className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                      onClick={handleDecrement}
                                    >
                                      <FaMinus />
                                    </Button>
                                    <Input
                                      type="text"
                                      value={quantity}
                                      onChange={handleChange}
                                      min="1"
                                      className="max-w-20 w-full rounded-md p-1 text-center"
                                      style={{ textAlign: 'center' }}
                                    />
                                    <Button
                                      isIconOnly
                                      variant="faded"
                                      className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                      onClick={handleIncrement}
                                    >
                                      <FaPlus />
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell>NT$30</TableCell>
                                <TableCell>
                                  <div className="flex flex-col space-y-2">
                                    <MyButton
                                      color="primary"
                                      size="xl"
                                      isOutline
                                    >
                                      下次再買
                                    </MyButton>
                                    <MyButton
                                      color="primary"
                                      size="xl"
                                      isOutline
                                    >
                                      移除商品
                                    </MyButton>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <CardFooter className="flex justify-end pr-6">
                        <div className="flex flex-col space-y-2">
                          <div>共 2 項商品，數量 6 個</div>
                          <div className="flex justify-end space-x-6">
                            <span>小計</span>
                            <span className="text-primary">NT$90</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Tab>
                  {/* buy again */}
                  <Tab
                    key="maybe"
                    title={
                      <div className="flex items-center text-base space-x-2">
                        下次再買
                      </div>
                    }
                  >
                    <Card className="shadow-none border-1 border-tertiary-gray-200 rounded-xl p-4">
                      <div className="flex flex-col gap-3">
                        <Table
                          selectionMode="single"
                          defaultSelectedKeys={['2']}
                          aria-label="Example static collection table"
                          removeWrapper
                          classNames={tableStyles}
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
                            <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                              變更
                            </TableColumn>
                          </TableHeader>
                          <TableBody>
                            {cartContent.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <div className="flex flex-row items-center space-x-6">
                                    <Image
                                      src={item.image}
                                      alt=""
                                      className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                                    />
                                    <p>{item.name}</p>
                                  </div>
                                </TableCell>
                                <TableCell>NT${item.price}</TableCell>
                                <TableCell>
                                  <div className="flex gap-4 items-center ">
                                    <Button
                                      isIconOnly
                                      variant="faded"
                                      className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                      onClick={handleDecrement}
                                    >
                                      <FaMinus />
                                    </Button>
                                    <Input
                                      type="text"
                                      value={quantity}
                                      onChange={handleChange}
                                      min="1"
                                      className="max-w-20 w-full rounded-md p-1 text-center"
                                      style={{ textAlign: 'center' }}
                                    />
                                    <Button
                                      isIconOnly
                                      variant="faded"
                                      className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                      onClick={handleIncrement}
                                    >
                                      <FaPlus />
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell>NT$30</TableCell>
                                <TableCell>
                                  <div className="flex flex-col space-y-2">
                                    <MyButton
                                      color="primary"
                                      size="xl"
                                      isOutline
                                    >
                                      加入購物車
                                    </MyButton>
                                    <MyButton
                                      color="primary"
                                      size="xl"
                                      isOutline
                                    >
                                      移除商品
                                    </MyButton>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
              {/* cart content end */}
              <div className="flex justify-center space-x-10 mb-10">
                <Link href="/shop">
                  <MyButton color="primary" size="xl" isOutline>
                    繼續購物
                  </MyButton>
                </Link>
                <Link href="/shop/cart/fill-out">
                  <MyButton color="primary" size="xl">
                    下一步
                  </MyButton>
                </Link>
              </div>
            </div>
            {/* 主要內容 end */}
            {/* RWD 主要內容 start */}
            <div className="flex w-full flex-col sm:hidden mb-10">
              <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList:
                    'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                  cursor: 'w-full bg-[#68A392]',
                  tab: 'max-w-fit px-0 h-12',
                  tabContent: 'group-data-[selected=true]:text-[#68A392]',
                }}
              >
                <Tab
                  key="information"
                  title={
                    <div className="flex items-center text-base space-x-2">
                      購物車
                    </div>
                  }
                >
                  <Card className="shadow-none border-1 border-tertiary-gray-200 rounded-xl p-4">
                    <CardBody>
                      {cartContent.map((item, index) => (
                        <div key={index} className="flex space-x-4 pb-4">
                          <div className="flex-1">
                            <Image
                              src={item.image}
                              alt=""
                              className="mx-auto"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p>{item.name}</p>
                            <p className="text-tertiary-gray-100">
                              {item.store}
                            </p>
                            <p>NT${item.price}</p>
                            <div className="flex items-center">
                              <Button
                                isIconOnly
                                variant="faded"
                                className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                onClick={handleDecrement}
                              >
                                <FaMinus />
                              </Button>
                              <Input
                                type="text"
                                value={quantity}
                                onChange={handleChange}
                                min="1"
                                className="max-w-20 w-full rounded-md p-1 text-center"
                                style={{ textAlign: 'center' }}
                              />
                              <Button
                                isIconOnly
                                variant="faded"
                                className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                onClick={handleIncrement}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardBody>
                    <CardFooter className="flex justify-end pr-6">
                      <div className="flex flex-col space-y-2">
                        <div>共 2 項商品，數量 6 個</div>
                        <div className="flex justify-end space-x-6">
                          <span>小計</span>
                          <span className="text-primary">NT$90</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Tab>
                {/* buy again */}
                <Tab
                  key="maybe"
                  title={
                    <div className="flex items-center text-base space-x-2">
                      下次再買
                    </div>
                  }
                >
                  <Card className="shadow-none border-1 border-tertiary-gray-200 rounded-xl p-4">
                    <CardBody>
                      {cartContent.map((item, index) => (
                        <div key={index} className="flex space-x-4 pb-4">
                          <div className="flex-1">
                            <Image
                              src={item.image}
                              alt=""
                              className="mx-auto"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p>{item.name}</p>
                            <p className="text-tertiary-gray-100">
                              {item.store}
                            </p>
                            <p>NT${item.price}</p>
                            <div className="flex items-center">
                              <Button
                                isIconOnly
                                variant="faded"
                                className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                onClick={handleDecrement}
                              >
                                <FaMinus />
                              </Button>
                              <Input
                                type="text"
                                value={quantity}
                                onChange={handleChange}
                                min="1"
                                className="max-w-20 w-full rounded-md p-1 text-center"
                                style={{ textAlign: 'center' }}
                              />
                              <Button
                                isIconOnly
                                variant="faded"
                                className="bg-transparent border-transparent border-1 border-primary-100 text-primary-100 hover:bg-primary-300"
                                onClick={handleIncrement}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
              <div className="flex space-x-1.5 sm:space-x-10 my-5">
                <MyButton
                  color="primary"
                  size="xl"
                  isOutline
                  className="w-full"
                >
                  <Link href="/shop">繼續購物</Link>
                </MyButton>

                <MyButton color="primary" size="xl" className="w-full">
                  <Link href="/shop/cart/fill-out">下一頁</Link>
                </MyButton>
              </div>
            </div>
            {/* RWD 主要內容 end */}

            <ShopSlider />
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}
