import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'

// sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Sidebar() {
  // 判斷鏈接是否active
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  // 登出
  const { auth, logout } = useAuth()

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

  // 處理登出
  const handleLogout = async () => {
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

  return (
    <>
      <div className="hidden md:flex flex-col gap-8 lg:visible w-2/12 h-fit p-6 lg:p-10 border-1 rounded-xl border-tertiary-gray-200">
        {/* 會員資訊 start */}
        <div className="flex flex-row gap-2 items-center">
          <Image
            key={''}
            src="/assets/shop/products/flowers/pink_Gladiola_0.jpg"
            alt=""
            className="w-8 h-8 md:w-8 md:h-8 rounded-full"
            width={40}
            height={40}
          />
          <p className="text-xl text-tertiary-black font-medium hidden lg:block">
            {auth.isAuth ? auth.userData.name : auth.username}
          </p>
        </div>
        {/* 會員資訊 end */}

        {/* custom start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-base text-tertiary-gray-100 border-b-1 pb-2">
            代客送花
          </p>
          <Link
            href="/center/custom-order"
            className={`hover:text-primary-100 ${
              isActive('/custom/center-custom/custom-order')
                ? 'text-primary-100'
                : ''
            }`}
          >
            我的訂單
          </Link>
          <Link
            href="/center/favorite"
            className={`hover:text-primary-100 ${
              isActive('/custom/center-custom/favorite')
                ? 'text-primary-100'
                : ''
            }`}
          >
            收藏花束
          </Link>
        </div>
        {/* custom end */}

        {/* shop start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            線上商城
          </p>
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
              isActive('/center/shop-favorite') ? 'text-primary-100' : ''
            }`}
          >
            收藏商品
          </Link>
        </div>
        {/* shop end */}

        {/* course start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            合作課程
          </p>
          <Link
            href="/center/course-order"
            className={`hover:text-primary-100 ${
              isActive('/center/course-order') ? 'text-primary-100' : ''
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
              isActive('/center/course-favorite') ? 'text-primary-100' : ''
            }`}
          >
            收藏課程
          </Link>
        </div>
        {/* course end */}

        {/* intro start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            花占卜
          </p>
          <Link
            href="/center/game-history"
            className={`hover:text-primary-100 ${
              isActive('/center/game-history') ? 'text-primary-100' : ''
            }`}
          >
            占卜紀錄
          </Link>
        </div>
        {/* intro end */}

        {/* member start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            我的帳戶
          </p>
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
          <button onClick={handleLogout} className={'hover:text-primary-100'}>
            登出
          </button>
        </div>
        {/* member end */}
      </div>
    </>
  )
}
