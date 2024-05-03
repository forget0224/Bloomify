import React, { createContext, useState, useEffect, useContext } from 'react'
import useLocalStorage from '../hooks/use-localStorage'
import { toast } from 'react-hot-toast'

const CourseCartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalSubtotal: 0,
  totalCartProducts: 0,
})

export const CourseCartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('courseCart', [])

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
      toast.success(`此堂課程已在您的購物車中`)
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
      store: courseDetails.store.store_name,
      period: selectedDatetime.period, // 選擇的期數
      date: selectedDatetime.date, // 期數對應的日期
      startTime: selectedDatetime.start_time, // 期數對應的開始時間
      endTime: selectedDatetime.end_time, // 期數對應的結束時間
    }

    // 更新購物車狀態
    setCart([...cart, cartItem])
    toast.success(`成功加入購物車`)
  }

  // 移除課程
  // TODO:
  const removeFromCart = (courseId, coursePeriod) => {
    setCart(
      cart.filter(
        (item) => !(item.id === courseId && item.period === coursePeriod)
      )
    )
    toast.success(`成功移除課程`)
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
