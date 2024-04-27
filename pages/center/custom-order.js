import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import OrderList from '@/components/custom/OrderList'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'

export default function CustomOrder() {
  const imageList = [
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
    },
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
    },
  ]
  const list = [
    {
      title: 'Orange',
    },
    {
      title: 'Tangerine',
    },
    {
      title: 'Raspberry',
    },
  ]
  const accordionStyle = {
    root: ['bg-danger', 'py-0'],
    base: ['py-0', 'text-tertiary-black', 'flex', 'flex-col'],
    heading: [''],
    titleWrapper: [''],
    subtitle: ['sm:px-4', 'py-0', 'px-2'],
    startContent: ['bg-black'],
    indicator: ['sm:text-3xl', 'text-xl'],
    content: ['', 'text-tertiary-black'],
    title: ['sm:px-4', 'text-tertiary-black', 'py-0', 'px-2'],
    trigger: ['py-0'],
  }
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
  const [orderList, setOrderList] = useState([])
  const getOrderList = async () => {
    const url = `http://localhost:3005/api/custom/orders`
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const data = await res.json()
      console.log(data)

      if (Array.isArray(data.data)) {
        setOrderList(data.data)
      }
      close(1)
    } catch (e) {
      console.error('Failed to load products:', e)
    }
  }

  const [activePage, setActivePage] = useState('custom')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <CenterLayout>
            <div className="hidden sm:block w-full py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>會員中心</BreadcrumbItem>
                <BreadcrumbItem>代客送花</BreadcrumbItem>
                <BreadcrumbItem>商品訂單</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div className="flex flex-row w-full justify-center mt-10 sm:mt-0">
              <Sidebar />

              {/* 歷史訂單 */}
              <div className="sm:w-10/12 pl-0 sm:pl-10     w-screen">
                {/* 訂單明細 */}
                <Title text="商品訂單" />
                <div className="flex w-full flex-col">
                  {/* <Tabs
                    key={''}
                    radius={'full'}
                    color={'primary'}
                    aria-label="Tabs radius"
                    className="pt-4"
                  >
                    <Tab key="all" title="全部訂單">
                      <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-between pb-4  w-[200px] sm:w-full">
                        <div>
                          <CourseSearch />
                        </div>

                        <div className="flex flex-cols items-center space-x-4">
                          <p className=" text-tertiary-black whitespace-nowrap">
                            排序
                          </p>
                          <Select
                            placeholder="Select"
                            defaultSelectedKeys={['Orange']}
                            className="max-w-xs w-48"
                            scrollShadowProps={{
                              isEnabled: false,
                            }}
                          >
                            {list.map((item, index) => (
                              <SelectItem key={item.title} value={item.title}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        {orderList && orderList.length > 0 ? (
                          orderList.map((order, index, { products }) => (
                            <Card
                              key={order.order_id}
                              className="rounded-xl border-tertiary-gray-200 border-1 shadow-none py-4 w-full"
                            >
                              <CardBody className="p-0">
                                <Accordion itemClasses={accordionStyle}>
                                  <AccordionItem
                                    key={order.order_id}
                                    aria-label={`Accordion ${index + 1}`}
                                    title={
                                      <div className="flex flex-row justify-between w-full">
                                        <div className="sm:text-xl text-lg">
                                          訂單編號 #{order.order_id}
                                        </div>
                                        <div className="sm:text-md text-sm text-tertiary-gray-100">
                                          {new Date(
                                            order.order_date
                                          ).toLocaleDateString()}
                                        </div>
                                      </div>
                                    }
                                    subtitle={
                                      <div className="flex flex-col gap-2 mt-2">
                                        <div>
                                          {order.bouquet_name}/
                                          {order.store_name}
                                        </div>
                                        <div
                                          className={`w-16 text-center ${
                                            order.order_status === '已完成'
                                              ? 'text-primary bg-primary-300'
                                              : order.order_status === '已取消'
                                              ? 'text-tertiary-gray-100 bg-tertiary-gray-200'
                                              : 'text-danger bg-secondary-200'
                                          }`}
                                        >
                                          {order.order_status}
                                        </div>

                                        <div className="flex flex-row justify-between items-end">
                                          <div className="flex gap-2">
                                            <Image
                                              src={order.image_url}
                                              alt=""
                                              className="w-24 h-24 rounded-md md:rounded-xl"
                                            />
                                          </div>
                                          <div className="text-tertiary-black text-xl">
                                            ${order.total_amount}
                                          </div>
                                        </div>
                                      </div>
                                    }
                                  >
                                    <div
                                      className={`flex flex-col w-full mt-2 bg-secondary-200 rounded-xl p-4
                                    ${
                                      order.order_status === '已完成'
                                        ? 'bg-primary-300'
                                        : order.order_status === '已取消'
                                        ? 'bg-tertiary-gray-200'
                                        : 'bg-secondary-200'
                                    }`}
                                    >
                                      <div className="flex flex-col gap-3 sm:h-auto min-h-[150px]">
                                        {order.products &&
                                          order.products.map(
                                            (item, itemIndex) => (
                                              <div
                                                key={itemIndex}
                                                className="flex flex-row items-center sm:h-[70px] justify-between w-full text-sm  "
                                              >
                                                <div className="flex-grow">
                                                  <div
                                                    className="my-1 w-[60px] rounded-md m-auto aspect-square  bg-center bg-contain"
                                                    style={{
                                                      backgroundImage: `url(${item.image_url})`,
                                                    }}
                                                  ></div>
                                                </div>

                                                <div className="flex flex-row sm:gap-2 sm:justify-between flex-grow  items-center gap-1">
                                                  <div className="flex-grow flex sm:flex-row flex-col sm:justify-around">
                                                    <div className="sm:w-[100px] text-center">
                                                      {item.category_name}
                                                    </div>
                                                    <div className="sm:w-[100px] text-center sm:text-sm text-xs sm:text-tertiary-black text-tertiary-gray-100">
                                                      {item.color_name}
                                                    </div>
                                                  </div>

                                                  <div className="sm:w-[100px] text-center text-sm   text-tertiary-black ">
                                                    {item.count}
                                                    {item.category_type ===
                                                      'card' && '張'}
                                                    {item.category_type ===
                                                      'package' && '個'}
                                                    {item.category_type ===
                                                      'accent' && '朵'}
                                                    {item.category_type ===
                                                      'main' && '朵'}
                                                  </div>
                                                </div>
                                                <div className="flex-grow text-center ">
                                                  <p>${item.product_price}</p>
                                                </div>
                                              </div>
                                            )
                                          )}
                                      </div>
                                      <hr className="my-4 w-full border-[#8b8989]" />
                                      <div className="flex sm:flex-row sm:justify-start w-full px-4 py-2 flex-col  ">
                                        <div className="flex flex-col sm:flex-1 sm:text-base text-sm">
                                          <div className="flex flex-row gap-2 justify-between sm:justify-start">
                                            <div>寄送時間</div>
                                            <div>
                                              {new Date(
                                                order.delivery_date
                                              ).toLocaleString()}
                                            </div>
                                          </div>
                                          <div className="flex flex-row gap-2 justify-between sm:justify-start">
                                            <div>寄送方式</div>
                                            <div>{order.shipping_name}</div>
                                          </div>
                                          <div className="flex flex-row gap-2 justify-between sm:justify-start">
                                            <div>寄送狀態</div>
                                            <div>{order.shipping_status}</div>
                                          </div>
                                          <div className="flex flex-row gap-2 justify-between sm:justify-start">
                                            <div>付款狀態</div>
                                            <div>{order.payment_name}</div>
                                          </div>
                                        </div>
                                        <div className="flex flex-col flex-1 sm:text-base text-sm">
                                          <div className="flex flex-row gap-5 text-right justify-between w-full">
                                            <div className="text-nowrap">
                                              收禮人姓名
                                            </div>
                                            <div>{order.recipient_name}</div>
                                          </div>
                                          <div className="flex flex-row gap-5 text-right justify-between w-full">
                                            <div className="text-nowrap">
                                              收禮人電話
                                            </div>
                                            <div>{order.recipient_tel}</div>
                                          </div>
                                          <div className="flex flex-row gap-5 text-right justify-between w-full">
                                            <div className="text-nowrap">
                                              收禮人地址
                                            </div>
                                            <div className="text-pretty">
                                              {order.recipient_address}
                                            </div>
                                          </div>
                                          <div className="flex flex-row gap-5 text-right justify-between w-full">
                                            <div>卡片內容</div>
                                            <div className="text-pretty">
                                              {order.card_content}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </AccordionItem>
                                </Accordion>
                              </CardBody>
                            </Card>
                          ))
                        ) : (
                          <h1>尚未有訂單資訊</h1>
                        )}
                      </div>
                    </Tab>

                    <Tab key="unfinished" title="未完成">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>

                    <Tab key="finished" title="已完成">
                      <div className="flex flex-col gap-4">
                        <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                          <CardBody className="p-0">
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </CardBody>
                        </Card>
                      </div>
                    </Tab>
                  </Tabs> */}
                  <OrderList />
                </div>
              </div>
            </div>
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
