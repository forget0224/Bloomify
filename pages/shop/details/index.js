import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import ShopSlider from '@/components/shop/shop-slider'
import { BsFillStarFill, BsHeart } from 'react-icons/bs'
import { LuShare2 } from 'react-icons/lu'
import { Tabs, Tab, Card, CardBody, Button, Input } from '@nextui-org/react'
import Subtitle from '@/components/common/subtitle'
import { FaStar } from 'react-icons/fa'
import { Pagination } from '@nextui-org/react'
import Link from 'next/link.js'
import toast, { Toaster } from 'react-hot-toast'

export default function Detail() {
  const [activePage, setActivePage] = useState('shop')

  // images start
  const productImages = [
    { image: '/assets/shop/products/flowers/pink_Gladiola_0.jpg' },
    { image: '/assets/shop/products/flowers/red_Amaryllis_3.jpg' },
    { image: '/assets/shop/products/flowers/red_Snapdragon_1.jpg' },
  ]
  const [mainImageSrc, setMainImageSrc] = useState(productImages[0].image)
  const handleThumbnailClick = (imageSrc) => {
    setMainImageSrc(imageSrc)
  }
  // images end

  // tags start
  const productTags = [{ tag: '熱賣中' }, { tag: '鮮花類' }]
  // tags end

  //table樣式
  const tableStyles = {
    th: 'text-base', // 表頭
    td: 'text-base', // 表格
    wrapper: 'text-base', // 整個表格
  }

  //comment start
  // const comment = [
  //   {
  //     userName: '吉伊卡哇',
  //     time: '2023.02.12',
  //     star: '3',
  //     message:
  //       '申居鄖說過一句富有哲理的話，始交不慎，後必成仇。這激勵了我。雨果說過一句富有哲理的話，有朋自遠方來，不亦樂乎。這激勵了我。對玫瑰花進行深入研究，在現今時代已經無法避免了。',
  //   },
  //   {
  //     userName: '芙莉蓮',
  //     time: '2024.04.05',
  //     star: '4',
  //     message:
  //       '我們仍然需要對玫瑰花保持懷疑的態度。面對如此難題，我們必須設想周全。所謂玫瑰花，關鍵是玫瑰花需要如何解讀。我們不妨可以這樣來想: 每個人的一生中，幾乎可說碰到玫瑰花這件事，是必然會發生的。',
  //   },
  //   {
  //     userName: '費倫',
  //     time: '2024.05.05',
  //     star: '2',
  //     message:
  //       '當你搞懂後就會明白了。而這些並不是完全重要，更加重要的問題是，這種事實對本人來說意義重大，相信對這個世界也是有一定意義的。對玫瑰花進行深入研究，在現今時代已經無法避免了。',
  //   },
  // ]
  //comment end

  // calculate start
  const [quantity, setQuantity] = useState(1)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value)
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity)
    } else if (event.target.value === '') {
      setQuantity(1)
    }
  }
  // calculate end

  // tabs start
  let tabs = [
    {
      id: 'all',
      label: '全部(21)',
      content: [
        {
          userName: '吉伊卡哇',
          time: '2023.02.12',
          star: '3',
          comment:
            '申居鄖說過一句富有哲理的話，始交不慎，後必成仇。這激勵了我。雨果說過一句富有哲理的話，有朋自遠方來，不亦樂乎。這激勵了我。對玫瑰花進行深入研究，在現今時代已經無法避免了。',
        },
        {
          userName: '吉伊卡哇',
          time: '2023.02.12',
          star: '3',
          comment:
            '申居鄖說過一句富有哲理的話，始交不慎，後必成仇。這激勵了我。雨果說過一句富有哲理的話，有朋自遠方來，不亦樂乎。這激勵了我。對玫瑰花進行深入研究，在現今時代已經無法避免了。',
        },
      ],
    },
    {
      id: 'five-stars',
      label: '五星(10)',
      content: [
        {
          userName: '哈哈哈哈',
          time: '2023.02.12',
          star: '3',
          comment:
            '申居鄖說過一句富有哲理的話，始交不慎，後必成仇。這激勵了我。雨果說過一句富有哲理的話，有朋自遠方來，不亦樂乎。這激勵了我。對玫瑰花進行深入研究，在現今時代已經無法避免了。',
        },
        {
          userName: '哈哈哈哈',
          time: '2023.02.12',
          star: '3',
          comment:
            '申居鄖說過一句富有哲理的話，始交不慎，後必成仇。這激勵了我。雨果說過一句富有哲理的話，有朋自遠方來，不亦樂乎。這激勵了我。對玫瑰花進行深入研究，在現今時代已經無法避免了。',
        },
      ],
    },
    {
      id: 'four-stars',
      label: '四星(10)',
      content:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 'three-stars',
      label: '三星(10)',
      content:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 'two-stars',
      label: '二星(10)',
      content:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 'one-star',
      label: '一星(10)',
      content:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ]
  // tabs end

  // toaster start
  const notify = () => toast.success('已成功加入購物車')
  // toaster end

  return (
    <DefaultLayout
      activePage={activePage}
      className="flex flex-col justify-center items-center"
    >
      {/* 置中 & 背景色 */}
      <main className="flex flex-col justify-center items-center bg-white">
        {/* 主要容器 */}
        <div className="bg-white container justify-center flex flex-col items-start columns-12 static px-5 md:px-0">
          {/* 麵包屑 */}
          <div className="bg-white flex flex-col flex-wrap gap-4 py-6 w-full">
            <div>
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>線上商城</BreadcrumbItem>
                <BreadcrumbItem color="primary">商品細節</BreadcrumbItem>
              </Breadcrumbs>
            </div>
          </div>

          <div className="w-full sm:flex sm:justify-center">
            {/* imgs start */}
            <div className="hidden sm:block sm:flex">
              <div className="space-y-2">
                {productImages.map((item, index) => (
                  <Image
                    key={index}
                    isZoomed
                    width={100}
                    alt=""
                    src={item.image}
                    onClick={() => handleThumbnailClick(item.image)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
              <div className="ml-2 mr-8">
                <Image width={500} alt="" src={mainImageSrc} />
              </div>
            </div>
            {/* imgs  end*/}
            {/* RWD imgs start */}
            <div className="sm:hidden">
              <div className="">
                <Image width={350} alt="" src={mainImageSrc} />
              </div>
              <div className="flex space-x-2 my-2">
                {productImages.map((item, index) => (
                  <Image
                    key={index}
                    isZoomed
                    width={50}
                    alt=""
                    src={item.image}
                    onClick={() => handleThumbnailClick(item.image)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
            {/* RWD imgs  end*/}
            {/* info start*/}
            <div className="space-y-4 sm:space-y-8">
              <div className="space-y-2">
                <p className="text-4xl text-tertiary-black font-bold">
                  粉色玫瑰
                </p>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <BsFillStarFill className="text-secondary-100" />
                    <BsFillStarFill className="text-secondary-100" />
                    <BsFillStarFill className="text-secondary-100" />
                    <BsFillStarFill className="text-secondary-100" />
                    <BsFillStarFill className="text-secondary-100" />
                    <div>
                      <p className="text-tertiary-black">5.0</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <BsHeart className="text-secondary-100" />
                    <LuShare2 className="text-secondary-100" />
                  </div>
                </div>
                <div>
                  {productTags.map((item, index) => (
                    <span
                      key={index}
                      className="bg-primary text-secondary-300 text-base me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-start">
                <table>
                  <tbody>
                    <tr className="my-4">
                      <td className="py-2 whitespace-nowrap">商品定價</td>
                      <td className="px-4 py-2">NT$30</td>
                    </tr>
                    <tr className="my-4">
                      <td className="py-2 whitespace-nowrap">商品庫存</td>
                      <td className="px-4 py-2">300支</td>
                    </tr>
                    <tr className="my-4">
                      <td className="py-2 whitespace-nowrap">累積購買數</td>
                      <td className="px-4 py-2">30支</td>
                    </tr>
                    <tr className="my-4">
                      <td className="py-2 whitespace-nowrap">購買數量</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-4 items-center">
                          <Button
                            isIconOnly
                            variant="faded"
                            className="border-transparent"
                            onClick={handleDecrement}
                          >
                            -
                          </Button>
                          <Input
                            type="text"
                            value={quantity}
                            onChange={handleChange}
                            min="1"
                            className="max-w-20 w-full rounded-md p-1 text-center"
                            style={{ textAlign: 'center' }}
                          />
                          <Button
                            isIconOnly
                            variant="faded"
                            className="border-transparent"
                            onClick={handleIncrement}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex space-x-1.5 sm:space-x-10">
                <MyButton
                  color="primary"
                  size="xl"
                  onClick={notify}
                  isOutline
                  className="w-full"
                >
                  加入購物車
                </MyButton>
                <Toaster />

                <MyButton color="primary" size="xl" className="w-full">
                  <Link href="/shop/cart">立即購買</Link>
                </MyButton>
              </div>
            </div>
            {/* info end*/}
          </div>

          <div className="flex w-full flex-col my-16">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              classNames={{
                tabList:
                  'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full bg-[#68A392]',
                tab: 'max-w-fit px-0 h-12',
                tabContent: 'group-data-[selected=true]:text-[#68A392]',
              }}
            >
              <Tab
                key="information"
                title={
                  <div className="flex items-center text-base space-x-2">
                    商品訊息
                  </div>
                }
              >
                <Card className="p-8 space-y-6">
                  <p className="flex flex-col gap-3 text-xl">粉色玫瑰</p>
                  <p className="flex flex-col gap-3">
                    粉色玫瑰花是一種迷人的花朵，以其溫柔的粉色色調和迷人的花朵形狀而聞名。這種花象徵著柔美、愛情和浪漫情懷，常被用作表達愛意或祝福的花材。
                    粉色玫瑰花在花束、花籃或作為室內裝飾的一部分都能營造出優雅和浪漫的氛圍。
                  </p>
                </Card>
              </Tab>
              {/* buy again */}
              <Tab
                key="store"
                title={
                  <div className="flex items-center text-base space-x-2">
                    販售店家
                  </div>
                }
              >
                <Card className="p-8 space-y-6">
                  <p className="flex flex-col gap-3 text-xl">販售店家</p>
                  <p className="flex flex-col gap-3">
                    {' '}
                    世界上若沒有販售店家簡介，對於人類的改變可想而知。對販售店家簡介進行深入研究，在現今時代已經無法避免了。蔡鍔在過去曾經講過，沒有膽量就談不上傑出的統帥。這句話令我不禁感慨問題的迫切性。我認為，海西阿德曾說過，善於掌握自己時間的人，是真正偉大的人。這段話非常有意思。
                  </p>
                </Card>
              </Tab>
              <Tab
                key="size"
                title={
                  <div className="flex items-center text-base space-x-2">
                    商品尺寸
                  </div>
                }
              >
                <Card className="p-8 space-y-6">
                  <p className="flex flex-col gap-3 text-xl">商品尺寸</p>
                  <p className="flex flex-col gap-3">商品尺寸</p>
                </Card>
              </Tab>
              <Tab
                key="note"
                title={
                  <div className="flex items-center text-base space-x-2">
                    注意事項
                  </div>
                }
              >
                <Card className="p-8 space-y-6">
                  <p className="flex flex-col gap-3">注意事項</p>
                </Card>
              </Tab>
            </Tabs>
          </div>
          {/* 商品評價 */}
          <div className="space-y-2 container">
            <Subtitle text="商品評價" />
            <div className="flex flex-row gap-2">
              <span className="text-2xl">4.0</span>
              <span className="text-2xl">/</span>
              <span className="text-2xl">5</span>
              <div className="flex flex-row items-center text-secondary-100">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-secondary-200" />
                <FaStar className="text-secondary-200" />
              </div>
            </div>
            <div className="flex w-full flex-col bg-transparent">
              <Tabs
                aria-label="Dynamic tabs"
                items={tabs}
                classNames={{
                  tabList: 'bg-transparent',
                  tabContent: 'group-data-[selected=true]:text-[#68A392]',
                }}
              >
                {(item) => (
                  <Tab
                    key={item.id}
                    title={
                      <div className="flex items-center text-base space-x-2">
                        {item.label}
                      </div>
                    }
                  >
                    <Card>
                      {Array.isArray(item.content) ? (
                        item.content.map((commentItem, index) => (
                          <CardBody key={index} className="space-y-2 p-6">
                            <div className="flex space-x-2 items-center">
                              <p className="text-xl">{commentItem.userName}</p>
                              <p className="text-tertiary-gray-100">
                                {commentItem.time}
                              </p>
                            </div>
                            <div className="flex flex-row items-center text-secondary-100">
                              {commentItem.star === '1' ? (
                                <>
                                  <FaStar />
                                  <FaStar className="text-secondary-200" />
                                  <FaStar className="text-secondary-200" />
                                  <FaStar className="text-secondary-200" />
                                  <FaStar className="text-secondary-200" />
                                </>
                              ) : commentItem.star === '2' ? (
                                <>
                                  <FaStar />
                                  <FaStar />
                                  <FaStar className="text-secondary-200" />
                                  <FaStar className="text-secondary-200" />
                                  <FaStar className="text-secondary-200" />
                                </>
                              ) : commentItem.star === '3' ? (
                                <>
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar className="text-secondary-200" />
                                  <FaStar className="text-secondary-200" />
                                </>
                              ) : commentItem.star === '4' ? (
                                <>
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar className="text-secondary-200" />
                                </>
                              ) : (
                                <>
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                </>
                              )}
                            </div>
                            <div>{commentItem.comment}</div>
                          </CardBody>
                        ))
                      ) : (
                        <CardBody>
                          <div>Content not available</div>
                        </CardBody>
                      )}
                    </Card>
                    <div className="mt-6">
                      <Pagination
                        color="secondary-100"
                        initialPage={3}
                        total={10}
                        className="flex justify-center"
                      />
                    </div>
                  </Tab>
                )}
              </Tabs>
            </div>
          </div>
          <hr className="my-16" />
          <ShopSlider />
        </div>
      </main>
    </DefaultLayout>
  )
}
