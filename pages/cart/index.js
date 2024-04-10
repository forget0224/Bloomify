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

  // // Tab
  // const [selected, setSelected] = React.useState('shop')

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
          <div className="flex w-screen  flex-col bg-white items-center">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              classNames={{
                tabList:
                  'gap-6 max-w-[1024px]  relative  rounded-none p-0 border-b border-divider',
                cursor: 'bg-primary w-full',
                tab: 'w-[400px] px-0 h-12  ',
                tabContent: 'group-data-[selected=true]:text-primary',
              }}
            >
              <Tab
                key="shop"
                title={
                  <div className="flex items-center space-x-2">代客送花</div>
                }
              >
                <Card>
                  <p>代客送花</p>
                </Card>
              </Tab>

              <Tab
                key="custom"
                title={
                  <div className="flex items-center space-x-2">線上商城</div>
                }
              >
                <Card>
                  <p>線上商城</p>
                </Card>
              </Tab>
              <Tab
                key="course"
                title={
                  <div className="flex items-center space-x-2">合作課程</div>
                }
              >
                <Card>
                  <p>合作課程</p>
                </Card>
              </Tab>
            </Tabs>
          </div>

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
