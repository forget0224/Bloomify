import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/use-localStorage'
const FillOutContext = createContext()

export const FillOutProvider = ({ children }) => {
  const [fillOutDetails, setFillOutDetails] = useLocalStorage(
    'fillOutDetails',
    {
      senderName: '',
      senderNumber: '',
      senderEmail: '',
      recipientName: '',
      recipientNumber: '',
      deliveryOption: '',
      deliveryShipping: 0,
      deliveryAddress: '',
      deliveryDate: '',
      deliveryTime: '',
      couponCode: '',
      discount: '',
      paymentMethod: '',
      invoiceOption: '',
      mobileBarcode: '',
      total: 0,
    }
  )
  // console.log(fillOutDetails)

  return (
    <FillOutContext.Provider value={{ fillOutDetails, setFillOutDetails }}>
      {children}
    </FillOutContext.Provider>
  )
}

// 自定義hook以方便使用Context
export const useFillOut = () => useContext(FillOutContext)
