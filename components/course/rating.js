import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function CourseRating() {
  return (
    <div className="flex flex-row items-center text-secondary-100">
      <FaStar className="w-5 h-5" />
      <FaStar className="w-5 h-5" />
      <FaStar className="w-5 h-5" />
      <FaStar className="w-5 h-5 text-secondary-200" />
      <FaStar className="w-5 h-5 text-secondary-200" />
      <span className="text-tertiary-black ml-1">5.0</span>
    </div>
  )
}
