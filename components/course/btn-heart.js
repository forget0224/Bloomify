import React, { useState } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

export default function HeartButton({ opacity }) {
  // 使用 useState 鉤子來添加狀態管理
  const [isActive, setIsActive] = useState(false)

  // 切換isActive狀態的函數
  const toggleHeart = () => setIsActive(!isActive)

  // 根據傳入的 opacity 動態設定透明度類別
  const heartOpacityClass = `text-tertiary-black ${opacity} absolute z-10 w-5 h-5 top-0 right-0 cursor-pointer`

  return (
    <button onClick={toggleHeart}>
      {isActive ? (
        <FaHeart className="text-secondary-100 relative z-10 w-5 h-5 cursor-pointer" />
      ) : (
        <div className="relative">
          <FaHeart className={heartOpacityClass} />
          <FaRegHeart className="text-secondary-100 relative z-10 w-5 h-5 cursor-pointer hover:text-[#FFAC9A]" />
        </div>
      )}
    </button>
  )
}
