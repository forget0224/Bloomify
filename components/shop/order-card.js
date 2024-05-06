import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react'
import { Card, CardBody } from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import OrderItemCard from '@/components/shop/order-item-card'
import OrderCardImage from '@/components/shop/order-card-image'

const OrderCard = ({ filterStatus }) => {
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

  //商品列表 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base'], // 表格
    wrapper: ['text-base', 'shadow-none', 'border-1'], // 整個表格
  }

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

  const filteredOrderDetails = orderDetails.filter((detail) =>
    filterStatus.includes(detail.order_status)
  )
  const limit = 3
  const [currentPage, setCurrentPage] = useState(1)
  // 計算總頁數
  const pageCount = Math.ceil(filteredOrderDetails.length / limit)
  // 計算當前頁面資料數量
  const startIndex = (currentPage - 1) * limit // 是在計算評論的筆數。當currentPage是1，那麼(currentPage - 1)就會是0，筆數就會從數組的第0筆開始取

  const currentOrderDetails = filteredOrderDetails.slice(
    startIndex,
    startIndex + limit
  ) // 如果currentPage是1，且limit是3，那currentReviews會包含索引0、1、2的評論
  // 分頁變化處理的函數
  const handlePageChange = (newPage) => {
    console.log(newPage)
    // newPage是當前選中的頁碼
    setCurrentPage(newPage)
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {currentOrderDetails.length > 0 ? (
          currentOrderDetails
            .filter((detail) => filterStatus.includes(detail.order_status))
            .map((detail, index) => {
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
                                    <TableCell>
                                      NT$ {detail.total_cost}
                                    </TableCell>
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
                                          : detail.order_status === '處理中'
                                          ? 'text-danger'
                                          : ''
                                      }
                                    >
                                      {detail.order_status}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>

                              <div>
                                <OrderCardImage
                                  orderDetailId={detail.id}
                                  orderItems={orderItems}
                                />
                              </div>
                            </div>
                          }
                        >
                          <OrderItemCard
                            orderDetailId={detail.id}
                            orderItems={orderItems}
                            orderDetails={orderDetails}
                            tableStyles={tableStyles}
                            tableStylesContent={tableStylesContent}
                          />
                        </AccordionItem>
                      </Accordion>
                    </CardBody>
                  </Card>{' '}
                </>
              )
            })
        ) : (
          <div>尚未有訂單</div>
        )}
        <div className="mt-6 flex justify-center">
          <Pagination
            total={pageCount}
            initialPage={1}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}
export default OrderCard
