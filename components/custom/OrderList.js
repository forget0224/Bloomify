import React, { useState, useEffect } from 'react'
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
  Image,
} from '@nextui-org/react'
import DatePicker from 'react-tailwindcss-datepicker'
function OrderList() {
  const [activeTab, setActiveTab] = useState('全部')
  const [sortKey, setSortKey] = useState('order_date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [orderList, setOrderList] = useState([])
  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)
  // const [minAmount, setMinAmount] = useState('')
  // const [maxAmount, setMaxAmount] = useState('')
  const [sortedData, setSortedData] = useState([])

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
  const getOrderList = async () => {
    const url = `http://localhost:3005/api/custom/orders`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        setOrderList(data.data)
      } else {
        throw new Error(`Failed to fetch orders: ${data.message}`)
      }
    } catch (error) {
      console.error('Failed to load orders:', error.message)
    }
  }

  useEffect(() => {
    getOrderList()
    console.log(orderList)
  }, [])

  const handleSortChange = (e) => {
    const [key, order] = e.target.value.split('-')
    setSortKey(key)
    setSortOrder(order)
  }

  useEffect(() => {
    const sortData = (data) => {
      return [...data].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortKey] > b[sortKey] ? 1 : -1
        } else {
          return a[sortKey] < b[sortKey] ? 1 : -1
        }
      })
    }
    setSortedData(sortData(orderList))
  }, [orderList, sortKey, sortOrder])

  const tabData = {
    全部: sortedData,
    進行中: sortedData.filter((order) =>
      ['未確認', '已確認'].includes(order.order_status)
    ),
    已取消: sortedData.filter((order) => order.order_status === '已取消'),
    已完成: sortedData.filter((order) => order.order_status === '已完成'),
  }

  return (
    <Tabs
      onChange={(key) => setActiveTab(key)}
      aria-label="Order Tabs"
      color={'primary'}
      className="gap-2 mt-4"
    >
      {Object.entries(tabData).map(([key, data]) => (
        <Tab
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
        >
          <div className="flex justify-end m-2">
            <Select
              placeholder="排序"
              onChange={handleSortChange}
              className="w-[200px]"
            >
              <SelectItem key="date-asc" value="order_date-asc">
                日期升序
              </SelectItem>
              <SelectItem key="date-desc" value="order_date-desc">
                日期降序
              </SelectItem>
              <SelectItem key="total-asc" value="total-asc">
                金額升序
              </SelectItem>
              <SelectItem key="total-desc" value="total-desc">
                金額降序
              </SelectItem>
            </Select>
          </div>

          <div className="flex flex-col gap-4">
            {data.length > 0 ? (
              data.map((order, index, { product }) => (
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
                              {new Date(order.order_date).toLocaleDateString()}
                            </div>
                          </div>
                        }
                        subtitle={
                          <div className="flex flex-col gap-2 mt-2">
                            <div>
                              {order.bouquet_name}/{order.store_name}
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
                                  src={`http://localhost:3005${order.image_url}`}
                                  alt=""
                                  className="sm:w-[100px] h-auto w-[80px] rounded-md md:rounded-xl "
                                />
                              </div>
                              <div className="text-tertiary-black text-xl">
                                ${order.total}
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <div
                          className={`flex flex-col w-full mt-2  rounded-xl p-4
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
                              order.products.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="flex flex-row items-center sm:h-[70px] justify-between w-full text-sm  "
                                >
                                  <div className="flex-grow">
                                    <div
                                      className="my-1 w-[60px] rounded-md m-auto aspect-square  bg-center   bg-no-repeat"
                                      style={{
                                        backgroundImage: `url(${item.image_url})`,
                                        backgroundSize:
                                          item &&
                                          (item.product_category ===
                                            'package' ||
                                            item.product_category === 'card')
                                            ? 'cover'
                                            : 'contain',
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
                                      {item.product_category === 'card'
                                        ? '張'
                                        : item.product_category === 'package'
                                        ? '個'
                                        : '朵'}
                                    </div>
                                  </div>
                                  <div className="flex-grow text-center ">
                                    <p>${item.product_price}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <hr className="my-4 w-full border-[#8b8989]" />
                          <div className="flex sm:flex-row sm:justify-start w-full px-4 py-2 flex-col  ">
                            <div className="flex flex-col sm:flex-1 sm:text-base text-sm">
                              <div className="flex flex-row gap-2 justify-between sm:justify-start">
                                <div>寄送時間</div>
                                <div>{order.delivery_date}</div>
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
                                <div>付款方式</div>
                                <div>{order.payment_name}</div>
                              </div>
                            </div>
                            <div className="flex flex-col flex-1 sm:text-base text-sm">
                              <div className="flex flex-row gap-5 text-right justify-between w-full">
                                <div className="text-nowrap">收禮人姓名</div>
                                <div>{order.recipient_name}</div>
                              </div>
                              <div className="flex flex-row gap-5 text-right justify-between w-full">
                                <div className="text-nowrap">收禮人電話</div>
                                <div>{order.recipient_tel}</div>
                              </div>
                              <div className="flex flex-row gap-5 text-right justify-between w-full">
                                <div className="text-nowrap">收禮人地址</div>
                                <div className="text-pretty">
                                  {order.recipient_address}
                                </div>
                              </div>
                              <div className="flex flex-row gap-5 text-right justify-between w-full">
                                <div>卡片內容</div>
                                <div className=" truncate w-[100px] sm:w-[300px]">
                                  {order.card_content === ''
                                    ? '-'
                                    : order.card_content}
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
      ))}
    </Tabs>
  )
}

export default OrderList
