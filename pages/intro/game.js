import { useState } from 'react'
import styles from '../custom/custom.module.css'
import Image from 'next/image'
import { MyButton } from '@/components/btn/mybutton'
import Link from 'next/link'
import Head from 'next/head'
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
  const size = ['base']
  return (
    <>
      <Head>
        <title>花占卜</title>
      </Head>
      <div className="bg-[url('/assets/intro/vintage_speckles.png')] h-screen flex flex-col items-center">
        <div className=" z-10 text-center text-black absolute inset-x-0 top-10">
          {/* <p>~</p> */}
          <p>
            <span className="bg-gray-100 text-2xl font-medium">
              以盛開的雛菊，
            </span>
          </p>
          <p>
            <span className="bg-gray-100 text-2xl font-medium">
              為你解開疑惑。
            </span>
          </p>
          <p className="mt-1">
            <span className="bg-gray-100 text-xl">
              In a garden where daisies bloom,
            </span>
          </p>
          <p>
            <span className="bg-gray-100 text-xl">
              A fortune teller lifts the gloom.
            </span>
          </p>
        </div>
        <div className="w-full justify-start flex flex-row">
          <img
            className="w-2/5 h-auto"
            src="/assets/intro/cloudL.gif"
            alt="cloud1"
          />
        </div>
        
        <div className="w-full justify-center flex">
          <img
            className="w-2/5 h-auto"
            src="/assets/intro/cloudC.gif"
            alt="cloud1"
          />
        </div>
        <div className=" w-full flex justify-end relative">
          <img
            className="absolute bottom-0 w-3/5 h-auto"
            src="/assets/intro/cloudC.gif"
            alt="cloud2"
          />
        </div>
        <div className="absolute bottom-0 mb-0">
          <img
            className="max-w-xl"
            src="/assets/intro/daisy.gif"
            alt="daisy"
            
          />
        </div>
      </div>

      <div className="fixed bottom-0 right-0 mr-4 mb-4 p-3 rounded-full flex items-center justify-center">
        <Link href="/">
          <MyButton
            isIconOnly
            isOutline
            color="primary"
            variant="faded"
            aria-label="back to index"
            className="w-16 h-16 rounded-full border-1 border-primary-100 bg-primary text-white"
          >
            回首頁
          </MyButton>
        </Link>
      </div>

      <div className="absolute top-52 left-1/2 transform -translate-x-1/2 mb-4 p-3 rounded-full justify-center">
        <MyButton color="primary" size="xl" onPress={onOpen} className="mt-6">
          開始占卜
        </MyButton>
      </div>
      {/* Modal   視窗 */}
      <div>
        <Modal
          className="bg-secondary"
          size={size}
          isOpen={isOpen}
          onClose={onClose}
        >
          <div>
            <ModalContent>
              {(onClose) => (
                <>
                  <div>
                    <ModalHeader className="flex flex-col gap-0"></ModalHeader>
                    <ModalBody className="flex flex-col gap-0">
                      {/* 說明區域 */}
                      <div className="justify-center flex flex-wrap bg-white rounded-lg p-4 ">
                        <p className="justify-center flex flex-wrap bg-white text-2xl mb-3">
                          <strong>遊戲規則</strong>
                        </p>
                        <p>
                          親愛的使用者，
                          <br />
                          歡迎您遊玩我們所提供的花占卜服務。提醒您一些重要的事項，以確保您能夠正確理解並適當使用我們提供的遊戲服務。
                          <ul className="list-disc list-inside">
                            <li>
                              <strong>隨機抽卡-</strong>
                              我們將花語卡牌洗好提供您挑選，相同的問題可能會產生不同的結果，短期間內一事不二占為占卜原則。
                            </li>
                            <li>
                              <strong>占卜方式-</strong>
                              將抽出三張卡牌，可自由設定三張牌所代表的含意，如「過去、現在、未來」或「問題、結果、建議」，並依當下直覺解釋。
                            </li>
                            <li>
                              <strong>謹慎使用-</strong>
                              請將解牌結果作為娛樂用途，如果您有任何真實生活中的困惑，請尋求專業的意見和協助。
                            </li>
                            最後，我們希望您玩的開心。祝您好運！
                          </ul>
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter className="justify-center">
                      <a href="/game.html">
                        <MyButton
                          className="bg-[#FFC1B4]"
                          color="secondary"
                          size="xs"
                        >
                          我已瞭解
                        </MyButton>
                      </a>
                    </ModalFooter>
                  </div>
                </>
              )}
            </ModalContent>
          </div>
        </Modal>
      </div>
    </>
  )
}
