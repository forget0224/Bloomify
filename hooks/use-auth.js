import { createContext, useContext, useState } from 'react'

// 1. 建立context
const AuthContext = createContext(null)

// 2. 建立一個Context Provider元件
// 提供給最上層元件(_app.js)使用，把所需狀態都在這元件集中管理

export function AuthProvider({ children }) {
  // 會員初始狀態物件
  const initAuth = {
    // 代表有沒有登入中
    isAuth: false,
    // 代表會員的資料
    userData: {
      id: 0,
      username: '',
    },
  }

  // 共享狀態
  const [auth, setAuth] = useState(initAuth)

  const login = (user) => {
    setAuth({
      // 代表有沒有登入中
      isAuth: true,
      // 代表會員的資料
      userData: user,
    })
  }

  const logout = () => {
    // 恢復預設值
    setAuth(initAuth)
  }

  return (
    <AuthContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{ auth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 3. 提供一個包裝好useContext名稱，給消費者(Consumer)方便地直接呼叫使用
export const useAuth = () => useContext(AuthContext)
