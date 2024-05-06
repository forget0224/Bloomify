import React, { useState, useMemo } from 'react'
import CoursePagination from './pagination'
import CourseOrder from './div-orders'

export default function TabOrders({ orders, pageSize }) {
  const [currentPage, setCurrentPage] = useState(1)
  const total = Math.ceil(orders.length / pageSize)

  // 計算當前頁顯示的訂單
  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return orders.slice(startIndex, startIndex + pageSize)
  }, [currentPage, orders, pageSize])

  // 分頁改變時的處理
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      {currentOrders.map((order) => (
        <CourseOrder key={order.id} order={order} />
      ))}
      <CoursePagination
        current={currentPage}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
