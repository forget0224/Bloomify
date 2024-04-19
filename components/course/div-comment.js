import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function CourseComment({ reviews }) {
  // 處理日期格式
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('zh-TW', options)
  }

  return (
    <>
      {reviews.map((reviews) => (
        <div
          key={reviews.id}
          className="flex flex-col gap-2 py-4 border-b-1 border-b-tertiary-gray-200 last:border-0"
        >
          <p>
            {reviews.member.name}
            <span className="ml-2 text-tertiary-gray-100">
              {formatDate(reviews.created_at)}
            </span>
          </p>
          <div className="flex flex-row items-center text-secondary-100">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-secondary-200" />
            <FaStar className="text-secondary-200" />
          </div>
          <p>{reviews.comment}</p>
        </div>
      ))}
    </>
  )
}
