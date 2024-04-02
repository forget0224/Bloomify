import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Image from 'next/image'

export default function Custom() {
  const [activePage, setActivePage] = useState('about')
  return (
    // navbar + footer
    <DefaultLayout activePage={activePage}>
      {
        <>
          {/* main */}
          <main className="bg-white">
            {/* 主要容器 */}
            <div className="container mx-auto ">
              {/* 麵包屑 */}
              <div className="py-6">
                <Breadcrumbs>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>關於我們</BreadcrumbItem>
                </Breadcrumbs>
              </div>
              <div className="container flex justify-center">
                {/* 左側邊欄 */}
                <section className="w-1/4 flex flex-col ">
                  <div>關於我們</div>
                  <div>服務項目</div>
                  <div>服務範圍</div>
                </section>
                {/* 右側邊欄-切換顯示/隱藏 */}
                {/* 關於我們 */}
                <section className="w-3/4 hidden">
                  <div>
                    我們的宗旨：隨時隨地，為您帶來溫馨的花束和愛的訊息。
                  </div>
                  <div>
                    {' '}
                    在現代生活中，儀式感與溫馨情感的表達至關重要。然而，繁忙的生活節奏常使我們無法細心關懷。我們的目標是解決這一困擾。隨時隨地，我們帶來精心挑選的花束，為您傳達真摯情感。無論工作日或深夜驚喜，我們都在您身邊。讓我們的花束成為您生活中溫馨和愛的象徵。
                  </div>
                  <Image
                    width={1000}
                    height={600}
                    // className="w-[1129px] h-[617px]"
                    src="https://via.placeholder.com/1129x617"
                  ></Image>
                </section>
                <section className="w-3/4 hidden">
                  {/* 服務項目 */}
                  <div className="text-xl text-center">我們提供的服務項目</div>
                  {/* 服務一 */}
                  <div className="flex">
                    <div>
                      <div>代客送花 :</div>
                      <div>
                        我們提供專業的送花服務，讓您無論身在何處，都能隨時隨地為您的親朋好友送上心意。
                      </div>
                    </div>
                    <Image
                      width={622}
                      height={538}
                      className="w-[622px] h-[538px]"
                      src="https://via.placeholder.com/622x538"
                    ></Image>
                  </div>
                  {/* 服務二 */}
                  <div className="flex">
                    <Image
                      width={622}
                      height={538}
                      className="w-[622px] h-[538px]"
                      src="https://via.placeholder.com/622x538"
                    ></Image>
                    <div>
                      <div>線上商城：</div>
                      <div>
                        在我們的線上商城，您可以輕鬆瀏覽各式各樣的花束和花材，選擇最適合您的款式和價格。{' '}
                      </div>
                    </div>
                  </div>
                  {/* 服務三 */}
                  <div className="flex">
                    <div>
                      <div>合作課程：</div>
                      <div>
                        我們與各種花藝師和專業工作室合作，為您提供精彩的花藝課程和工作坊。
                      </div>
                    </div>
                    <Image
                      width={622}
                      height={538}
                      className="w-[622px] h-[538px]"
                      src="https://via.placeholder.com/622x538"
                    ></Image>
                  </div>
                </section>
                {/* 服務範圍 */}
                <section className="w-3/4 flex ">
                  {/* 店家列表 */}
                  <div className="w-1/2">
                    <div>
                      <div>服務範圍：</div>
                      <div>
                        Bloomify
                        提供的訂花、買花、送花服務範圍包括：台北、桃園、台中、高雄區域。
                      </div>
                      <div>店家列表</div>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <Image
                      width={189}
                      height={343}
                      className="w-[189px] h-[343px]"
                      src="https://via.placeholder.com/189x343"
                    ></Image>
                  </div>
                </section>
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
