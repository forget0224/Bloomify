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

  // // Tab
  // const [selected, setSelected] = React.useState('shop')

  // shop start
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
  // shop end
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

  // ----------------------------customend-------------------
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
                <Card>
                  {/* 主要內容 start */}

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
                                  <p>{item.name}hihi</p>
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
                  </div>
                  {/* RWD 主要內容 end */}
                </Card>
              </Tab>
              <Tab
                key="course"
                title={
                  <div className="flex items-center space-x-2">合作課程</div>
                }
              >
                <Card>
                  <p>合作課程</p>
                </Card>
              </Tab>
            </Tabs>
          </div>

          {/* 按鈕 */}
          {/* <div className="flex justify-center gap-2 sm:gap-4 sm:my-10">
            <MyButton color="primary" size="xl" isOutline>
              <Link href="/">上一步</Link>
            </MyButton>
            <MyButton color="primary" size="xl">
              <Link href="/cart/fill-out">下一步</Link>
            </MyButton>
          </div> */}
        </CenterLayout>
      </DefaultLayout>
    </>
  )
}
