import React from 'react'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'

function ProductInfo() {
  return (
    <>
      <div className="flex justify-center">
        {/* aside small pic */}
        <div className="mr-3">
          <div className="max-w-[100px] max-h-[100px] border border-gray-400 overflow-hidden rounded-lg mb-1">
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
              src="https://i.pinimg.com/originals/86/90/14/869014ea87e157354d2326a5961b20e0.png"
            />
          </div>
        </div>
        {/* main pic */}
        <div className="max-w-[550px] max-h-[550px] border border-gray-400 overflow-hidden rounded-lg mr-4">
          <Image
            alt="Woman listing to music"
            className="object-fit w-full h-full rounded-none"
            src="https://i.pinimg.com/originals/86/90/14/869014ea87e157354d2326a5961b20e0.png"
          />
        </div>
        {/* info */}
        <div className="px-5 pb-5 w-96 space-y-7">
          <div>
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                花的名字
              </h5>
            </a>
            {/* review */}
            <div className="flex items-center mt-2.5 mb-1">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <div>4.0</div>
            </div>

            {/* tags */}
            <div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                熱賣中
              </span>
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                熱賣中
              </span>
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                熱賣中
              </span>
            </div>
          </div>
          {/* product info */}
          <div className="gap-y-12 space-y-8">
            <div className="flex flex-cols gap-12">
              <p className="w-24">商品定價</p>
              <p>NT$30</p>
            </div>
            <div className="flex flex-cols gap-12">
              <p className="w-24">商品庫存</p>
              <p>NT$30</p>
            </div>
            <div className="flex flex-cols gap-12">
              <p className="w-24">累積購買數</p>
              <p>NT$30</p>
            </div>
            <div className="flex flex-cols gap-12">
              <p className="w-24">購買數量</p>
              <div>
                <form className="flex items-center max-w-sm mx-auto">
                  <div className="relative w-full">
                    <button
                      type="button"
                      className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-auto hover:bg-green-200 "
                    >
                      -
                    </button>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-auto hover:bg-green-200"
                    >
                      +
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <MyButton color="primary" size="xl">
              加入購物車
            </MyButton>
            <MyButton color="primary" size="xl" isOutline>
              立即購買
            </MyButton>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProductInfo
