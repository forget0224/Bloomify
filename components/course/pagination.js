import React from 'react'
import { Pagination } from '@nextui-org/react'

export default function CoursePagination({ current, total, onPageChange }) {
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
