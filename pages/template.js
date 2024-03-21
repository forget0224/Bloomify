import { useState } from 'react'
import Image from 'next/image'
import DefaultLayout from '@/components/layout/default-layout'
import bannerFlower from '@/assets/banner-flower.jpg'
import { MyButton } from '@/components/btn/mybutton'
import { Card, CardHeader, CardBody, Image as ImageUI } from '@nextui-org/react'
export default function Custom() {
  const [activePage, setActivePage] = useState('custom')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* main的東西 */}
          {/* text-XXX 文字顏色 */}
          <div className="w-screen h-screen bg-orange-100  text-black">
            <p className="text-2xl text-danger">代客送花</p>
            <p className="text-2xl text-tertiary-gray-200">代客送花</p>
            <p className="text-2xl text-tertiary-blue">代客送花</p>
            <p className="text-2xl text-primary-100">代客送花</p>
            <p className="text-2xl text-primary-200">代客送花</p>
            <p className="text-2xl text-primary-300">代客送花</p>
            <MyButton color="secondary" size="md">
              加入我們ddd
            </MyButton>
            <MyButton color="primary" size="xl">
              加入我們xl
            </MyButton>
            <MyButton color="secondary" size="xs">
              加入我們xs
            </MyButton>
            <MyButton color="secondary" size="md">
              加入我們md
            </MyButton>
            <MyButton color="primary" size="xl" isDisabled>
              加入我們xl
            </MyButton>
            <MyButton color="primary" size="xs" isOutline>
              加入我們xs
            </MyButton>
            <MyButton color="secondary" size="md" isOutline>
              加入我們md
            </MyButton>
            <MyButton color="primary" size="xl" isOutline>
              加入我們xl
            </MyButton>
          </div>

          <div className="w-screen h-screen bg-blue-100  text-black flex flex-col  justify-center items-center">
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
          </div>

          <div className="w-[300px] h-[300px] m-auto">
            <Card className="py-4 py-[100px] bg-[#eeff88]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                <small className="text-default-500">12 Tracks</small>
                <h4 className="font-bold text-large">Frontend Radio</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <ImageUI
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
        </>
      }
    </DefaultLayout>
  )
}
