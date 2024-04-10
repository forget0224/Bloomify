import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import Image from 'next/image'
import Link from 'next/link'

import cardflip from '@/assets/index_cardflip.png'
import bannerFlower from '@/assets/banner-flower.jpg'
export default function Home() {
  const [activePage, setActivePage] = useState('home')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <section className="w-screen h-screen bg-yellow-100 text-2xl text-black">
            sdkfsdlsdfsdfdfkfjsldkf
          </section>
          {/* sm:banner */}
          <section className="w-screen h-screen bg-blue-100  text-black flex flex-col  justify-center items-center hidden sm:flex">
            <div className="border-1 border-pink w-[1000px] h-[400px] flex flex-row">
              <div className="w-full flex flex-col bg-white justify-center items-center text-center">
                <h1 className="text-2xl my-3">情人節活動</h1>
                <p className="my-3 px-4">
                  無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。
                </p>
                <div className="w-full text-right px-4 my-3">
                  <a href="#" className="text-black ">
                    More
                  </a>
                </div>
              </div>
              <div className="w-full">
                <Image src={bannerFlower} alt="" className="w-[500px] h-full" />
              </div>
            </div>
          </section>
          {/* phone:banner */}
          <section className="w-screen h-60  bg-[url('/index/index_banner.jpg')] bg-cover flex items-center sm:hidden">
            <div className="w-80 h-52 bg-white/80 m-auto text-tertiary-black flex flex-col justify-center items-center rounded-2xl p-6 gap-y-2.5">
              <h1 className="text-[22px]">情人節活動</h1>
              <p className="text-xs">
                無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。
              </p>
              <Link href="#">More</Link>
            </div>
          </section>
          {/*card flip */}
          <section className="bg-secondary w-screen h-screen">
            {/* <div className="flex flex-row"> */}
            <div className="flex min-h-screen flex-row justify-center bg-slate-800">
              <div className="group sm:h-[375px] sm:w-[375px] h-36 w-36 [perspective:1000px]">
                <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ">
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <div className="bg-secondary-100  h-full w-full rounded-2xl shadow-xl shadow-secondary/40  ">
                      <div className="flex min-h-full flex-col justify-center items-center text-[32px] text-tertiary-black">
                        代客送花
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 h-full w-full rounded-2xl shadow-xl px-12 text-center text-slate-200 bg-primary-100   [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex min-h-full flex-col justify-center items-center ">
                      <h1 className="text-[22px]">情人節活動</h1>
                      <p className="text-xs">
                        無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:h-[375px] sm:w-[375px] h-36 w-36">
                <Image src={cardflip} alt="" className="w-auto h-auto"></Image>
              </div>
            </div>
            {/* </div> */}
          </section>
        </>
      }
    </DefaultLayout>
  )
}
