import { useState, useEffect } from 'react'

// nextUI
import Image from 'next/image'
import { Input, Button } from '@nextui-org/react'
import { Link } from '@nextui-org/react'
import { Card, Select, SelectItem } from '@nextui-org/react'
import {
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'

// stepper
import { Stepper } from 'react-dynamic-stepper'
import { MyButton } from '@/components/btn/mybutton'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import flower from '@/assets/flower-2.jpeg'

// Signup Page
export default function Page() {
  // stepper
  const steps = [
    {
      header: {
        label: '',
      },
      // content: <div>First step content</div>,
      isError: false,
      isWarning: false,
      isComplete: true,
    },
    {
      header: {
        label: '',
      },
      // content: <div>Second step content</div>,
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: true,
    },
    {
      header: {
        label: '',
      },
      // content: <div>Third step content</div>,
      isError: false,
      isComplete: false,
    },
  ]

  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const [current, setCurrent] = useState(0)
  const routeName = 'signup'

  return (
    <DefaultLayout activePage={routeName}>
      {
        <>
          {/* main的東西 */}
          <div className="py-8 flex justify-center items-center">
            <Card className="flex flex-row-reverse  max-w-[950px] w-[950px] max-h-[600px] h-[600px] shadow-lg">
              {/* Form */}
              <div className="w-1/2 h-full flex flex-col items-center px-10 py-12">
                <h1 className="text-3xl mb-12 mt-14 ">會員註冊</h1>
                <form className="flex flex-col space-y-12 w-full">
                  <Input
                    // startContent={<CiMail className="text-default-400" />}
                    labelPlacement="outside"
                    placeholder="請輸入您的電郵"
                    type="email"
                    label="電子郵件"
                    isRequired
                  />
                  <Input
                    // startContent={<LockKeyhole className="text-default-400" />}
                    labelPlacement="outside"
                    type={isVisible ? 'text' : 'password'}
                    label="密碼"
                    placeholder="請輸入密碼"
                    isRequired
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="submit"
                        onClick={toggleVisibility}
                      >
                        {/* {isVisible ? (
                          <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        )} */}
                      </button>
                    }
                  />
                  <Input
                    // startContent={<CiMail className="text-default-400" />}
                    labelPlacement="outside"
                    placeholder="請輸入姓名"
                    type="text"
                    label="姓名"
                    isRequired
                  />
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
                  <div className="w-full flex justify-center gap-4">
                    <Link href="/member/login">
                      <MyButton
                        color="primary"
                        size="xl"
                        isOutline
                        className="w-full"
                      >
                        回登入頁面
                      </MyButton>
                    </Link>

                    <MyButton color="primary" size="xl" className="w-full">
                      註冊
                    </MyButton>
                  </div>
                </form>
              </div>
              {/* Banner Image */}
              <div className="w-1/2 h-full">
                <Image
                  width={1000}
                  height={600}
                  src={'/assets/about/store/store03.jpg'}
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
