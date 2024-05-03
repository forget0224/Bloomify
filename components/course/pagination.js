import React from 'react'
import { Pagination } from '@nextui-org/react'

export default function CoursePagination({ current, total, onPageChange }) {
  // 如果total為0或1，不渲染分頁元件
  if (total === 0 || total === 1) {
    return null
  }

  return (
    <Pagination
      color="secondary-100"
      initialPage={current}
      total={total}
      onChange={onPageChange} // 直接傳遞給 onPageChange
      className="flex justify-center"
    />
  )
}
