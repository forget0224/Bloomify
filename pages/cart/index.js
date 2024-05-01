import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import { Tabs, Tab } from '@nextui-org/react'
import { Stepper } from 'react-dynamic-stepper'
import ShopCart from '@/components/shop/shop-cart'
import CourseCart from '@/components/course/page-cart'
import CustomCart from '@/components/custom/CustomCart'

export default function Cart() {
  const [activePage, setActivePage] = useState('cart')

  // const router = useRouter()
  // const [activeTab, setActiveTab] = useState('custom')
  // useEffect(() => {
  //   console.log('Router is ready:', router.isReady)
  //   console.log('Tab query:', router.query.tab)
  //   if (router.isReady) {
  //     const tabQuery = router.query.tab
  //     if (tabQuery) {
  //       setActiveTab(tabQuery)
  //     } else {
  //       setActiveTab('custom')
  //     }
  //   }
  // }, [router.isReady, router.query.tab])
  // console.log('qKey', activeTab)

  // stepper
  const steps = [
    {
      header: {
        label: '購物車',
      },
      // content: <div>First step content</div>,
      isError: false,
      isWarning: false,
      isComplete: false,
    },
    {
      header: {
        label: '填寫資料',
      },
      // content: <div>Second step content</div>,
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: false,
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

  //table 樣式
  const tableStyles = {
    base: ['text-tertiary-black'],
    th: ['text-base', 'text-tertiary-gray-100'],
    td: ['text-base', 'px-3', 'py-3'],
    wrapper: [
      'text-base',
      'shadow-none',
      'border-1',
      'border-tertiary-100',
      'rounded-xl',
    ],
  }

  return (
    <>
      <DefaultLayout activePage={activePage}>
        <CenterLayout>
          {/* steps */}
          <div className="flex flex-col w-full md:w-6/12 lg:w-4/12 gap-14 my-4 sm:mt-6 sm:mb-4">
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
              // tabList={{ display: 'none' }}
            />
          </div>
          {/* Tab */}
          <div className="flex w-screen flex-col bg-white items-center justify-around">
            <Tabs
              // selectedKey={activeTab}
              // onChange={setActiveTab}
              aria-label="Options"
              color="primary"
              variant="underlined"
              classNames={{
                tabList:
                  'gap-6 sm:max-w-[1024px] w-screen relative  rounded-none p-0 border-b border-divider',
                cursor: 'bg-primary w-full',
                tab: 'text-base w-[400px] px-0 h-12',
                tabContent: 'group-data-[selected=true]:text-primary',
              }}
            >
              <Tab
                key="custom"
                title={
                  <div className="flex items-center space-x-2">代客送花</div>
                }
              >
                <CustomCart />
              </Tab>

              <Tab
                key="shop"
                title={
                  <div className="flex items-center space-x-2">線上商城</div>
                }
              >
                <ShopCart />
              </Tab>

              <Tab
                key="course"
                title={
                  <div className="flex items-center space-x-2">合作課程</div>
                }
              >
                {/* 課程購物車的頁面 */}
                <CourseCart />
              </Tab>
            </Tabs>
          </div>
        </CenterLayout>
      </DefaultLayout>
    </>
  )
}
