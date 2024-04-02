import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
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

export default function Custom() {
  const [activePage, setActivePage] = useState('store')

  // 4 張卡片
  const list = [
    {
      title: 'Orange',
      img: '/images/fruit-1.jpeg',
    },
    {
      title: 'Tangerine',
      img: '/images/fruit-2.jpeg',
    },
    {
      title: 'Raspberry',
      img: '/images/fruit-3.jpeg',
    },
    {
      title: 'Lemon',
      img: '/images/fruit-4.jpeg',
    },
  ]
  // 控制 Modal Button
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
                  <BreadcrumbItem>加入我們</BreadcrumbItem>
                </Breadcrumbs>
              </div>
              {/* banner */}
              <div className="bg-stone-100">
                <div className="text-4xl text-center py-4">合作申請流程</div>
                <div className="flex justify-around  py-4">
                  <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
                    填入表單
                  </div>
                  <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
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
                  </div>
                </div>
              </div>

              <div className="py-4 text-center text-green-700 font-bold">
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
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Modal Title
                        </ModalHeader>
                        <ModalBody>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam pulvinar risus non risus hendrerit
                            venenatis. Pellentesque sit amet hendrerit risus,
                            sed porttitor quam.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam pulvinar risus non risus hendrerit
                            venenatis. Pellentesque sit amet hendrerit risus,
                            sed porttitor quam.
                          </p>
                          <p>
                            Magna exercitation reprehenderit magna aute tempor
                            cupidatat consequat elit dolor adipisicing. Mollit
                            dolor eiusmod sunt ex incididunt cillum quis. Velit
                            duis sit officia eiusmod Lorem aliqua enim laboris
                            do dolor eiusmod. Et mollit incididunt nisi
                            consectetur esse laborum eiusmod pariatur proident
                            Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button color="primary" onPress={onClose}>
                            Action
                          </Button>
                        </ModalFooter>
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
                <div className="">
                  <div>1562</div>
                  <div>線上課程</div>
                </div>
                <div className="">
                  <div>20158</div>
                  <div>商品種類</div>
                </div>
                <div className="">
                  <div>256</div>
                  <div>花束範本</div>
                </div>
                <div className="">
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
