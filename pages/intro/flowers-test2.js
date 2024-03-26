import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import styles from '../custom/custom.module.css'
import Image from 'next/image'
import bannerFlower from '@/assets/banner-flower.jpg'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
//import {Image} from "@nextui-org/react";
export default function Custom() {
  const [activePage, setActivePage] = useState('custom')
  const list = [
    {
      title: 'Orange',
      img: '/images/fruit-1.jpeg',
      price: '$5.50',
    },
    {
      title: 'Tangerine',
      img: '/images/fruit-2.jpeg',
      price: '$3.00',
    },
    {
      title: 'Raspberry',
      img: '/images/fruit-3.jpeg',
      price: '$10.00',
    },
    {
      title: 'Lemon',
      img: '/fruit-4.jpeg',
      price: '$5.30',
    },
    {
      title: 'Avocado',
      img: '/images/fruit-5.jpeg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/images/fruit-6.jpeg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/images/fruit-7.jpeg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/images/fruit-7.jpeg',
      price: '$12.20',
    },
  ]
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div className="w-full">
            <Image
              src={'intro/intro_flowers_banner.png'} // 使用 require 導入圖片
              alt="花束圖片"
              width={1520}
              height={730}
            />
          </div>
          {/* main的東西 */}
          {/* <div className="w-screen h-screen bg-orange-100 text-2xl text-black">
            霹靂卡霹靂拉拉波波力那貝貝魯多
          </div> */}
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log('item pressed')}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width={400}
                    height={400}
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item.title}</b>
                  <p className="text-default-500">{item.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className={styles['foo']}>代客送花 建立custom branch</div>
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
        </>
      }
    </DefaultLayout>
  )
}
