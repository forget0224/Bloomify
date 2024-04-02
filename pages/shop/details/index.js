import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import ProductDetails from '../../../components/shop/details/product-details'
import ProductReview from '../../../components/shop/details/product-reviews'
import ShopSlider from '@/components/shop/shop-slider'
import { BsFillStarFill, BsHeart } from 'react-icons/bs'
import { LuShare2 } from 'react-icons/lu'

export default function Shop() {
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div className="mx-auto md:px-52 sm:24">
            <div className="py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>線上商城</BreadcrumbItem>
                <BreadcrumbItem>商品細節</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* product information start */}
            <div className="sm:space-x-20 sm:flex ">
              {/* imgs */}
              <div className="sm:flex sm:space-x-4">
                {/* aside imgs */}
                <div className="hidden sm:flex sm:flex-col sm:gap-2 ">
                  <div className="max-w-[100px] max-h-[100px] overflow-hidden rounded-lg mb-1">
                    <Image
                      alt=""
                      className="object-fit w-full h-full rounded-none"
                      src="https://i.pinimg.com/originals/86/90/14/869014ea87e157354d2326a5961b20e0.png"
                    />
                  </div>
                  <div className="max-w-[100px] max-h-[100px] border border-gray-400 overflow-hidden rounded-lg">
                    <Image
                      alt=""
                      className="object-fit w-full h-full rounded-none"
                      src="/assets/shop/products/pink_Gladiola_0.jpg"
                    />
                  </div>
                </div>
                {/* main img */}
                <div className="max-w-[700px] max-h-[700px] overflow-hidden rounded-lg mb-1">
                  <Image
                    alt=""
                    className="object-fit w-full h-full rounded-none"
                    src="/assets/shop/products/pink_Gladiola_0.jpg"
                  />
                </div>
                {/* aside imgs */}
                <div className="flex gap-2 sm:hidden">
                  <div className="max-w-[100px] max-h-[100px] overflow-hidden rounded-lg mb-1">
                    <Image
                      alt=""
                      className="object-fit w-full h-full rounded-none"
                      src="https://i.pinimg.com/originals/86/90/14/869014ea87e157354d2326a5961b20e0.png"
                    />
                  </div>
                  <div className="max-w-[100px] max-h-[100px] border border-gray-400 overflow-hidden rounded-lg">
                    <Image
                      alt=""
                      className="object-fit w-full h-full rounded-none"
                      src="/assets/shop/products/pink_Gladiola_0.jpg"
                    />
                  </div>
                </div>
              </div>
              {/* info start*/}
              <div className="space-y-4 sm:space-y-8">
                <div className="space-y-2">
                  <p className="text-4xl text-tertiary-black font-bold">
                    嘩嘩嘩嘩
                  </p>
                  {/* rating start */}
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                      <div>
                        <p className="text-tertiary-black">5.0</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <BsHeart className="text-secondary-100" />
                      <LuShare2 className="text-secondary-100" />
                    </div>
                  </div>
                  {/* rating end */}
                  {/* tag start */}
                  <div>
                    <span className="bg-primary text-secondary-300 text-base me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      熱賣中
                    </span>
                    <span className="bg-primary text-secondary-300 text-base me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      鮮花類
                    </span>
                  </div>
                  {/* tag end */}
                </div>

                <div className="flex justify-start">
                  <table>
                    <tbody>
                      <tr className="my-4">
                        <td className="py-2">商品定價</td>
                        <td className="px-4 py-2">NT$30</td>
                      </tr>
                      <tr className="my-4">
                        <td className="py-2">商品庫存</td>
                        <td className="px-4 py-2">300支</td>
                      </tr>
                      <tr className="my-4">
                        <td className="py-2">累積購買數</td>
                        <td className="px-4 py-2">30支</td>
                      </tr>
                      <tr className="my-4">
                        <td className="py-2">購買數量</td>
                        <td className="px-4 py-2">300支</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex space-x-1 sm:space-x-2">
                  <MyButton color="primary" size="xl" isOutline>
                    加入購物車
                  </MyButton>
                  <MyButton color="primary" size="xl">
                    立即購買
                  </MyButton>
                </div>
              </div>
              {/* info end*/}
            </div>

            {/* product information end */}
            <div className="my-2 sm:my-8">
              <ProductDetails />
            </div>
            <hr className="my-16" />
            <ProductReview />
            <hr className="my-16" />
            <ShopSlider />
          </div>
        </>
      }
    </DefaultLayout>
  )
}
