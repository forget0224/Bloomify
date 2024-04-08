import React, { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import { Tabs, Tab, Card, Image, CardFooter } from '@nextui-org/react'
import { Stepper } from 'react-dynamic-stepper'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link.js'

export default function Cart() {
  const [activePage, setActivePage] = useState('cart')

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
  // const submitStepper = () => {
  //   console.log('submitted')
  // }

  // Tab
  const [selected, setSelected] = React.useState('shop')

  return (
    <>
      <DefaultLayout activePage={activePage}>
        <CenterLayout>
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
          {/* Tab */}
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
            onSelect
            color="primary"
            variant="bordered"
          >
            <Tab
              key="shop"
              title={
                <div className="flex items-center space-x-2">
                  <span>線上商城</span>
                </div>
              }
            >
              {/* 線上商城內容 */}
              <div className="flex flex-col w-full lg:w-10/12 gap-14">
                <p className="text-nowrap">線上商城</p>
              </div>
            </Tab>
            <Tab
              key="custom"
              title={
                <div className="flex items-center space-x-2">
                  <span>代客送花</span>
                </div>
              }
            >
              {/* 代客送花內容 */}
              <div className="flex flex-col w-full lg:w-10/12 gap-14">
                <p className="text-nowrap">代客送花</p>
              </div>
            </Tab>
            <Tab
              key="course"
              title={
                <div className="flex items-center space-x-2">
                  <span>合作課程</span>
                </div>
              }
            >
              {/* 合作課程內容 */}
              <div className="flex flex-col w-full lg:w-10/12 gap-14">
                <p className="text-nowrap">合作課程</p>
              </div>
            </Tab>
          </Tabs>

          {/* 按鈕 */}
          <div className="flex justify-center space-x-10 pt-10">
            <Link href="/">
              <MyButton color="primary" size="xl" isOutline>
                繼續購物
              </MyButton>
            </Link>
            <Link href="/cart/fill-out">
              <MyButton color="primary" size="xl">
                下一步
              </MyButton>
            </Link>
          </div>
        </CenterLayout>
      </DefaultLayout>
    </>
  )
}
