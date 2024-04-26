import { useState } from 'react'
import { useRouter } from 'next/router'

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

// icon
import { PiEye } from 'react-icons/pi'
import { PiEyeClosed } from 'react-icons/pi'

// Register
export default function Register() {
  const [activePage, setActivePage] = useState('register')

  // 帳號密碼
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  // 網址
  const router = useRouter()

  // 密碼toggle切換
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

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
    const res = await fetch(
      'http://localhost:3005/api/share-members/register',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(user),
      }
    )
    const data = await res.json()
    console.log(data)

    if (data.status === 'success') {
      // 登入成功，可以在這裡處理成功登入的相關操作，例如跳轉頁面或顯示成功訊息
      console.log('註冊成功，後端回應:', data)
      notify('註冊成功')
      // 導向到會員個人資料頁
      setTimeout(() => {
        router.push('/member/login')
      }, 1500)
    }
  }

  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* main的東西 */}
          <div className="py-8 flex justify-center items-center w-full h-full">
            <Card className="w-full h-full flex flex-col  mx-4 lg:flex  lg:flex-row-reverse lg:max-w-[950px] lg:max-h-[600px] shadow-lg">
              {/* <Card className="flex flex-row-reverse  max-w-[950px] w-[950px] max-h-[600px] h-[600px] shadow-lg"> */}
              {/* Form */}
              <div className="w-full lg:w-1/2 h-full flex flex-col items-center px-10 py-12">
                <h1 className="text-3xl mb-12 mt-14">會員註冊</h1>
                <form
                  className="flex flex-col space-y-12 w-full"
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
                  {/* <Input
                    // startContent={<CiMail className="text-default-400" />}
                    labelPlacement="outside"
                    placeholder="請輸入姓名"
                    type="text"
                    label="姓名"
                    isRequired
                  /> */}
                  {/* <div className="flex flex-row space-x-4">
                    <Select
                      labelPlacement="outside"
                      placeholder="請選擇縣市"
                      label="收件地址"
                      isRequired
                    >
                      <SelectItem key="taipei" value="taipei">
                        台北市
                      </SelectItem>
                      <SelectItem key="newtaipei" value="newtaipei">
                        新北市
                      </SelectItem>
                      <SelectItem key="taichung" value="taichung">
                        台中市
                      </SelectItem>
                      <SelectItem key="kaohsiung" value="kaohsiung">
                        高雄市
                      </SelectItem>
                    </Select>

                    <Select placeholder="請選擇鄉鎮市區">
                      <SelectItem key="datong" value="datong">
                        大同區
                      </SelectItem>
                      <SelectItem key="zhongshan" value="zhongshan">
                        中山區
                      </SelectItem>
                      <SelectItem key="zhongzheng" value="zhongzheng">
                        中正區
                      </SelectItem>
                      <SelectItem key="daan" value="daan">
                        大安區
                      </SelectItem>
                    </Select>
                  </div>
                  <Input placeholder="請填寫街道地址" type="text" /> */}
                  {/* button */}
                  <div className="w-full flex justify-around gap-2">
                    <Link href="/member/login">
                      <MyButton
                        color="primary"
                        size="xl"
                        isOutline
                        className="lg:w-full  "
                      >
                        登入頁面
                      </MyButton>
                    </Link>

                    <MyButton
                      color="primary"
                      size="xl"
                      className=" bg-primary-100 text-white lg:w-full "
                      type="submit"
                    >
                      會員註冊
                    </MyButton>
                  </div>
                </form>
              </div>
              {/* Banner Image */}
              <div className="w-full lg:w-1/2 h-full">
                <Image
                  width={1000}
                  height={600}
                  src={'/assets/member/member_register.jpg'}
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
