import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import styles from '../custom/custom.module.css'
import Image from 'next/image'
import bannerFlower from '@/assets/banner-flower.jpg'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
//import {Image} from "@nextui-org/react";
export default function Intro() {
  const [activePage, setActivePage] = useState('intro')
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
        <div className="w-[1920px] h-[2888px] bg-white flex-col justify-start items-start inline-flex">
    <div className="w-[1920px] flex-col justify-center items-center flex">
        <div className="w-[1920px] px-[200px] py-6 justify-start items-center gap-4 inline-flex">
            <div className="justify-center items-center gap-2.5 flex">
                <div className="text-neutral-800 text-lg font-normal font-['Noto Serif TC'] tracking-widest">首頁</div>
            </div>
            <div className="justify-center items-center gap-2.5 flex">
                <div className="text-neutral-800 text-lg font-normal font-['Noto Serif TC'] tracking-widest">花與遊戲</div>
            </div>
            <div className="justify-center items-center gap-2.5 flex">
                <div className="text-slate-500 text-lg font-normal font-['Noto Serif TC'] tracking-widest">花圖鑑</div>
            </div>
        </div>
        <div className="w-[1520px] h-[525px] flex-col justify-start items-center flex">
            <div className="w-[1520px] h-[525px] rounded-2xl justify-center items-center inline-flex">
                <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                    <img className="w-[1520px] h-[730.33px]" src="https://via.placeholder.com/1520x730" />
                </div>
            </div>
            <div className="w-[1380px] h-[380px] rounded-[5px] border-8 border-white border-opacity-70" />
        </div>
    </div>
    <div className="h-[2289px] flex-col justify-start items-start gap-[35px] flex">
        <div className="w-[1920px] px-[249px] bg-white bg-opacity-0 justify-start items-start inline-flex">
            <div className="h-[66px] py-[13px] bg-white bg-opacity-0 justify-center items-center gap-2.5 flex">
                <div className="w-[102px] h-10 bg-zinc-300 bg-opacity-0 border-l-8 border-slate-500" />
                <div className="text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">花圖鑑</div>
            </div>
        </div>
        <div className="w-[1920px] h-[46px] px-[163px] bg-white bg-opacity-0 justify-center items-center gap-[126px] inline-flex">
            <div className="justify-center items-start gap-2.5 flex">
                <div className="w-[335px] h-11 justify-start items-center flex">
                    <div className="grow shrink basis-0 self-stretch px-6 py-2.5 bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-neutral-200 justify-center items-center flex">
                        <div className="grow shrink basis-0 text-neutral-400 text-sm font-normal font-['Noto Serif TC'] tracking-wider">搜尋...</div>
                    </div>
                    <div className="w-[43px] self-stretch p-2.5 bg-slate-500 rounded-tr-lg rounded-br-lg justify-center items-center gap-2.5 flex">
                        <div className="w-6 h-6 px-[2.24px] py-[2.48px] justify-center items-center flex">
                            <div className="w-[19.53px] h-[19.04px] relative">
                                <div className="w-[15.62px] h-[15.62px] left-0 top-0 absolute rounded-full border-2 border-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="justify-start items-start gap-2 flex">
                <div className="px-6 py-2.5 bg-white rounded-lg border border-neutral-200 justify-center items-center gap-2.5 flex">
                    <div className="text-neutral-800 text-base font-normal font-['Noto Serif TC'] tracking-wider">場合</div>
                    <div className="w-6 h-6 relative" />
                </div>
                <div className="px-6 py-2.5 bg-white rounded-lg border border-neutral-200 justify-center items-center gap-2.5 flex">
                    <div className="text-neutral-800 text-base font-normal font-['Noto Serif TC'] tracking-wider">顏色</div>
                    <div className="w-6 h-6 relative" />
                </div>
                <div className="px-6 py-2.5 bg-white rounded-lg border border-neutral-200 justify-center items-center gap-2.5 flex">
                    <div className="text-neutral-800 text-base font-normal font-['Noto Serif TC'] tracking-wider">對象</div>
                    <div className="w-6 h-6 relative" />
                </div>
                <div className="px-6 py-2.5 bg-white rounded-lg border border-neutral-200 justify-center items-center gap-2.5 flex">
                    <div className="text-neutral-800 text-base font-normal font-['Noto Serif TC'] tracking-wider">季節</div>
                    <div className="w-6 h-6 relative" />
                </div>
            </div>
            <div className="flex-col justify-start items-end gap-2.5 inline-flex">
                <div className="justify-start items-center gap-2 inline-flex">
                    <div className="text-neutral-800 text-base font-normal font-['Noto Serif TC'] tracking-wider">排序</div>
                    <div className="px-6 py-2.5 bg-white rounded-lg border border-neutral-200 justify-center items-center gap-2.5 flex">
                        <div className="text-neutral-800 text-base font-normal font-['Noto Serif TC'] tracking-wider">預設排序</div>
                        <div className="w-6 h-6 relative" />
                    </div>
                </div>
            </div>
        </div>
        <div className="h-[1941px] py-[50px] bg-white bg-opacity-0 flex-col justify-center items-center gap-[100px] flex">
            <div className="bg-white bg-opacity-0 justify-start items-center gap-10 inline-flex">
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-0 flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white bg-opacity-0 justify-start items-center gap-10 inline-flex">
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white bg-opacity-0 justify-start items-center gap-10 inline-flex">
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <img className="w-[330px] h-[440px]" src="https://via.placeholder.com/330x440" />
                    <div className="self-stretch h-[67px] px-2 flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[67px] flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <div className="grow shrink basis-0 text-center text-neutral-800 text-2xl font-normal font-['Noto Serif TC'] tracking-widest">孤挺花</div>
                            </div>
                            <div className="self-stretch text-center text-neutral-400 text-xl font-normal font-['Noto Serif TC'] tracking-widest">Amaryllis</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="self-stretch px-[828px] py-[42px] bg-white bg-opacity-0 justify-center items-center gap-2.5 inline-flex">
            <div className="justify-center items-center flex">
                <div className="h-[47px] px-16 py-3 bg-green-300 rounded-[30px] justify-center items-center gap-1 flex">
                    <div className="text-center text-white text-base font-medium font-['Noto Serif TC'] tracking-wider">查看更多</div>
                </div>
            </div>
        </div>
    </div>
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
