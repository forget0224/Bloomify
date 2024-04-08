import { useState, React } from 'react'

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
<<<<<<< HEAD:pages/join/index.js
import Process from '@/components/join/process'
=======
import { Input } from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'

// icon

// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'

import Process from '@/components/store/process'
>>>>>>> store:pages/store/index.js

export default function Custom() {
  const [activePage, setActivePage] = useState('store')

  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }

  // 4 張卡片
  const list = [
    {
      title: '接觸更多客戶',
      img: '/images/fruit-1.jpeg',
    },
    {
      title: '提高店家知名度',
      img: '/images/fruit-2.jpeg',
    },
    {
      title: '節省時間、成本',
      img: '/images/fruit-3.jpeg',
    },
    {
      title: '專員即時聯繫 ',
      img: '/images/fruit-4.jpeg',
    },
  ]

  // 控制 Modal Button
  const { isOpen, onOpen, onClose } = useDisclosure()
  const size = ['2xl']

  return (
    // navbar + footer
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* main */}
          <main className="bg-white">
            {/* 主要容器 */}
            <div className="container mx-auto">
              {/* 麵包屑 */}
              <div className="py-6">
                <Breadcrumbs>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem color="primary">加入我們</BreadcrumbItem>
                </Breadcrumbs>
              </div>
              {/* banner */}
              <div className="bg-stone-100">
                <div className="text-4xl text-center py-4">合作申請流程</div>
                <div className="flex justify-around flex-wrap py-4">
                  {/* <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
                    填入表單
                  </div> */}
                  <Process
                    process01={'填寫表單'}
                    process02={'登入系統'}
                    process03={'完成付款'}
                    process04={'等候權限'}
                    process05={'歡迎使用'}
                  ></Process>
                  {/* <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
                    登入系統
                  </div>
                  <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
                    完成付款
                  </div>
                  <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
                    等候權限
                  </div>
                  <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
                    歡迎使用
                  </div> */}
                </div>
              </div>

              <div className="py-4 text-center text-primary font-bold">
                為何選擇Bloomify
              </div>
              {/* 4 Card */}
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
                        width="100%"
                        alt={item.title}
                        className="w-full object-cover h-[140px]"
                        src={item.img}
                      />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                      <b>{item.title}</b>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {/* Modal   button */}
              <div className="text-center">
                <Button onPress={onOpen} className="mt-6">
                  Open Modal
                </Button>
                <Modal size={size} isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          <div className="text-2xl text-center py-4">
                            合作店家申請
                          </div>
                        </ModalHeader>
                        <ModalBody>
                          {/* 表單 */}
                          <form
                            name="form1"
                            method="post"
                            // onSubmit={submitHandler}
                            className="border border-orange-200 flex flex-col "
                          >
                            <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                              <Input
                                type="text"
                                label="店家名稱"
                                placeholder="請輸入店家名稱"
                                labelPlacement="outside"
                                isRequired
                                classNames={{ ...inputStyles }}
                              />
                              <Input
                                type="text"
                                label="帳號"
                                placeholder="請輸入帳號"
                                labelPlacement="outside"
                                isRequired
                                classNames={{ ...inputStyles }}
                              />
                              <Input
                                type="password"
                                label="密碼"
                                placeholder="請輸入密碼"
                                labelPlacement="outside"
                                isRequired
                                classNames={{ ...inputStyles }}
                              />
                              <Input
                                type="number"
                                label="電話"
                                placeholder="請輸入手機號碼"
                                labelPlacement="outside"
                                isRequired
                                classNames={{ ...inputStyles }}
                              />
                              <Input
                                type="email"
                                label="電子信箱"
                                placeholder="請輸入電子信箱 "
                                labelPlacement="outside"
                                isRequired
                                classNames={{ ...inputStyles }}
                              />
                              <Input
                                type="email"
                                label="電子信箱"
                                placeholder="請輸入電子信箱 "
                                labelPlacement="outside"
                                isRequired
                                classNames={{ ...inputStyles }}
                              />
                              <Textarea
                                isRequired
                                label="店家介紹"
                                labelPlacement="outside"
                                placeholder="請輸入店家介紹"
                                className="w-full"
                              />
                            </div>
                            {/* button */}
                            <div className="w-full flex justify-center gap-4">
                              {' '}
                              <MyButton
                                color="primary"
                                size="xl"
                                isOutline
                                className="w-full"
                              >
                                取消
                              </MyButton>
                              <MyButton
                                color="primary"
                                size="xl"
                                className="w-full"
                              >
                                註冊
                              </MyButton>
                            </div>
                          </form>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>

              <div className="py-4 text-center font-bold text-xl">平台規模</div>
              {/* 4 Card 數字效果 */}
              <div className="flex justify-around">
                <div className="my-4">
                  <div>243532</div>
                  <div>會員註冊</div>
                </div>
                <div className="my-4">
                  <div>1562</div>
                  <div>線上課程</div>
                </div>
                <div className="my-4">
                  <div>20158</div>
                  <div>商品種類</div>
                </div>
                <div className="my-4">
                  <div>256</div>
                  <div>花束範本</div>
                </div>
                <div className="my-4">
                  <div>3568</div>
                  <div>合作店家</div>
                </div>
              </div>
            </div>
          </main>
          {/* <div className="w-screen h-screen bg-orange-100 text-2xl text-black">
            代客送花 建立custom branch
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
          </div> */}
        </>
      }
    </DefaultLayout>
  )
}
