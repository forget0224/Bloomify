// FavoritesContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

const CourseFavoritesContext = createContext({
  coursefavorites: [], // 收藏列表
  setCourseFavorites: () => {}, // 更新收藏列表的函数
  isCourseFavorited: () => false,
})

export const CourseFavoritesProvider = ({ children }) => {
  const { auth } = useAuth() // 獲取身分驗證狀態和用戶資訊
  const [courseFavorites, setCourseFavorites] = useState([]) // 收藏狀態

  // 檢查單堂課程是否已被當前用戶收藏
  const isCourseFavorited = (courseId) => {
    return courseFavorites.some((course) => course.course_id === courseId)
  }

  // 將收藏狀態添加到一個課程列表中的每個課程上 ( 在需要收藏狀態的頁面中調用 )
  const addFavoritesStatusToCourses = (courses) => {
    return courses.map((course) => ({
      ...course,
      isFavorited: courseFavorites.some(
        (favorite) => favorite.course_id === course.id
      ),
    }))
  }

  // 用戶已驗證時，獲取此用戶收藏課程列表
  useEffect(() => {
    if (auth?.isAuth) {
      fetch('http://localhost:3005/api/courses/get-fav', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            // 調整數據格式
            const formattedCourses = data.data.map((course) => ({
              ...course, // 原本的課程資料
              mainImage: course.image_path, // 處理主圖
            }))
            setCourseFavorites(formattedCourses)
          } else {
            throw new Error(data.message)
          }
        })
        .catch((error) =>
          console.error('Error fetching course favorites:', error)
        )
    }
  }, [auth])

  // 重新獲取收藏列表
  const fetchFavorites = async () => {
    if (auth?.isAuth) {
      try {
        const response = await fetch(
          'http://localhost:3005/api/courses/get-fav',
          {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'GET',
          }
        )
        const data = await response.json()
        if (data.status === 'success') {
          const formattedCourses = data.data.map((course) => ({
            ...course,
            isFavorited: true,
            mainImage: course.image_path,
          }))
          setCourseFavorites(formattedCourses)
        } else {
          throw new Error(data.message)
        }
      } catch (error) {
        console.error('Error fetching course favorites:', error)
      }
    }
  }

  // 當auth狀態改變時，重新獲取收藏列表
  useEffect(() => {
    fetchFavorites()
  }, [auth])

  // 要傳遞出去的收藏列表及更新函數
  const value = {
    courseFavorites, // 儲存了用戶收藏的課程的序列
    setCourseFavorites,
    isCourseFavorited, // 用來檢查指定的課程 ID 是否已被用戶收藏
    fetchFavorites,
    addFavoritesStatusToCourses, // 放在頁面中，給資料加上收藏狀態
  }

  return (
    <CourseFavoritesContext.Provider value={value}>
      {children}
    </CourseFavoritesContext.Provider>
  )
}

export const useCourseFavorites = () => useContext(CourseFavoritesContext)
