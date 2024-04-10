import React, { useState, useRef } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import styles from '../custom/custom.module.css'
import Image from 'next/image'
import bannerFlower from '@/assets/banner-flower.jpg'
import { MyButton } from '@/components/btn/mybutton'
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
  const [activePage, setActivePage] = useState('custom')
  // 控制 Modal Button
  const { isOpen, onOpen, onClose } = useDisclosure()
  const size = ['sm']
  // 創建參考
  const textRef = useRef(null)

  // 點擊複製按鈕後的處理函數
  const handleCopy = () => {
    const textField = textRef.current
    textField.select()
    navigator.clipboard
      .writeText(textField.value)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error)
      })
  }
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* main的東西 */}
          <div className="w-screen h-screen bg-orange-100 text-2xl text-black">
            代客送花 建立custom branch
          </div>
          <div className=" absolute top-40 left-1/2 transform -translate-x-1/2 mb-4 p-3 rounded-full justify-center">
            <MyButton
              onPress={onOpen}
              className="mt-6"
              color="secondary"
              size="md"
              isOutline
            >
              領取優惠券
            </MyButton>
          </div>
          {/* Modal   視窗 */}
          <div className="text-center">
            <Modal size={size} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <div className="text-2xl text-center py-4  bg-primary-100 rounded-t-2xl m-5 text-gray-100">
                        母親節優惠開跑囉!
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      {/* 說明區域 */}
                      <div className="justify-center text-center flex-col">
                        <p>
                          選購商城商品滿NT$1,000
                          <br />
                          可額外享NT$50折扣優惠
                          <br />
                          <p className="text-sm m-3 ">
                            <strong>結帳時請輸入優惠碼</strong>
                          </p>
                          <div className="flex justify-center">
                            <div className=" flex justify-around p-1 border-2 w-4/5 rounded-xl border-dashed">
                              <div
                                className=" container w-full h-full flex 
                             justify-center items-center"
                              >
                                <input
                                  ref={textRef}
                                  type="text"
                                  value="FLOWER50"
                                  className="text-center text-sm m-0 w-full mr-1.5 bg-transparent outline-none border-none"
                                  readOnly
                                />
                              </div>
                              <div className="">
                                <MyButton
                                  color="primary"
                                  size="xs"
                                  isOutline
                                  className="rounded-xl"
                                  // 點擊複製按鈕後觸發handleCopy函數
                                  onPress={handleCopy}
                                >
                                  複製
                                </MyButton>
                              </div>
                            </div>
                          </div>
                          <br />
                          <MyButton color="primary" size="xs">
                            前往商城選購
                          </MyButton>
                          <div className="max-w-60 mx-auto mt-5">
                            <Image
                              isZoomed
                              alt="FlowerMom"
                              src="/assets/intro/FlowerMom.jpg"
                              width={300}
                              height={300}
                            />
                          </div>
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter className="justify-center">
                      <p>
                        <strong>母親節限定優惠碼</strong>
                      </p>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
