import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'

import Head from 'next/head'

// nextUI
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'

// sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// 定義要在此頁呈現/編輯的會員資料初始物件
const initUserProfile = {
  name: '',
  username: '',
  phone: '',
  city: '',
  district: '',
  address: '',
  join_date: '',
}

export default function Profile() {
  const [activePage, setActivePage] = useState('profile')

  const { auth, userInfo, setUserInfo } = useAuth()

  const [userProfile, setUserProfile] = useState(initUserProfile)

  // 錯誤訊息
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  })

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

  // auth中只能獲得id和帳號
  console.log(auth)
  console.log(auth.userData)
  // {id: 1, username: 'herry@test.com', iat: 1713511167, exp: 1713770367}
  console.log(auth.userData.id)

  // 由id從後端獲取登入會員資料-phone.address.avatar......
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
    console.log(data.data)
    // user: {id: 1, name: '哈利', username: 'herry@test.com', phone: '0906102808', city: '台北市', …}

    if (data.status === 'success') {
      // 以下為同步化目前後端資料庫資料，與這裡定義的初始化會員資料物件的資料
      const dbUser = data.data.user
      const dbUserProfile = { ...initUserProfile }

      // key => name, username, ......
      for (const key in dbUserProfile) {
        if (Object.hasOwn(dbUser, key)) {
          // dbUser[key] 是真值（即不是 null、undefined、false 等等），則返回 dbUser[key] 的值，否則，返回空字串 ''
          // 這裡要將null值的預設值改為空字串 ''
          dbUserProfile[key] = dbUser[key] || ''
        }
      }

      // 設定到狀態中
      setUserProfile(dbUserProfile)
      setUserInfo({ ...userInfo, avatar: dbUser.avatar, name: dbUser.name })
    }
  }

  // 會員認證成功 => 取得會員資料顯示
  // auth載入完成後向資料庫要會員資料
  useEffect(() => {
    if (auth.isAuth) {
      getUserData(auth.userData.id)
    }
    // eslint-disable-next-line
  }, [auth])

  // 輸入一般資料用
  const handleFieldChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value })

    // 清除錯誤訊息
    setErrors({ ...errors, [e.target.name]: '' })
  }

  // 大頭貼更換
  const handleFileChange = async (e) => {
    // 選擇檔案
    const file = e.target.files[0]
    // 創建 FormData 對象，用於上傳檔案
    const formData = new FormData()
    formData.append('avatar', file) // 將選擇的圖片檔案添加到 FormData 中，欄位名稱為 avatar

    // 使用 fetch 發送 POST 請求到後端上傳圖片
    const response = await fetch(
      'http://localhost:3005/api/share-members/upload-avatar',
      {
        method: 'POST',
        credentials: 'include',
        body: formData, // 將 FormData 物件作為請求主體
      }
    )

    const data = await response.json() // 解析後端返回的 JSON 資料
    console.log(data)

    // 如果圖片上傳成功，則更新使用者的頭像資料
    if (data.status === 'success') {
      // 更新 userProfile 中的 avatar 屬性為新上傳的圖片檔名
      // setAvatar(data.data.avatar)
      notify1('編輯成功')
      setUserInfo({ ...userInfo, avatar: data.data.avatar })
    } else {
      notify2('沒有更改')
    }
  }

  // 表單送出
  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    // 驗證手機號碼
    const phoneRegex = /^09\d{8}$/
    if (!phoneRegex.test(userProfile.phone)) {
      setErrors({
        ...errors,
        phone: '請輸入正確的手機號碼格式 09xxxxxxxx',
      })
      return // 中止表單送出
    }

    // 送到伺服器進行更新
    // 將 userProfile 物件中的 avatar 屬性解構賦值給 avatar 變數，並將其餘的屬性解構賦值給 user 物件。
    const { ...user } = userProfile
    const res = await fetch(
      `http://localhost:3005/api/share-members/center/${auth.userData.id}/profile`,
      {
        credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(user), // 將使用者資料轉換成 JSON 字串傳送
      }
    )
    const data = await res.json() // 將回傳的 Response 物件轉換成 JSON 格式
    console.log(data)
    if (data.status == 'success') {
      notify1('編輯成功')
      setUserInfo({ ...userInfo, name: data.data.user.name })
    } else {
      notify2('沒有更改')
    }

    // user: {id: 1, name: '哈利fffxxs', username: 'herry@test.com', phone: '0906
  }

  // 將日期字串轉換成特定格式的函式
  const formatDate = (dateString) => {
    // 建立 Date 物件
    const date = new Date(dateString)

    // 取得年、月、日資訊
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份需補零
    const day = date.getDate().toString().padStart(2, '0') // 日需補零

    // 拼接成想要的日期格式
    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
  }

  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }

  return (
    <DefaultLayout activePage={activePage}>
      <Head>
        <title>個人資料 | 會員中心</title>
      </Head>
      {
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 invisible md:visible">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem color="primary">個人資料</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          {/* 主要內容 */}
          <div className="flex flex-row w-full justify-center">
            {/* 側邊欄 */}
            <Sidebar />
            {/* 會員資料 */}
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10 ">
              <div className="w-full max-w-2xl flex flex-col items-center mx-auto lg:px-10">
                <div className="text-xl lg:text-3xl mb-6 mt-4">個人資訊</div>
                {/* 大頭貼位置 */}
                <div className="image-upload flex flex-col items-center">
                  <label htmlFor="file-input">
                    <img
                      src={userInfo.avatar}
                      // src={`http://localhost:3005/member/avatar/${
                      //   userInfo.avatar === null
                      //     ? DEFAULT_IMAGE
                      //     : userInfo.avatar
                      // }`}
                      alt="使用者大頭貼"
                      width="200"
                      height="200"
                      className="w-60 h-60 rounded-full"
                    />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    name="file"
                    className="invisible"
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                  <p className="mb-2">點按頭像可以選擇新照片</p>
                </div>
                {/* 表單 */}
                <form
                  className="flex flex-col space-y-12 
                   w-full"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Input
                      // input 要設定name
                      name="name"
                      label="姓名"
                      labelPlacement="outside"
                      placeholder="姓名"
                      type="text"
                      value={userProfile.name}
                      onChange={handleFieldChange}
                      isRequired
                      className={{ ...inputStyles }}
                    />
                  </div>
                  <div>
                    <Input
                      // input 要設定name
                      name="username"
                      label="帳號"
                      labelPlacement="outside"
                      placeholder="帳號"
                      type="text"
                      value={userProfile.username}
                      // onChange={handleFieldChange}
                      disabled
                      className={{ ...inputStyles }}
                    />
                  </div>
                  <div>
                    <Input
                      // input 要設定name
                      name="phone"
                      label="手機"
                      labelPlacement="outside"
                      placeholder="09xxxxxxxx"
                      type="text"
                      value={userProfile.phone}
                      onChange={handleFieldChange}
                      isRequired
                      maxLength={10}
                      className={{ ...inputStyles }}
                    />
                    {errors.phone && (
                      <span className="text-xs text-red-500 pl-2">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-16">
                    <Input
                      // input 要設定name
                      name="city"
                      label="城市"
                      labelPlacement="outside"
                      placeholder="城市"
                      type="text"
                      value={userProfile.city}
                      onChange={handleFieldChange}
                      isRequired
                      maxLength={3} // 設置最大字元數為三個字
                      className={{ ...inputStyles }}
                    />
                    <Input
                      // input 要設定name
                      name="district"
                      label="鄉鎮市區"
                      labelPlacement="outside"
                      placeholder="鄉鎮市區"
                      type="text"
                      value={userProfile.district}
                      onChange={handleFieldChange}
                      maxLength={3} // 設置最大字元數為三個字
                      isRequired
                      className={{ ...inputStyles }}
                    />
                  </div>
                  <div>
                    <Input
                      // input 要設定name
                      name="address"
                      label="街道名稱"
                      labelPlacement="outside"
                      placeholder="街道名稱"
                      type="text"
                      value={userProfile.address}
                      onChange={handleFieldChange}
                      isRequired
                      maxLength={50} // 設置最大字元數
                      className={{ ...inputStyles }}
                    />
                  </div>
                  <div>
                    <Input
                      // input 要設定name
                      name="join_date"
                      label="加入日期"
                      labelPlacement="outside"
                      placeholder="日期"
                      type="text"
                      value={formatDate(userProfile.join_date)}
                      // onChange={handleFieldChange}
                      disabled
                      className={{ ...inputStyles }}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      className="bg-secondary-100 text-black "
                      type="submit"
                    >
                      編輯
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CenterLayout>
      }
    </DefaultLayout>
  )
}
