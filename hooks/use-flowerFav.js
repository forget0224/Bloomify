import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './use-auth'
const FlowerFavoritesContext = createContext({
  coursefavorites: [],
  setFlowerFavorites: () => {},
  isFlowerFavorited: () => false,
})

export const FlowerFavoritesProvider = ({ children }) => {
  const { auth } = useAuth()
  const { userData } = auth

  const [flowerFavorites, setFlowerFavorites] = useState([])

  const isFlowerFavorited = (tempId) => {
    return flowerFavorites.some((temp) => temp.template_id === tempId)
  }

  const addFavorites = (temps) => {
    return temps.map((temp) => ({
      ...temp,
      isFavorited: flowerFavorites.some(
        (favorite) => favorite.template_id === temp.id
      ),
    }))
  }

  useEffect(() => {
    if (userData && userData.id) {
      // 確保 userData 和 userData.id 都是有效的
      fetch(`http://localhost:3005/api/custom/custom-favorite/${userData.id}`, {
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
            setFlowerFavorites(data.data)
          } else {
            throw new Error(data.message)
          }
        })
        .catch((error) =>
          console.error('Error fetching temp favorites:', error)
        )
    }
  }, [userData])

  // const fetchFavorites = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3005/api/temps/get-fav', {
  //       credentials: 'include',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'GET',
  //     })
  //     const data = await response.json()
  //     if (data.status === 'success') {
  //       const formattedCourses = data.data.map((temp) => ({
  //         ...temp,
  //         isFavorited: true,
  //         mainImage: temp.image_path,
  //       }))
  //       setFlowerFavorites(formattedCourses)
  //     } else {
  //       throw new Error(data.message)
  //     }
  //   } catch (error) {
  //     console.error('Error fetching temp favorites:', error)
  //   }
  // }

  // // 當auth狀態改變時，重新獲取收藏列表
  // useEffect(() => {
  //   fetchFavorites()
  // }, [])

  // 要傳遞出去的收藏列表及更新函數
  const value = {
    flowerFavorites, // 儲存了用戶收藏的課程的序列
    setFlowerFavorites,
    isFlowerFavorited, // 用來檢查指定的課程 ID 是否已被用戶收藏
    addFavorites, // 放在頁面中，給資料加上收藏狀態
  }

  return (
    <FlowerFavoritesContext.Provider value={value}>
      {children}
    </FlowerFavoritesContext.Provider>
  )
}

export const useFlowerFavorites = () => useContext(FlowerFavoritesContext)
