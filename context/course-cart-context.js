import React, { createContext, useState, useEffect, useContext } from 'react'
import useLocalStorage from '../hooks/use-localStorage' // 確保路徑正確

const CourseCartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalSubtotal: 0,
  totalCartProducts: 0,
})

export const CourseCartProvider = ({ children }) => {
  // const [cart, setCart] = useLocalStorage('courseCart', []) // 預設是空的
  // 塞假資料試試看
  const [cart, setCart] = useLocalStorage('courseCart', [
    {
      id: '1',
      name: '花材選擇與搭配',
      image: '/assets/course/category-1/img-course-01-01.jpg',
      date: '2024-04-14 17:00',
      price: 1200,
      intro:
        '這門精心設計的課程旨在教授學員如何精準選擇和搭配花材，以創作出風格獨特且美觀的花藝作品。',
    },
    {
      id: '2',
      name: '花藝專業術語與知識',
      image: '/assets/course/category-1/img-course-02-01.jpg',
      date: '2024-04-14 17:00',
      price: 800,
      intro:
        '在花藝領域中，有許多專業術語和知識是每位花藝師都應該熟悉的。這堂課程將介紹花藝的專業術語、花卉命名、搭配原則等知識，幫助您更好地理解和應用在花藝創作中。',
    },
    // 其他假資料可以繼續添加
  ])

  useEffect(() => {
    setCart(cart)
  }, [cart])

  // 新增課程-指定資料
  const addToCart = (courseDetails, selectedPeriod) => {
    // 檢查購物車中是否已有這堂課程
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === courseDetails.id.toString() &&
        item.period === selectedPeriod
    )

    // 如果已存在，不添加到購物車，給用戶一個提示
    if (existingItemIndex !== -1) {
      alert('此堂課程已在您的購物車中。')
      return
    }

    const selectedDatetime = courseDetails.datetimes.find(
      (datetime) => datetime.period === selectedPeriod
    )
    const mainImage =
      courseDetails.images.find((image) => image.is_main)?.path || ''

    const cartItem = {
      id: courseDetails.id.toString(), // 確保 id 是字符串
      name: courseDetails.name,
      price: courseDetails.price,
      image: mainImage,
      period: selectedDatetime.period, // 選擇的期數
      date: selectedDatetime.date, // 期數對應的日期
      startTime: selectedDatetime.start_time, // 期數對應的開始時間
      endTime: selectedDatetime.end_time, // 期數對應的結束時間
    }

    // 更新購物車狀態
    setCart([...cart, cartItem])
  }

  // 移除課程
  const removeFromCart = (courseId) => {
    setCart(cart.filter((item) => item.id !== courseId))
  }

  // 清空購物車
  const clearCart = () => {
    setCart([])
  }

  // 計算課程數
  const totalCartProducts = cart.length

  // 計算總金額
  const totalSubtotal = cart.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  )

  return (
    <CourseCartContext.Provider
      // value屬性用來提供一個全局的狀態
      value={{
        cart, // 包含了購物車中所有課程的陣列，每個課程都是一個物件
        addToCart, // 新增商品
        removeFromCart, // 移除商品
        clearCart, // 清空購物車
        totalSubtotal, // 金額總計
        totalCartProducts, // 數量計算
      }}
    >
      {children}
    </CourseCartContext.Provider>
  )
}

export const useCart = () => useContext(CourseCartContext)
