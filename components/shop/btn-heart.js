import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useProductFavorites } from '@/context/shop-fav-context'

export default function HeartButton({ opacity, productId }) {
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const { isProductFavorited, setProductFavorites, fetchFavorites } =
    useProductFavorites()
  const [active, setActive] = useState(isProductFavorited(productId)) // 狀態變量active，用於表示當前的收藏狀態，初始值通過調用`isProductFavorited`函數來獲取

  useEffect(() => {
    setActive(isProductFavorited(productId))
  }, [productId, isProductFavorited])

  // 切換收藏與否功能
  const toggleFavorite = async () => {
    try {
      const method = active ? 'DELETE' : 'POST'

      // restful api
      // http://localhost:3005/api/prodcust/fav
      // POST / DELETE /fav
      // POST add-fav
      // DELETE remove-fav

      const response = await fetch(
        `http://localhost:3005/api/products/${
          method === 'POST' ? 'add-fav' : 'remove-fav'
        }/${productId}`, // productID ==> undefined
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
        console.log(data) // 後端響應

        if (method === 'DELETE') {
          // 移除收藏
          setProductFavorites((currentFavorites) =>
            currentFavorites.filter((product) => product.id !== productId)
          )
        } else {
          if (data.product) {
            setProductFavorites((currentFavorites) => [
              ...currentFavorites,
              data.product,
            ])
          }
        }

        await fetchFavorites()

        // 顯示成功提示
        Swal.fire({
          title: 'Success',
          text: `成功${
            method === 'POST' ? '新增' : '移除'
          } product_id=${productId}的商品`,
          icon: 'success',
          iconColor: '#68A392',
          confirmButtonColor: '#68A392',
          customClass: {
            popup: 'rounded-xl',
            confirmButton: 'w-[100px]',
          },
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
        text: error.message || '無法更新商品收藏狀態。',
        icon: 'error',
        iconColor: '#FFC1B4',
        confirmButtonColor: '#FFC1B4',
      })
    }
  }

  // 根據傳入的 opacity 動態設定透明度類別
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
