import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import OrderItemCard from '@/components/shop/order-item-card'

const OrderCard = () => {
  //外層手風琴樣式
  const accordionStyle = {
    base: ['p-0', 'text-tertiary-black'], // 訂單明細
    content: ['p-0'], // 商品列表
    title: ['text-tertiary-black'],
    trigger: ['px-0', 'py-1', 'pb-4'],
  }
  //訂單明細 table 樣式
  const tableStyles = {
    base: ['text-tertiary-black'],
    th: ['text-base'], // 表頭
    td: ['text-base', 'px-0', 'py-1'], // 表格
    wrapper: ['text-base'], // 整個表格
  }
  // 評價 Modal 變數
  // const { isOpen, onOpen } = useDisclosure()
  const imageList = [
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
    },
    {
      src: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
    },
  ]

  //商品列表 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base'], // 表格
    wrapper: ['text-base', 'shadow-none', 'border-1'], // 整個表格
  }

  // 獲得訂單明細資料
  // const [orderDetails, setOrderDetails] = useState([])
  // console.log('orderDetails', orderDetails)

  // 獲得訂單明細
  // const getOrderDetail = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3005/api/products/get-order-details`,
  //       {
  //         credentials: 'include',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         method: 'GET',
  //       }
  //     )
  //     if (response.ok) {
  //       const data = await response.json()
  //       setOrderDetails(data.data)
  //     }
  //   } catch (error) {
  //     // console.log('Error order detail', error)
  //   }
  // }
  // useEffect(() => {
  //   getOrderDetail()
  // }, [])

  const [orderDetails, setOrderDetails] = useState([])
  const [orderItems, setOrderItems] = useState([])
  console.log('Order Details:', orderDetails)
  console.log('Order Items:', orderItems)

  const getAllOrderDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/products/get-all-order-details`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data.orderDetails)
        setOrderItems(data.orderItems)
      }
    } catch (error) {
      // console.log('Error order detail', error)
    }
  }
  useEffect(() => {
    getAllOrderDetails()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-4">
        {orderDetails.map((detail, index) => {
          {
            /* let imageUrl =
            detail.imageUrl ||
            `/assets/shop/products/default_fallback_image.jpg`
          if (Array.isArray(detail.images)) {
            const nonThumbnailImage = detail.images.find(
              (image) => !image.is_thumbnail
            )
            if (nonThumbnailImage) {
              imageUrl = `/assets/shop/products/${detail.directory}/${nonThumbnailImage.url}`
            }
          } */
          }
          return (
            <>
              <Card className="rounded-xl border-tertiary-gray-200 border-1 shadow-none p-4">
                <CardBody className="p-0">
                  <Accordion itemClasses={accordionStyle}>
                    <AccordionItem
                      key={`detail-${detail.id}`}
                      aria-label={`Accordion ${index}`}
                      title={`訂單編號#${detail.order_number}`}
                      subtitle={
                        <div className="flex flex-col gap-2 mt-2">
                          <Table
                            hideHeader
                            aria-label="Example static collection table"
                            removeWrapper
                            classNames={tableStyles}
                          >
                            <TableHeader>
                              <TableColumn>xx</TableColumn>
                              <TableColumn>xx</TableColumn>
                            </TableHeader>
                            <TableBody>
                              <TableRow
                                key={`${detail.id}-total`}
                                className="flex gap-4"
                              >
                                <TableCell>訂單金額</TableCell>
                                <TableCell>NT$ {detail.total_cost}</TableCell>
                              </TableRow>
                              <TableRow
                                key={`${detail.id}-payment`}
                                className="flex gap-4"
                              >
                                <TableCell>付款狀態</TableCell>
                                <TableCell>已付款</TableCell>
                              </TableRow>
                              <TableRow
                                key={`${detail.id}-status`}
                                className="flex gap-4"
                              >
                                <TableCell>訂單狀態</TableCell>
                                <TableCell
                                  className={
                                    detail.order_status === '已完成'
                                      ? 'text-primary'
                                      : 'text-danger'
                                  }
                                >
                                  {detail.order_status}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>

                          <div className="flex gap-2">
                            <Image
                              src="/assets/shop/products/flowers/pink_Gladiola_0.jpg"
                              alt=""
                              className="w-24 h-24 rounded-md md:rounded-xl"
                            />
                          </div>
                        </div>
                      }
                    >
                      <OrderItemCard
                        orderDetailId={detail.id}
                        orderItems={orderItems}
                        tableStyles={tableStyles}
                        tableStylesContent={tableStylesContent}
                      />
                    </AccordionItem>
                  </Accordion>
                </CardBody>
              </Card>{' '}
            </>
          )
        })}
      </div>
    </>
  )
}
export default OrderCard
