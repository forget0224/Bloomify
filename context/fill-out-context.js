import React, { createContext, useState, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/use-localStorage'
const FillOutContext = createContext()

export const FillOutProvider = ({ children }) => {
  const [fillOutDetails, setFillOutDetails] = useLocalStorage(
    'fillOutDetails',
    {
      senderName: '',
      senderNumber: '',
      senderEmail: '',
      recipientName: '', // 收件人姓名
      recipientNumber: '', // 聯絡電話
      deliveryOption: '', // 運送選項
      deliveryShipping: 0,
      deliveryAddress: '',
      deliveryDate: '',
      deliveryTime: '',
      couponCode: '', // 優惠券代碼
      paymentMethod: '', // 付款方式
      invoiceOption: '', // 發票
      mobileBarcode: '',
      total: 0,
    }
  )
  console.log(fillOutDetails)

  return (
    <FillOutContext.Provider value={{ fillOutDetails, setFillOutDetails }}>
      {children}
    </FillOutContext.Provider>
  )
}

// 自定義hook以方便使用Context
export const useFillOut = () => useContext(FillOutContext)
