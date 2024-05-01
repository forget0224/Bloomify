import { createContext, useContext, useState } from 'react'

// 1. 建立context
const LoaderContext = createContext(null)

// 2. 建立一個Context Provider元件
// 提供給最上層元件(_app.js)使用，把所需狀態都在這元件集中管理
export function LoaderProvider({ children }) {
  // 共享狀態，允許值為 'dark' | 'light'
  const [isLoading, setIsLoading] = useState(true)

  const close = (sec = 1) => {
    console.log('calling close')
    setTimeout(() => {
      setIsLoading(false)
    }, sec * 1000)
  }

  const open = () => {
    setIsLoading(true)
  }


  return (
    <LoaderContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{ isLoading, close, open }}
    >
      {children}
    </LoaderContext.Provider>
  )
}

// 3. 提供一個包裝好useContext名稱，給消費者(Consumer)方便地直接呼叫使用
export const useLoader = () => useContext(LoaderContext)
