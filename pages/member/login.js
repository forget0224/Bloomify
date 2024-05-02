import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import useFirebase from '@/hooks/use-firebase'
import { useRouter } from 'next/router'

// sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// nextUI
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'

// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'

// icon
import { PiEye } from 'react-icons/pi'
import { PiEyeClosed } from 'react-icons/pi'
import { FcGoogle } from 'react-icons/fc'

// 解析accessToken用的函式
// JWT 的範例：xxxxx.yyyyy.zzzzz (Header、Payload 和 Signature)
export const parseJwt = (token) => {
  // 從 token 中提取 Payload 部分
  const base64Payload = token.split('.')[1]
  console.log(base64Payload)
  // 使用 Base64 解碼 Payload
  const payload = Buffer.from(base64Payload, 'base64')
  console.log(payload)
  // 將 Payload 轉換成 JSON 格式
  return JSON.parse(payload.toString())
}

// Login
export default function Login() {
  const [activePage, setActivePage] = useState('member')

  // 登入狀態
  const { auth, login } = useAuth()

  // loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { loginGoogleRedirect, initApp } = useFirebase()

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)
    // {providerId: 'google.com', uid: '118425329663792098351', displayName: 'Bloomify', email: 'bloomify0510@gmail.com', phoneNumber: null,…}

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (auth.isAuth) return

    // 向伺服器進行登入動作
    const res = await fetch('http://localhost:3005/api/share-google-login', {
      credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(providerData),
    })
    console.log(res.data)

    // const res = await googleLogin(providerData)
    // console.log(res.data)

    const data = await res.json()
    console.log(data)

    if (data.status === 'success') {
      // 設定全域的context會員登入
      login()
      // 出現登入成功對話訊息盒
      notify('成功登入')
      // 導向到會員個人資料頁
      setTimeout(() => {
        router.push('/center')
      }, 1500)
    } else {
      // 登入失敗，顯示錯誤訊息
      console.error('登入失敗，後端回應:', data)
    }
  }

  // 網址
  const router = useRouter()

  // 密碼隱藏顯示切換
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  // 帳號密碼
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  // 輸入帳號密碼
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // 表單送出
  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()
    // 確認是否有抓到 user
    console.log(user)

    // 最後檢查完全沒問題才送到伺服器(ajax/fetch)
    const res = await fetch('http://localhost:3005/api/share-members/login', {
      credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })

    const data = await res.json()
    console.log(data)

    if (data.status === 'success') {
      // 登入成功，可以在這裡處理成功登入的相關操作，例如跳轉頁面或顯示成功訊息
      console.log('登入成功，後端回應:', data)

      const user = parseJwt(data.data.accessToken)
      // {id: 1, username: 'herry@test.com', iat: 1713370273, exp: 1713629473}
      console.log(user)
      // 設定全域的context會員登入
      login(user)
      // 出現登入成功對話訊息盒
      notify('成功登入')
      // 導向到會員個人資料頁
      setTimeout(() => {
        // router.push('/center')
        window.location.href = '/center'
      }, 1500)
    } else {
      // 登入失敗，顯示錯誤訊息
      console.error('登入失敗，後端回應:', data)
    }
  }

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

  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }

  useEffect(() => {
    // 已在登入狀態時，導向center頁面
    if (auth.isAuth) {
      router.push('/center')
    }
  }, [auth.isAuth, router])
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* main的東西 */}
          <div className="py-8 flex justify-center items-center w-full h-full">
            <Card className="w-full h-full flex flex-col-reverse mx-4 lg:flex lg:flex-row lg:max-w-[950px] lg:max-h-[600px] shadow-lg">
              {/* <Card className="flex flex-row  max-w-[950px] w-[950px] max-h-[600px] h-[600px] shadow-lg"> */}
              {/* Form */}
              <div className="w-full lg:w-1/2 h-full flex flex-col items-center px-10 py-12">
                <h1 className="text-3xl mb-10 mt-10">會員登入</h1>
                <form
                  className="flex flex-col space-y-12 w-full "
                  onSubmit={handleSubmit}
                >
                  <Input
                    // input 要設定name
                    name="username"
                    label="帳號"
                    labelPlacement="outside"
                    placeholder="請輸入您的信箱"
                    type="text"
                    value={user.username}
                    onChange={handleFieldChange}
                    isRequired
                    className={{ ...inputStyles }}
                  />
                  <Input
                    name="password"
                    type={isVisible ? 'text' : 'password'}
                    label="密碼"
                    labelPlacement="outside"
                    placeholder="請輸入密碼"
                    value={user.password}
                    onChange={handleFieldChange}
                    isRequired
                    className={{ ...inputStyles }}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <PiEye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <PiEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                  <MyButton className="bg-primary-100 text-white" type="submit">
                    登入
                  </MyButton>
                </form>
                <button
                  className="w-full py-2 mt-8 border-2 text-2xl cursor-pointer flex justify-center items-center rounded-[30px] text-small hover:bg-gray-100"
                  onClick={() => loginGoogleRedirect()}
                >
                  <FcGoogle fontSize={20} />
                  <div className="mx-2">Google登入</div>
                </button>
                <p className="mt-4 text-tertiary-gray-100">
                  尚未成為會員嗎？
                  <Link
                    href="/member/register"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    會員註冊
                  </Link>
                </p>
              </div>
              {/* Banner Image */}
              <div className="w-full lg:w-1/2 h-full">
                <Image
                  width={633}
                  height={759}
                  src={'/assets/member/member_login.jpg'}
                  alt="flower"
                  className="object-center size-full"
                />
              </div>
            </Card>
          </div>
        </>
      }
    </DefaultLayout>
  )
}
