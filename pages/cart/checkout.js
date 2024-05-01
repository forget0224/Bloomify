import { useState } from 'react'
import { Stepper } from 'react-dynamic-stepper'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import CustomCheckOut from '@/components/custom/CustomCheckOut'
import CourseCheckOut from '@/components/course/page-checkout'
import ShopCheckOut from '@/components/shop/shop-checkout'
import DefaultLayout from '@/components/layout/default-layout'

export default function Confirm() {
  const { auth } = useAuth()
  const { isAuth, user } = auth
  const [activePage, setActivePage] = useState('cart')
  const route = useRouter()
  const source = route.query.source

  // stepper
  const steps = [
    {
      header: {
        label: '購物車',
      },
      // content: <div>First step content</div>,
      isError: false,
      isWarning: false,
      isComplete: true,
    },
    {
      header: {
        label: '填寫資料',
      },
      // content: <div>Second step content</div>,
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: true,
    },
    {
      header: {
        label: '訂單確認',
      },
      // content: <div>Third step content</div>,
      isError: false,
      isComplete: false,
    },
  ]
  // const submitStepper = () => {
  //   console.log('submitted')
  // }

  //商品列表 table 樣式
  const tableStyles = {
    base: ['text-tertiary-black'],
    th: ['text-base', 'text-tertiary-gray-100'], // 表頭
    td: ['text-base', 'px-3', 'py-3'], // 表格
    wrapper: [
      'text-base',
      'shadow-none',
      'border-1',
      'border-tertiary-100',
      'rounded-xl',
    ], // 整個表格
  }

  //明細 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base', 'py-1', ''], // 表格 text-initial md:text-right
    wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'], // 整個表格
  }

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <main className="flex flex-col justify-center items-center bg-white">
            <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 md:px-0 mb-10">
              {/* steps */}
              <div className="flex flex-col w-full md:w-6/12 lg:w-4/12 gap-14 mt-6 mb-4">
                <Stepper
                  steps={steps}
                  pallet={{
                    default: '#E4E4E4',
                    warning: '#FF7C7C',
                    danger: '#FF7C7C',
                    success: '#68A392',
                  }}
                  footerData={{
                    // submitHandler: submitStepper,
                    prevBtnClassName: 'hidden',
                    nextBtnClassName: 'hidden',
                    submitBtnClassName: 'hidden',
                  }}
                />
              </div>
              {/* 提示訊息 */}
              <p className="sm:flex sm:flex-row sm:w-full sm:justify-center lg:w-8/12 py-10">
                用戶
                <span className="text-primary px-2">{auth.userData.name}</span>
                您好，請確認您的購物資訊無誤
              </p>
              {/* 主要內容 */}

              {source === 'flower' && <CustomCheckOut />}
              {source === 'shop' && <ShopCheckOut />}
              {source === 'course' && <CourseCheckOut />}
            </div>
          </main>
        </>
      }
    </DefaultLayout>
  )
}
