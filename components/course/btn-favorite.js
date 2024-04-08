import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'

export default function CourseFavorite() {
  return (
    <div className="flex flex-row items-center text-secondary-100 hover:text-[#FFAC9A] h-6 w-6 justify-center">
      {/* <FaHeart /> */}
      <FaRegHeart className="w-5 h-5" />
    </div>
  )
}
