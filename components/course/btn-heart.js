import React, { useEffect, useContext, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useCourseFavorites } from '@/hooks/use-course-fav' // 從 context 中調課程 isCourseFavorited 來看

export default function HeartButton({ opacity, courseId }) {
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const { isCourseFavorited, setCourseFavorites, fetchFavorites } =
    useCourseFavorites()
  const [active, setActive] = useState(isCourseFavorited(courseId)) // 狀態變量active，用於表示當前課程的收藏狀態，初始值通過調用`isCourseFavorited`函數來獲取

  // 監聽 courseFavorites 和 courseId 的變化，更新 active 狀態
  useEffect(() => {
    setActive(isCourseFavorited(courseId))
  }, [courseId, isCourseFavorited])

  // 切換收藏與否功能
  const toggleFavorite = async () => {
    try {
      const method = active ? 'DELETE' : 'POST'
      const response = await fetch(
        `http://localhost:3005/api/courses/${
          method === 'POST' ? 'add-fav' : 'remove-fav'
        }/${courseId}`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: method,
        }
      )

      if (response.ok) {
        setActive(!active)
        const data = await response.json()
        console.log(data) // 打印後端響應

        if (method === 'DELETE') {
          // 移除收藏後，過濾掉取消收藏的課程
          setCourseFavorites((currentFavorites) =>
            currentFavorites.filter((course) => course.course_id !== courseId)
          )
        } else {
          // 添加收藏後，你需要確定如何獲取新添加的課程訊息
          // 這裡假設後端在添加收藏時返回了新增的課程對象
          if (data.course) {
            setCourseFavorites((currentFavorites) => [
              ...currentFavorites,
              data.course,
            ])
          }
        }

        // 重新獲取收藏列表以同步狀態
        await fetchFavorites()

        // 顯示成功提示
        toast.success(`成功${method === 'POST' ? '收藏' : '取消收藏'} 課程`)
      } else {
        throw new Error('Response not OK')
      }
    } catch (error) {
      console.error('Error updating favorite:', error)

      // 重置UI狀態，因為操作失敗了
      setActive(active)

      // 顯示錯誤提示
      toast.error(error.message || `無法更新課程收藏狀態。`)
    }
  }

  // 根據傳入的 opacity 動態設定透明度類別 ( 決定空心愛心要不要黑色背景色 )
  const heartOpacityClass = `text-tertiary-black ${opacity} absolute z-10 w-5 h-5 top-0 right-0 cursor-pointer`

  return (
    <button onClick={toggleFavorite}>
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
