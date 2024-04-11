import { Card, Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
import flower from '@/assets/flower-2.jpeg'
import { Input, Button } from '@nextui-org/react'
import { Eye, EyeOff, Mail, LockKeyhole } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from '@nextui-org/react'
import { Steps, ConfigProvider } from 'antd'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import DefaultLayout from '@/components/layout/default-layout'
// Signup Page
export default function Page() {
  const [current, setCurrent] = useState(0)
  const routeName = 'signup'
  return (
    <DefaultLayout activePage={routeName}>
      <div className="py-16 flex justify-center items-center">
        <Card className="flex flex-row max-w-[950px] w-[950px] max-h-[600px] h-[600px] shadow-lg">
          {/* Form */}
          <div className="w-1/2 h-full flex flex-col items-center px-10 py-12 gap-6">
            <h1 className="text-3xl">會員註冊</h1>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#68A392',
                },
              }}
            >
              <Steps size="small" current={current} items={[{}, {}, {}]} />
            </ConfigProvider>
            <StepContent current={current} setCurrent={setCurrent} />
          </div>
          {/* Banner Image */}
          <div className="w-1/2 h-full select-none">
            <Image
              src={flower}
              alt="flower"
              className="object-center size-full"
            />
          </div>
        </Card>
      </div>
    </DefaultLayout>
  )
}

function StepContent({ current, setCurrent }) {
  switch (current) {
    case 0:
      return <Step1 next={() => setCurrent(1)} />
    case 1:
      return <Step2 prev={() => setCurrent(0)} next={() => setCurrent(2)} />
    case 2:
      return <Step3 prev={() => setCurrent(1)} />
    default:
      return null
  }
}
// 填寫郵件與密碼
function Step1({ next }) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)
  return (
    <form className="flex flex-col space-y-12 w-full">
      <Input
        startContent={<Mail className="text-default-400" />}
        labelPlacement="outside"
        placeholder="請輸入您的電郵"
        type="email"
        label="電子郵件"
        isRequired
        endContent={
          <Button as={Link} className="text-xs text-primary-100 bg-transparent">
            發送驗證信
          </Button>
        }
      />
      <Input
        startContent={<LockKeyhole className="text-default-400" />}
        labelPlacement="outside"
        type={isVisible ? 'text' : 'password'}
        label="密碼"
        placeholder="請輸入密碼"
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeOff className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Input
        startContent={<LockKeyhole className="text-default-400" />}
        labelPlacement="outside"
        type={isVisible ? 'text' : 'password'}
        label="密碼（再次確認）"
        placeholder="請輸入密碼"
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeOff className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Button
        // type="submit"
        className="bg-primary-100 text-white"
        onClick={next}
      >
        下一步
      </Button>
    </form>
  )
}
// 個人檔案
function Step2({ prev, next }) {
  return (
    <form className="flex flex-col space-y-10 w-full overflow-auto">
      <Input
        labelPlacement="outside"
        placeholder="請輸入至少兩個中文"
        type="text"
        label="姓名"
        isRequired
      />
      <Select
        defaultSelectedKeys={['male']}
        placeholder="請選擇性別"
        labelPlacement="outside"
        label="性別"
      >
        <SelectItem key="male" value="male">
          男性
        </SelectItem>
        <SelectItem key="female" value="female">
          女性
        </SelectItem>
        <SelectItem key="other" value="other">
          不透露
        </SelectItem>
      </Select>
      <Input
        labelPlacement="outside"
        placeholder="請輸入您的生日"
        type="date"
        label="生日"
      />
      <Input
        labelPlacement="outside"
        placeholder="請輸入您的手機"
        type="phone"
        label="手機"
        isRequired
      />
      <Input
        labelPlacement="outside"
        placeholder="請輸入電話號碼"
        type="tel"
        label="市話"
      />

      <div className="flex flex-col gap-4">
        <Button
          // type="submit"
          className="bg-primary-100 text-white"
          onClick={next}
        >
          下一步
        </Button>
        <Button variant="light" className="text-primary-100" onClick={prev}>
          上一步
        </Button>
      </div>
    </form>
  )
}
// 收件地址
function Step3({ prev }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  // close modal after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onOpenChange(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onOpenChange])
  return (
    <>
      <form className="flex flex-col space-y-12 w-full">
        <div className="flex flex-col space-y-4">
          <Select
            labelPlacement="outside"
            placeholder="請選擇縣市"
            label="收件地址"
            isRequired
          >
            <SelectItem key="taipei" value="taipei">
              台北市
            </SelectItem>
            <SelectItem key="newtaipei" value="newtaipei">
              新北市
            </SelectItem>
            <SelectItem key="taichung" value="taichung">
              台中市
            </SelectItem>
            <SelectItem key="kaohsiung" value="kaohsiung">
              高雄市
            </SelectItem>
          </Select>
          <div className="flex gap-2">
            <Select placeholder="請選擇鄉鎮市區">
              <SelectItem key="datong" value="datong">
                大同區
              </SelectItem>
              <SelectItem key="zhongshan" value="zhongshan">
                中山區
              </SelectItem>
              <SelectItem key="zhongzheng" value="zhongzheng">
                中正區
              </SelectItem>
              <SelectItem key="daan" value="daan">
                大安區
              </SelectItem>
            </Select>
            <Input className="w-44" placeholder="郵訊區號" />
          </div>
          <Input placeholder="請填寫街道地址" type="text" />
          <div>
            <Checkbox className="flex items-center">
              <p className="text-xs">
                我已閱讀並同意
                <Link className="text-xs">《隱私權保護政策》</Link>及
                <Link className="text-xs">《定型化契約條款》</Link>
              </p>
            </Checkbox>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            // type="submit"
            onPress={onOpen}
            className="bg-primary-100 text-white"
          >
            完成註冊
          </Button>
          <Button variant="light" className="text-primary-100" onClick={prev}>
            上一步
          </Button>
        </div>
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody className="flex flex-col items-center">
                <h1 className="font-bold text-2xl tracking-widest">
                  恭喜您註冊成功
                </h1>
                <CountdownCircleTimer
                  size={60}
                  rotation="counterclockwise"
                  isPlaying
                  duration={5}
                  strokeWidth={4}
                  colors={['#68A392']}
                >
                  {({ remainingTime }) => remainingTime + 's'}
                </CountdownCircleTimer>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}