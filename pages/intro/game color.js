import { useState } from 'react'
import styles from '../custom/custom.module.css'
import Image from 'next/image'
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
  const size = ['lg']
  return (
    <>
      <div className="bg-[url('/assets/intro/vintage_speckles.png')] h-screen flex flex-col items-center">
        <div className=" z-10 text-center text-black absolute inset-x-0 top-10">
          {/* <p>~</p> */}
          <p>
            <span className="bg-gray-100">以盛開的雛菊，</span>
          </p>
          <p>
            <span className="bg-gray-100">為你解開疑惑。</span>
          </p>
          <p className="mt-1">
            <span className="bg-gray-100">
              In a garden where daisies bloom,
            </span>
          </p>
          <p>
            <span className="bg-gray-100">
              A fortune teller lifts the gloom.
            </span>
          </p>
        </div>
        <div className="w-full justify-start flex bg-red-500">
          <img
            className="w-2/5 h-auto"
            src="/assets/intro/cloud1.png"
            alt="cloud1"
          />
        </div>
        <div className="w-full bg-gray-500 flex justify-end">
          <img
            className="w-2/5 h-auto "
            src="/assets/intro/cloud2.png"
            alt="cloud2"
          />
        </div>
        <div className="absolute bottom-0 mb-0  bg-blue-500">
          <img
            className="w-auto h-1/3 max-w-xs h-auto"
            src="/assets/intro/daisy2.png"
            alt="daisy2"
          />
        </div>
      </div>

      <div className="fixed bottom-0 right-0 mr-4 mb-4 p-3 rounded-full flex items-center justify-center">
        <MyButton color="primary" size="xs">
          回首頁
        </MyButton>
      </div>

      <div className=" absolute top-40 left-1/2 transform -translate-x-1/2 mb-4 p-3 rounded-full justify-center">
        <MyButton color="primary" size="xl" onPress={onOpen} className="mt-6">
          開始占卜
        </MyButton>
      </div>
      {/* Modal   視窗 */}
      <div className="text-center">
        <Modal size={size} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="text-2xl text-center py-4">遊戲規則</div>
                </ModalHeader>
                <ModalBody>
                  {/* 說明區域 */}
                  <div className="justify-center flex flex-wrap">
                    <p>親愛的使用者，
                    <br/>
                    歡迎您遊玩我們所提供的花占卜服務。提醒您一些重要的事項，以確保您能夠正確理解並適當使用我們提供的遊戲服務。
                    <ul className="list-disc list-inside">
                    <li><strong>隨機抽卡-</strong>我們將花語卡牌洗好提供您挑選，相同的問題可能會產生不同的結果，短期間內一事不二占為占卜原則。</li>
                    <li><strong>占卜方式-</strong>將抽出三張卡牌，可自由設定三張牌所代表的含意，如「過去、現在、未來」或「問題、結果、建議」，並依當下直覺解釋。</li>
                    <li><strong>謹慎使用-</strong>請將解牌結果作為娛樂用途，如果您有任何真實生活中的困惑，請尋求專業的意見和協助。</li>
                    最後，我們希望您玩的開心。祝您好運！
                    </ul>
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter className="justify-center">
                  <MyButton color="primary" size="xs">
                    我已瞭解
                  </MyButton>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
