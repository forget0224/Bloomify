import React from 'react'
import { Pagination } from '@nextui-org/react'

export default function CoursePagination() {
  return (
    <Pagination
      color="secondary-100"
      initialPage={3}
      total={10}
      className="flex justify-center"
    />
  )
}
