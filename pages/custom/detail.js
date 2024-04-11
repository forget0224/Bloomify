import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { MdEdit } from 'react-icons/md'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { MyButton } from '@/components/btn/mybutton'
export default function Detail() {
  const [activePage, setActivePage] = useState('custom')

  const [isHeart, setIsHeart] = useState(true)

  const handleHeartClick = () => {
    setIsHeart(!isHeart)
  }

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div className="w-screen flex flex-col bg-white items-center justify-center text-tertiary-black gap-2 sm:flex-row ">
            <div
              className="w-[300px] sm:w-[1000px]  flex flex-col sm:flex-row justify-center  items-center gap-5"
              style={{ height: 'calc(100vh - 64px)' }}
            >
              <div className="bg-tertiary-gray-100 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] relative my-5 sm:h-[500px]">
                <div className="absolute top-2 left-2 hover:bg-white hover:text-tertiary-black rounded-full w-5 h-5">
                  <MdEdit className="text-xl" />
                </div>
              </div>

              <div className="flex flex-col flex-1 w-full gap-3 sm:h-[500px]">
                {/* 分類花束 */}
                <div className="flex flex-col px-5 py-6 gap-1">
                  <div className="flex flex-row justify-between">
                    <p className="text-xs">分類</p>
                    <div className="sm:hidden" onClick={handleHeartClick}>
                      {isHeart ? (
                        <IoIosHeartEmpty className="text-danger text-xl " />
                      ) : (
                        <IoIosHeart className="text-danger text-xl " />
                      )}
                    </div>
                  </div>

                  <h1 className="sm:text-3xl">花束名稱</h1>
                  <p className="text-tertiary-gray-100 text-xs">店家</p>
                  <p className="text-right sm:hidden">$350</p>
                </div>
                {/* 詳細資訊 */}
                <div className="w-[300px] text-sm h-full sm:h-auto flex-col gap-3 py-6 hidden sm:flex sm:w-full">
                  <div className="flex flex-col w-full px-5">
                    <p className="">詳細資訊</p>
                    <p className="">如當日花材不足會以相似款替代</p>
                  </div>
                  <div className="flex flex-col justify-center px-5 gap-2">
                    <div className="flex flex-row justify-between items-center">
                      <p>玫瑰</p>
                      <p>$50</p>
                      <p>x3</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p>玫瑰</p>
                      <p>$50</p>
                      <p>x3</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p>玫瑰</p>
                      <p>$50</p>
                      <p>x3</p>
                    </div>
                  </div>
                </div>

                <hr className="w-full hidden sm:block" />
                <div className="px-5 py-6 hidden sm:block">
                  <p className="text-right text-3xl">$350</p>
                </div>
                {/* 按鈕 */}
                <div className="flex flex-row w-full gap-6  justify-around items-center sm:px-5 ">
                  <div className="hidden sm:block" onClick={handleHeartClick}>
                    {isHeart ? (
                      <IoIosHeartEmpty className="text-danger text-2xl " />
                    ) : (
                      <IoIosHeart className="text-danger text-2xl " />
                    )}
                  </div>
                  <MyButton color="secondary200" size="xl">
                    客製化
                  </MyButton>
                  <MyButton color="secondary" size="xl">
                    結帳
                  </MyButton>
                </div>
              </div>
            </div>
            <hr className="w-full sm:hidden" />
            {/* 詳細資訊 */}
            <div className="w-[300px] text-sm h-full flex flex-col gap-3 py-6 sm:hidden">
              <div className="flex flex-col ">
                <p className="">詳細資訊</p>
                <p className="">如當日花材不足會以相似款替代</p>
              </div>
              <div className="flex flex-col justify-center px-5 gap-2">
                <div className="flex flex-row justify-between items-center">
                  <p>玫瑰</p>
                  <p>$50</p>
                  <p>x3</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>玫瑰</p>
                  <p>$50</p>
                  <p>x3</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>玫瑰</p>
                  <p>$50</p>
                  <p>x3</p>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </DefaultLayout>
  )
}
