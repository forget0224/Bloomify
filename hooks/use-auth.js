import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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

  const router = useRouter()

  // 檢查會員認証用
  // 每次重新到網站中，或重新整理，都會執行這個函式，用於向伺服器查詢取回原本登入會員的資料
  const handleCheckAuth = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/share-members/check',
        {
          credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
      // fetch到後端成功
      if (response.ok) {
        const data = await response.json()
        // console.log(data)
        if (data.status === 'success') {
          setAuth({
            isAuth: true,
            userData: data.data.user,
          })
        } else {
          console.log(data.message)
          // 只有在驗證未通過才重定向
          if (router.pathname.startsWith('/center')) {
            router.push('/member/login')
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setAuth(initAuth)
    }
  }

  // didMount(初次渲染)後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    // router.isReady 是一個布林值，表示路由對象是否已經初始化完成。
    // 路由對象（router）是在客戶端渲染（Client-Side Rendering，CSR）過程中加載的。
    // 當應用程序首次加載時，router 對象可能尚未初始化完成。
    if (router.isReady && !auth.isAuth) {
      handleCheckAuth()
    }
    // 下面加入auth.isAuth，是為了要在向伺服器檢查後，
    // 如果有比對到使用者未登入，就執行跳轉回登入頁面工作
  }, [router.isReady, auth.isAuth])

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
    // 登出後立即跳轉到登入頁面
    router.push('/member/login')
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
