import { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
// import ShopPaymentSuccess from '@/pages/shop/line-pay/order-success'
import CoursePaymentSuccess from '@/components/course/page-payment-success'
import CustomPaymentSuccess from '@/components/custom/cart/CustomPaymentSuccess'
import SuccessAnimation from '@/components/common/animation_success'
import Head from 'next/head'
export default function PaymentSuccessed() {
  const [activePage, setActivePage] = useState('cart')
  const route = useRouter()
  const source = route.query.source

  return (
    <>
      <Head>
        <title>訂購成功</title>
      </Head>
      <DefaultLayout activePage={activePage}>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white mt-[64px]">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-center columns-12 mb-10 px-5 md:px-0">
            {/* 成功圖示 */}
            <div className="flex flex-col md:w-6/12 lg:w-4/12 items-center my-10 ">
              <SuccessAnimation />
              <p className="text-2xl font-medium mt-6">
                付款成功，您的訂單已成立
              </p>
            </div>
            {/* 訂單明細 */}
            {source === 'flower' && <CustomPaymentSuccess />}
            {/* {source === 'shop' && <ShopPaymentSuccess />} */}
            {source === 'course' && <CoursePaymentSuccess />}
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}
