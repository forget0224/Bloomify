import { useState } from 'react'

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

// Login
export default function Login() {
  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }

  // 密碼toggle切換
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const [activePage, setActivePage] = useState('member')

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* main的東西 */}
          <div className="py-8 flex justify-center items-center">
            <Card className="flex flex-row  max-w-[950px] w-[950px] max-h-[600px] h-[600px] shadow-lg">
              {/* Form */}
              <div className="w-1/2 h-full flex flex-col items-center px-10 py-12">
                <h1 className="text-3xl mb-12 mt-14">會員登入</h1>
                <form className="flex flex-col space-y-12 w-full">
                  <Input
                    labelPlacement="outside"
                    placeholder="請輸入您的信箱"
                    type="email"
                    label="電子信箱"
                    isRequired
                    className={{ ...inputStyles }}
                  />
                  <Input
                    labelPlacement="outside"
                    type={isVisible ? 'text' : 'password'}
                    label="密碼"
                    placeholder="請輸入密碼"
                    isRequired
                    className={{ ...inputStyles }}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="submit"
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
                <p className="mt-8 text-tertiary-gray-100">
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
              <div className="w-1/2 h-full">
                <Image
                  width={1000}
                  height={600}
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
