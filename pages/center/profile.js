import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'

// nextUI
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'

// 定義要在此頁呈現/編輯的會員資料初始物件
const initUserProfile = {
  name: '',
  username: '',
  phone: '',
  avatar: '',
  city: '',
  district: '',
  address: '',
  join_date: '',
}

export default function Profile() {
  const [activePage, setActivePage] = useState('profile')

  const { auth } = useAuth()
  // const [userProfile, setUserProfile] = useState(initUserProfile)
  // const [hasProfile, setHasProfile] = useState(false)
  // const [selectedFile, setSelectedFile] = useState(null)

  // 獲取登入會員資料
  // const getUserData = async (id = 0) => {
  //   const res = await fetch(
  //     `http://localhost:3005/api/share-members/center/${id}/profile`,
  //     {
  //       credentials: 'include', // 設定cookie需要，有作授權或認証時都需要加這個
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'GET',
  //       body: JSON.stringify(auth.userData),
  //     }
  //   )
  //   console.log(res.data)
  // }

  // // auth載入完成後向資料庫要會員資料
  // useEffect(() => {
  //   if (auth.isAuth) {
  //     getUserData(auth.userData.id)
  //   }
  //   // eslint-disable-next-line
  // }, [auth])

  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }

  // 表單送出
  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()
  }

  return (
    <DefaultLayout activePage={activePage}>
      {
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 invisible md:visible">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>個人資料</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          {/* 主要內容 */}
          <div className="flex flex-row w-full justify-center">
            {/* 側邊欄 */}
            <Sidebar />
            {/* 會員資料 */}
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10 ">
              <div>
                <Title text="基本資料" />
              </div>
              <hr />
              <div className="w-full max-w-2xl flex flex-col items-center mx-auto lg:px-10">
                <h1 className="text-xl lg:text-3xl mb-12 mt-14">個人資訊</h1>
                {/* 大頭貼位置 */}
                <div className="image-upload flex flex-col items-center">
                  <label>
                    <img src="" alt="" width="200" height="200" />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    name="file"
                    className="invisible"
                    // onChange={handleFileChang}
                  />
                </div>
                {/* 表單 */}
                <form
                  className="flex flex-col space-y-16 
                   w-full"
                  onSubmit={handleSubmit}
                >
                  <Input
                    // input 要設定name
                    name="name"
                    label="姓名"
                    labelPlacement="outside"
                    placeholder="姓名"
                    type="text"
                    // value={auth.username}
                    // onChange={handleFieldChange}
                    isRequired
                    className={{ ...inputStyles }}
                  />
                  <Input
                    // input 要設定name
                    name="username"
                    label="帳號"
                    labelPlacement="outside"
                    placeholder="帳號"
                    type="text"
                    // value={user.username}
                    // onChange={handleFieldChange}
                    disabled
                    className={{ ...inputStyles }}
                  />
                  <Input
                    // input 要設定name
                    name="phone"
                    label="手機"
                    labelPlacement="outside"
                    placeholder="手機號碼"
                    type="text"
                    // value={user.username}
                    // onChange={handleFieldChange}
                    isRequired
                    className={{ ...inputStyles }}
                  />
                  <Input
                    // input 要設定name
                    name="city"
                    label="城市"
                    labelPlacement="outside"
                    placeholder="城市"
                    type="text"
                    // value={user.username}
                    // onChange={handleFieldChange}
                    isRequired
                    className={{ ...inputStyles }}
                  />
                  <Input
                    // input 要設定name
                    name="district"
                    label="鄉鎮市區"
                    labelPlacement="outside"
                    placeholder="鄉鎮市區"
                    type="text"
                    // value={user.username}
                    // onChange={handleFieldChange}
                    isRequired
                    className={{ ...inputStyles }}
                  />
                  <Input
                    // input 要設定name
                    name="address"
                    label="街道名稱"
                    labelPlacement="outside"
                    placeholder="街道名稱"
                    type="text"
                    // value={user.username}
                    // onChange={handleFieldChange}
                    isRequired
                    className={{ ...inputStyles }}
                  />
                  <Input
                    // input 要設定name
                    name="join_date"
                    label="加入日期"
                    labelPlacement="outside"
                    placeholder="日期"
                    type="text"
                    // value={user.username}
                    // onChange={handleFieldChange}
                    disabled
                    className={{ ...inputStyles }}
                  />
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
