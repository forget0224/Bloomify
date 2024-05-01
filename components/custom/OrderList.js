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
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')

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

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1
      }
    })
  }

  const tabData = {
    全部: orderList,
    進行中: orderList.filter((order) =>
      ['未確認', '已確認'].includes(order.order_status)
    ),
    已取消: orderList.filter((order) => order.order_status === '已取消'),
    已完成: orderList.filter((order) => order.order_status === '已完成'),
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
          <Select placeholder="排序" onChange={handleSortChange}>
            <SelectItem key="date-asc" value="order_date-asc">
              日期升序
            </SelectItem>
            <SelectItem key="date-desc" value="order_date-desc">
              日期降序
            </SelectItem>
            <SelectItem key="amount-asc" value="total_amount-asc">
              金額升序
            </SelectItem>
            <SelectItem key="amount-desc" value="total_amount-desc">
              金額降序
            </SelectItem>
          </Select>
          <div className="flex flex-col gap-4">
            {sortData(data).length > 0 ? (
              sortData(data).map((order, index, { product }) => (
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
                                  src={order.image_url}
                                  alt=""
                                  className="w-24 h-24 rounded-md md:rounded-xl"
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
                                      {item.category_type === 'card' && '張'}
                                      {item.category_type === 'package' && '個'}
                                      {item.category_type === 'accent' && '朵'}
                                      {item.category_type === 'main' && '朵'}
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
                                <div className="text-pretty">
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
// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
// import {
//   Tabs,
//   Tab,
//   Card,
//   CardBody,
//   Accordion,
//   AccordionItem,
//   Select,
//   SelectItem,
//   Input,
// } from '@nextui-org/react'
// import DatePicker from 'react-tailwindcss-datepicker'

// function OrderList() {
//   const [activeTab, setActiveTab] = useState('all')
//   const [sortKey, setSortKey] = useState('order_date')
//   const [sortOrder, setSortOrder] = useState('asc')
//   const [orderList, setOrderList] = useState([])
//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)
//   const [minAmount, setMinAmount] = useState('')
//   const [maxAmount, setMaxAmount] = useState('')

//   const getOrderList = async () => {
//     const url = `http://localhost:3005/api/custom/orders`
//     try {
//       const response = await fetch(url)
//       const data = await response.json()
//       if (response.ok) {
//         setOrderList(data.data)
//       } else {
//         throw new Error(`Failed to fetch orders: ${data.message}`)
//       }
//     } catch (error) {
//       console.error('Failed to load orders:', error.message)
//     }
//   }

//   useEffect(() => {
//     getOrderList()
//   }, [])

//   const sortData = (data) => {
//     return data.sort((a, b) => {
//       if (sortOrder === 'asc') {
//         return a[sortKey] > b[sortKey] ? 1 : -1
//       } else {
//         return a[sortKey] < b[sortKey] ? 1 : -1
//       }
//     })
//   }

//   const handleSortChange = (e) => {
//     const [key, order] = e.target.value.split('-')
//     setSortKey(key)
//     setSortOrder(order)
//   }

//   const applyFilters = (orders) => {
//     return orders.filter((order) => {
//       const orderDate = new Date(order.order_date)
//       const amount = parseFloat(order.total_amount)
//       const isDateInRange =
//         (!startDate || orderDate >= startDate) &&
//         (!endDate || orderDate <= endDate)
//       const isAmountInRange =
//         (minAmount === '' || amount >= parseFloat(minAmount)) &&
//         (maxAmount === '' || amount <= parseFloat(maxAmount))
//       return isDateInRange && isAmountInRange
//     })
//   }

//   const filteredOrders = () => {
//     let filtered = []
//     switch (activeTab) {
//       case 'all':
//         filtered = orderList
//         break
//       case 'ongoing':
//         filtered = orderList.filter((order) =>
//           ['未確認', '已確認'].includes(order.order_status)
//         )
//         break
//       case 'cancelled':
//         filtered = orderList.filter((order) => order.order_status === '已取消')
//         break
//       case 'completed':
//         filtered = orderList.filter((order) => order.order_status === '已完成')
//         break
//       default:
//         filtered = orderList
//     }
//     return applyFilters(sortData(filtered))
//   }

//   return (
//     <Tabs onChange={(key) => setActiveTab(key)} aria-label="Order Tabs">
//       {Object.entries({
//         all: '全部訂單',
//         ongoing: '進行中',
//         cancelled: '已取消',
//         completed: '已完成',
//       }).map(([key, title]) => (
//         <Tab key={key} title={title}>
//           <div className="flex flex-row items-center gap-4 my-4">
//             <DatePicker
//               selected={startDate}
//               onChange={setStartDate}
//               placeholder="開始日期"
//             />
//             <DatePicker
//               selected={endDate}
//               onChange={setEndDate}
//               placeholder="結束日期"
//             />
//           </div>
//           <Select placeholder="排序" onChange={handleSortChange}>
//             <SelectItem key="date-asc" value="order_date-asc">
//               日期升序
//             </SelectItem>
//             <SelectItem key="date-desc" value="order_date-desc">
//               日期降序
//             </SelectItem>
//             <SelectItem key="amount-asc" value="total_amount-asc">
//               金額升序
//             </SelectItem>
//             <SelectItem key="amount-desc" value="total_amount-desc">
//               金額降序
//             </SelectItem>
//           </Select>
//           <div className="flex flex-col gap-4">
//             {filteredOrders().length > 0 ? (
//               filteredOrders().map((order, index) => (
//                 <Card
//                   key={order.order_id}
//                   className="rounded-xl border-tertiary-gray-200 border-1 shadow-none py-4 w-full"
//                 >
//                   <CardBody className="p-0">
//                     <Accordion>
//                       <AccordionItem
//                         key={order.order_id}
//                         aria-label={`Accordion ${index + 1}`}
//                         title={
//                           <div className="flex flex-row justify-between w-full">
//                             <div className="sm:text-xl text-lg">
//                               訂單編號 #{order.order_id}
//                             </div>
//                             <div className="sm:text-md text-sm text-tertiary-gray-100">
//                               {new Date(order.order_date).toLocaleDateString()}
//                             </div>
//                           </div>
//                         }
//                         subtitle={
//                           <div className="flex flex-col gap-2 mt-2">
//                             <div>
//                               {order.bouquet_name}/{order.store_name}
//                             </div>
//                             <div
//                               className={`w-16 text-center ${
//                                 order.order_status === '已完成'
//                                   ? 'text-primary bg-primary-300'
//                                   : order.order_status === '已取消'
//                                   ? 'text-tertiary-gray-100 bg-tertiary-gray-200'
//                                   : 'text-danger bg-secondary-200'
//                               }`}
//                             >
//                               {order.order_status}
//                             </div>

//                             <div className="flex flex-row justify-between items-end">
//                               <div className="flex gap-2">
//                                 {/* <Image
//                                   src={order.image_url}
//                                   alt=""
//                                   className="w-24 h-24 rounded-md md:rounded-xl"
//                                 /> */}
//                               </div>
//                               <div className="text-tertiary-black text-xl">
//                                 ${order.total_amount}
//                               </div>
//                             </div>
//                           </div>
//                         }
//                       >
//                         <div
//                           className={`flex flex-col w-full mt-2 bg-secondary-200 rounded-xl p-4
//                     ${
//                       order.order_status === '已完成'
//                         ? 'bg-primary-300'
//                         : order.order_status === '已取消'
//                         ? 'bg-tertiary-gray-200'
//                         : 'bg-secondary-200'
//                     }`}
//                         >
//                           <div className="flex flex-col gap-3 sm:h-auto min-h-[150px]">
//                             {order.products &&
//                               order.products.map((item, itemIndex) => (
//                                 <div
//                                   key={itemIndex}
//                                   className="flex flex-row items-center sm:h-[70px] justify-between w-full text-sm  "
//                                 >
//                                   <div className="flex-grow">
//                                     <div
//                                       className="my-1 w-[60px] rounded-md m-auto aspect-square  bg-center bg-contain"
//                                       style={{
//                                         backgroundImage: `url(${item.image_url})`,
//                                       }}
//                                     ></div>
//                                   </div>

//                                   <div className="flex flex-row sm:gap-2 sm:justify-between flex-grow  items-center gap-1">
//                                     <div className="flex-grow flex sm:flex-row flex-col sm:justify-around">
//                                       <div className="sm:w-[100px] text-center">
//                                         {item.category_name}
//                                       </div>
//                                       <div className="sm:w-[100px] text-center sm:text-sm text-xs sm:text-tertiary-black text-tertiary-gray-100">
//                                         {item.color_name}
//                                       </div>
//                                     </div>

//                                     <div className="sm:w-[100px] text-center text-sm   text-tertiary-black ">
//                                       {item.count}
//                                       {item.category_type === 'card' && '張'}
//                                       {item.category_type === 'package' && '個'}
//                                       {item.category_type === 'accent' && '朵'}
//                                       {item.category_type === 'main' && '朵'}
//                                     </div>
//                                   </div>
//                                   <div className="flex-grow text-center ">
//                                     <p>${item.product_price}</p>
//                                   </div>
//                                 </div>
//                               ))}
//                           </div>
//                           <hr className="my-4 w-full border-[#8b8989]" />
//                           <div className="flex sm:flex-row sm:justify-start w-full px-4 py-2 flex-col  ">
//                             <div className="flex flex-col sm:flex-1 sm:text-base text-sm">
//                               <div className="flex flex-row gap-2 justify-between sm:justify-start">
//                                 <div>寄送時間</div>
//                                 <div>
//                                   {new Date(
//                                     order.delivery_date
//                                   ).toLocaleString()}
//                                 </div>
//                               </div>
//                               <div className="flex flex-row gap-2 justify-between sm:justify-start">
//                                 <div>寄送方式</div>
//                                 <div>{order.shipping_name}</div>
//                               </div>
//                               <div className="flex flex-row gap-2 justify-between sm:justify-start">
//                                 <div>寄送狀態</div>
//                                 <div>{order.shipping_status}</div>
//                               </div>
//                               <div className="flex flex-row gap-2 justify-between sm:justify-start">
//                                 <div>付款狀態</div>
//                                 <div>{order.payment_name}</div>
//                               </div>
//                             </div>
//                             <div className="flex flex-col flex-1 sm:text-base text-sm">
//                               <div className="flex flex-row gap-5 text-right justify-between w-full">
//                                 <div className="text-nowrap">收禮人姓名</div>
//                                 <div>{order.recipient_name}</div>
//                               </div>
//                               <div className="flex flex-row gap-5 text-right justify-between w-full">
//                                 <div className="text-nowrap">收禮人電話</div>
//                                 <div>{order.recipient_tel}</div>
//                               </div>
//                               <div className="flex flex-row gap-5 text-right justify-between w-full">
//                                 <div className="text-nowrap">收禮人地址</div>
//                                 <div className="text-pretty">
//                                   {order.recipient_address}
//                                 </div>
//                               </div>
//                               <div className="flex flex-row gap-5 text-right justify-between w-full">
//                                 <div>卡片內容</div>
//                                 <div className="text-pretty">
//                                   {order.card_content}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </AccordionItem>
//                     </Accordion>
//                   </CardBody>
//                 </Card>
//               ))
//             ) : (
//               <h1>沒有相關訂單資訊</h1>
//             )}
//           </div>
//         </Tab>
//       ))}
//     </Tabs>
//   )
// }

// export default OrderList
