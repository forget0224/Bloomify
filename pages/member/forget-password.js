import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useInterval from '@/hooks/use-interval'

import Head from 'next/head'

// sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// nextUI
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { Link } from '@nextui-org/react'
import { Card, Select, SelectItem } from '@nextui-org/react'

// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'

// Register
export default function Register() {
  const [activePage, setActivePage] = useState('forget-password')

  // 網址
  const router = useRouter()

  //  SweetAlert2 彈窗
  const MySwal = withReactContent(Swal)

  // SweetAlert2 彈窗設定
  const notify1 = (msg) => {
    MySwal.fire({
      //position: "top-end",
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const notify2 = (msg) => {
    MySwal.fire({
      //position: "top-end",
      icon: 'error',
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

  // otp
  const [username, setUserName] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [disableBtn, setDisableBtn] = useState(false)

  // 錯誤訊息
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // 倒數計時 countdown use
  const [count, setCount] = useState(60) // 60s
  const [delay, setDelay] = useState(null) // delay=null可以停止, delay是數字時會開始倒數

  // 倒數計時 countdown use
  useInterval(() => {
    setCount(count - 1)
  }, delay)
  // 倒數計時 countdown use
  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
      setDisableBtn(false)
    }
  }, [count])

  const validateEmail = (username) => {
    // 使用正則表達式來驗證信箱格式
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(username)
  }

  const validatePassword = (password) => {
    // 檢查密碼長度是否大於5
    return password.length >= 5
  }

  const handleRequestOtpToken = async () => {
    // 驗證信箱格式
    if (!validateEmail(username)) {
      setUsernameError('請輸入有效的電子郵件地址')
      return
    }

    // 清除之前的錯誤訊息
    setUsernameError('')

    if (delay !== null) {
      notify2('錯誤 - 60s內無法重新獲得驗証碼')
      return
    }

    const res = await fetch('http://localhost:3005/api/reset-password/otp', {
      //   credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username }),
    })

    console.log(username)
    console.log(res)
    // 除錯用
    console.log(res.data)

    if (res.status === 200) {
      notify1('資訊 - 驗証碼已寄送到電子郵件中')
      setCount(60) // 倒數 60秒
      setDelay(1000) // 每 1000ms = 1s 減1
      setDisableBtn(true)
    } else {
      //   notify2(`錯誤 - ${res.data.message}`)
    }
  }

  // 處理重設密碼用
  const handleResetPassword = async () => {
    // 驗證密碼長度
    if (!validatePassword(password)) {
      setPasswordError('請輸入5位數以上的密碼')
      return
    }

    // 清除之前的錯誤訊息
    setPasswordError('')

    const res = await fetch('http://localhost:3005/api/reset-password/reset', {
      credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, token, password }),
    })

    console.log({ token })
    // 除錯用
    console.log(res.data)

    if (res.status === 200) {
      notify1('資訊 - 密碼已成功修改')
      router.push('/member/login')
    } else {
      //   notify2(`錯誤 - ${res.data.message}`)
    }
  }

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <Head>
            <title>忘記密碼</title>
          </Head>
          {/* main的東西 */}
          <div className="mt-12 py-8 flex justify-center items-center w-full h-full bg-secondary-300">
            <Card className="w-full h-full flex flex-col  mx-4 lg:flex  lg:flex-row-reverse lg:max-w-[950px] lg:max-h-[600px] shadow-lg">
              {/* <Card className="flex flex-row-reverse  max-w-[950px] w-[950px] max-h-[600px] h-[600px] shadow-lg"> */}
              <div className="w-full lg:w-1/2 h-full flex flex-col items-center px-10 py-12">
                <h1 className="text-3xl mb-10 mt-10">忘記密碼</h1>
                <div className="flex flex-col space-y-14 w-full mt-2">
                  <div className="flex gap-2">
                    <div>
                      <Input
                        // input 要設定name
                        name="username"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="電子郵件信箱"
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className={{ ...inputStyles }}
                      />
                      {usernameError && (
                        <span className="text-xs text-red-500 pl-2">
                          {usernameError}
                        </span>
                      )}
                    </div>

                    <MyButton
                      className="bg-primary-300 text-black text-xs mt-6"
                      onClick={handleRequestOtpToken}
                      disabled={disableBtn}
                    >
                      {delay ? count + '秒' : '取得驗証碼'}
                    </MyButton>
                  </div>
                  <Input
                    // input 要設定name
                    name="otp"
                    label="otp驗證碼:"
                    labelPlacement="outside"
                    placeholder="請輸入驗證碼"
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className={{ ...inputStyles }}
                  />
                  <div>
                    <Input
                      // input 要設定name
                      name="otp"
                      label="新密碼:"
                      labelPlacement="outside"
                      placeholder="請輸入5位數密碼"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={{ ...inputStyles }}
                    />
                    {passwordError && (
                      <span className="text-xs text-red-500 pl-2">
                        {passwordError}
                      </span>
                    )}
                  </div>

                  {/* button */}
                  <div className="w-full gap-2">
                    <MyButton
                      color="primary"
                      size="xl"
                      className=" bg-primary-100 text-white w-full "
                      type="button"
                      onClick={handleResetPassword}
                    >
                      重設密碼
                    </MyButton>
                  </div>
                </div>
              </div>
              {/* Banner Image */}
              <div className="w-full lg:w-1/2 h-full">
                <Image
                  width={1000}
                  height={600}
                  src={'/assets/member/member_forget_password.jpg'}
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
