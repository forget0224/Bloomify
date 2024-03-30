import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function CourseRating() {
  return (
    <div className="flex flex-row items-center text-secondary-100">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar className="text-secondary-200" />
      <FaStar className="text-secondary-200" />
      <span className="text-tertiary-black">5.0</span>
    </div>
  )
}
