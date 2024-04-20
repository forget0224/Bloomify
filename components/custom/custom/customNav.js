import React from 'react'
import logo from '@/assets/singleLogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { CiUndo } from 'react-icons/ci'
import { MyButton } from '@/components/btn/mybutton'
import { useFlower } from '@/hooks/use-flowerSelector'
export default function CustomNav() {
  const { clearCanvas, snapshotCanvas } = useFlower()
  const handleUndo = () => {
    clearCanvas()
  }

  const handleCapture = () => {
    const imageData = snapshotCanvas()
    // 處理 imageData，例如儲存或傳遞到其他頁面
  }

  return (
    <>
      <nav className="w-full h-14 flex flex-row items-center px-5 gap-4 sm:h-16">
        <div className="text-center w-10 sm:h-16 cursor-pointer">
          <Link href="/">
            <Image className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div className="text-xl text-tertiary-black flex flex-col items-center mt-2 sm:mt-1 sm:text-3xl cursor-pointer">
            <CiUndo onClick={handleUndo} />
            <p className="text-xs">reset</p>
          </div>
          <div className="sm:hidden ">
            <Link href="/cart">
              <MyButton size="xs" color="secondary200">
                完成
              </MyButton>
            </Link>
          </div>
          <div className="hidden sm:block">
            <Link href="/cart">
              <MyButton size="md" color="secondary200" onClick={handleCapture}>
                完成
              </MyButton>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
