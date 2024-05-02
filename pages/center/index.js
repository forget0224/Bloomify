import React, { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'

// RWD
import { Accordion, AccordionItem } from '@nextui-org/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import useFirebase from '@/hooks/use-firebase'

// sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Index() {
  const [activePage, setActivePage] = useState('shop')
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  // google登出
  const { logoutFirebase } = useFirebase()

  // 會員資訊、登出
  const { auth, logout, userInfo, setUserInfo, handleCheckAuth } = useAuth()

  //  SweetAlert2 彈窗
  const MySwal = withReactContent(Swal)

  // SweetAlert2 彈窗設定
  const notify = (msg) => {
    MySwal.fire({
      //position: "top-end",
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // 取得登入資料
  const getUserData = async () => {
    const res = await fetch(
      `http://localhost:3005/api/share-members/${auth.userData.id}`,
      {
        credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    )
    const data = await res.json() // 將回傳的 Response 物件轉換成 JSON 格式
    console.log(data)
    // user: {id: 1, name: '哈利', username: 'herry@test.com', phone: '0906102808', city: '台北市', …}

    if (data.status === 'success') {
      // 以下為同步化目前後端資料庫資料，與這裡定義的初始化會員資料物件的資料
      const dbUser = data.data.user
      const newUserInfo = { name: dbUser.name, avatar: dbUser.avatar }
      // key => name, username, ......
      if (
        newUserInfo.name !== userInfo.name ||
        newUserInfo.avatar !== userInfo.avatar
      ) {
        setUserInfo(newUserInfo)
      }
    }
  }

  // 處理登出
  const handleLogout = async () => {
    // firebase logout(注意，這並不會登出google帳號，是登出firebase的帳號)
    logoutFirebase()

    // 最後檢查完全沒問題才送到伺服器(ajax/fetch)
    const res = await fetch('http://localhost:3005/api/share-members/logout', {
      credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({}),
    })

    const data = await res.json()
    console.log(data)

    if (data.status === 'success') {
      console.log('登出成功，後端回應:', data)
      // 設定全域的context會員登出
      logout()
      // 出現登入成功對話訊息盒
      notify('已成功登出')
      // 導向到會員個人資料頁
      setTimeout(() => {
        router.push('/member/login')
      }, 2000)
    }
  }

  // 會員認證成功 => 取得會員資料顯示
  // auth載入完成後向資料庫要會員資料
  useEffect(() => {
    if (auth.isAuth && auth.userData?.id) {
      getUserData(auth.userData.id)
    }
    // eslint-disable-next-line
  }, [auth, userInfo.avatar])

  useEffect(() => {
    handleCheckAuth()
  }, [])

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <CenterLayout>
            {/* 麵包屑 */}
            <div className="hidden sm:block sm:w-full sm:py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem color="primary">會員中心</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* 主要內容 */}
            <div className="hidden sm:block sm:flex sm:flex-row sm:w-full sm:justify-center">
              {/* 側邊欄 */}
              <Sidebar />
              <div className="hidden sm:block sm:w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
                您好!歡迎來到會員中心
              </div>
            </div>

            {/* RWD start */}
            <div className="w-full h-fit px-5 mt-12 space-y-6 sm:hidden">
              {/* 會員資訊 start */}
              <div className="flex flex-col gap-2 items-center justify-center">
                <img
                  src={userInfo.avatar}
                  // src={`http://localhost:3005/member/avatar/${
                  //   userInfo.avatar === null ? DEFAULT_AVATAR : userInfo.avatar
                  // }`}
                  // src="/assets/shop/products/flowers/pink_Gladiola_0.jpg"
                  alt="使用者大頭貼"
                  className="w-20 h-20 md:w-16 md:h-16 rounded-full"
                  width={40}
                  height={40}
                />
                <p className="text-xl text-tertiary-black font-medium">
                  {auth.isAuth ? auth.userData?.name : auth.username}
                </p>
              </div>
              {/* 會員資訊 end */}
              <Accordion selectionMode="multiple">
                {/* custom start */}
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title={
                    <span className="text-tertiary-gray-100">代客送花</span>
                  }
                >
                  <div className="flex flex-col gap-4 items-center">
                    <Link
                      href="/center/custom-order"
                      className={`hover:text-primary-100 ${
                        isActive('/center/custom-order')
                          ? 'text-primary-100'
                          : ''
                      }`}
                    >
                      我的訂單
                    </Link>
                    <Link
                      href="/center/custom-favorite"
                      className={`hover:text-primary-100 ${
                        isActive('/center/custom-favorite')
                          ? 'text-primary-100'
                          : ''
                      }`}
                    >
                      收藏花束
                    </Link>
                  </div>
                </AccordionItem>
                {/* custom end */}
                {/* shop start */}
                <AccordionItem
                  key="2"
                  aria-label="Accordion 2"
                  title={
                    <span className="text-tertiary-gray-100">線上商城</span>
                  }
                >
                  <div className="flex flex-col gap-4 items-center">
                    <Link
                      href="/center/shop-order"
                      className={`hover:text-primary-100 ${
                        isActive('/center/shop-order') ? 'text-primary-100' : ''
                      }`}
                    >
                      商品訂單
                    </Link>
                    <Link
                      href="/center/shop-favorite"
                      className={`hover:text-primary-100 ${
                        isActive('/center/shop-favorite')
                          ? 'text-primary-100'
                          : ''
                      }`}
                    >
                      收藏商品
                    </Link>
                  </div>
                </AccordionItem>
                {/* shop end */}
                {/* course start */}
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  title={
                    <span className="text-tertiary-gray-100">合作課程</span>
                  }
                >
                  <div className="flex flex-col gap-4 items-center">
                    <Link
                      href="/center/course-order"
                      className={`hover:text-primary-100 ${
                        isActive('/center/course-order')
                          ? 'text-primary-100'
                          : ''
                      }`}
                    >
                      課程訂單
                    </Link>
                    <Link
                      href="/center/my-course"
                      className={`hover:text-primary-100 ${
                        isActive('/center/my-course') ? 'text-primary-100' : ''
                      }`}
                    >
                      我的課程
                    </Link>
                    <Link
                      href="/center/course-favorite"
                      className={`hover:text-primary-100 ${
                        isActive('/center/course-favorite')
                          ? 'text-primary-100'
                          : ''
                      }`}
                    >
                      收藏課程
                    </Link>
                  </div>
                </AccordionItem>
                {/* course end */}
                {/* intro start */}
                <AccordionItem
                  key="4"
                  aria-label="Accordion 4"
                  title={<span className="text-tertiary-gray-100">花占卜</span>}
                >
                  <div className="flex flex-col gap-4 items-center">
                    <Link
                      href="/center/game-history"
                      className={`hover:text-primary-100 ${
                        isActive('/center/game-history')
                          ? 'text-primary-100'
                          : ''
                      }`}
                    >
                      占卜紀錄
                    </Link>
                  </div>
                </AccordionItem>
                {/* intro end */}
                {/* member start */}
                <AccordionItem
                  key="5"
                  aria-label="Accordion 5"
                  title={
                    <span className="text-tertiary-gray-100">我的帳戶</span>
                  }
                >
                  <div className="flex flex-col gap-4 items-center">
                    <Link
                      href="/center/profile"
                      className={`hover:text-primary-100 ${
                        isActive('/center/profile') ? 'text-primary-100' : ''
                      }`}
                    >
                      個人資料
                    </Link>
                    {/* <Link
                      href="/center/coupon"
                      className={`hover:text-primary-100 ${
                        isActive('/center/coupon') ? 'text-primary-100' : ''
                      }`}
                    >
                      優惠券
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className={'hover:text-primary-100'}
                    >
                      登出
                    </button>
                  </div>
                </AccordionItem>
                {/* member end */}
              </Accordion>
            </div>

            {/* RWD end */}
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
