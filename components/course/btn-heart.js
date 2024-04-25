import React, { useState } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function HeartButton({ opacity, courseId, isActive }) {
  // 使用 useState 來添加狀態管理
  const [active, setActive] = useState(isActive)

  // 點擊愛心時，會使用 setActive 來切換 active 的值
  const toggleHeart = async () => {
    // alert(courseId) // 測試是否成功接收到courseId
    const method = active ? 'DELETE' : 'POST'
    setActive(!active)

    // 發送 POST 或 DELETE 請求到後端
    try {
      const response = await fetch(
        `http://localhost:3005/api/course-favorites/${courseId}`,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: !active }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data) // 打印后端响应

        // 顯示成功提示
        Swal.fire({
          title: 'Success',
          text: `成功${method} course_id=${courseId}的課程`,
          icon: 'success',
          iconColor: '#68A392',
          confirmButtonColor: '#68A392',
        })
      } else {
        throw new Error('Response not OK')
      }
    } catch (error) {
      console.error('Error updating favorite:', error)

      // 重置UI狀態，因為操作失敗了
      setActive(active)

      // 顯示錯誤提示
      Swal.fire({
        title: 'Error',
        text: error.message || '無法更新課程收藏狀態。',
        icon: 'error',
        confirmButtonColor: '#FFC1B4',
      })
    }
  }

  // 根據傳入的 opacity 動態設定透明度類別
  const heartOpacityClass = `text-tertiary-black ${opacity} absolute z-10 w-5 h-5 top-0 right-0 cursor-pointer`

  return (
    <button onClick={toggleHeart}>
      {/* 如果active就印實心愛心，如果不是active就印空心愛心 */}
      {active ? (
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
