// FavoritesContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

const ProductFavoritesContext = createContext({
  productFavorites: [], // 收藏列表
  setProductFavorites: () => {}, // 更新收藏列表
  isProductFavorited: () => false,
})

export const ProductFavoritesProvider = ({ children }) => {
  const { auth } = useAuth() // 獲取身分驗證狀態和用戶資訊
  const [productFavorites, setProductFavorites] = useState([]) // 收藏狀態

  const isProductFavorited = (productId) => {
    return productFavorites.some((product) => product.product_id === productId)
  }

  const addFavoritesStatusToProducts = (products) => {
    return products.map((product) => ({
      ...product,
      isFavorited: productFavorites.some(
        (favorite) => favorite.product_id === product.id
      ),
    }))
  }

  // 用戶已驗證時，獲取收藏商品列表
  useEffect(() => {
    if (auth?.isAuth) {
      fetch('http://localhost:3005/api/products/get-fav', {
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
            const formattedProducts = data.data.map((product) => ({
              ...product,
              mainImage: product.url,
            }))
            setProductFavorites(formattedProducts)
          } else {
            throw new Error(data.message)
          }
        })
        .catch((error) =>
          console.error('Error fetching shop favorites:', error)
        )
    }
  }, [auth])

  // 重新獲取收藏列表
  const fetchFavorites = async () => {
    if (auth?.isAuth) {
      try {
        const response = await fetch(
          'http://localhost:3005/api/products/get-fav',
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
          const formattedProducts = data.data.map((product) => ({
            ...product,
            isFavorited: true,
            mainImage: product.url,
          }))
          setProductFavorites(formattedProducts)
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

  // 提供要傳遞的收藏列表及更新函數
  const value = {
    productFavorites, // 儲存了用戶收藏的商品的序列
    setProductFavorites,
    isProductFavorited,
    fetchFavorites,
    addFavoritesStatusToProducts, // 輔助函數，整合課程數據和收藏狀態
  }

  return (
    <ProductFavoritesContext.Provider value={value}>
      {children}
    </ProductFavoritesContext.Provider>
  )
}

export const useProductFavorites = () => useContext(ProductFavoritesContext)
