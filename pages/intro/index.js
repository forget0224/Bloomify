import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
// import CardGroupClean from '@/components/intro/card-group-clean'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Subtitle from '@/components/intro/subtitle'
import { Select, SelectItem } from '@nextui-org/react'
// import SearchBtn from '@/components/intro/search-btn'
import { CiSearch } from 'react-icons/ci'
import introData from '../../data/introData.json'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'

export default function FlowersIndex() {
  // ----------花卡片的宣告部分start----------
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [size, setSize] = useState('md')
  const sizes = ['2xl']
  // 修改 handleOpen 函數，使其接收卡片的相關資料
  const handleOpen = (item) => {
    setSize(size)
    onOpen()
    // 將卡片的相關資料傳遞給模態視窗
    setModalData(item)
  }
  // useState hook 用於存儲模態視窗中顯示的資料
  const [modalData, setModalData] = useState(null)

  // ----------花卡片的宣告部分end----------
  // ----------篩選部分的資料宣告start----------
  const [activePage, setActivePage] = useState('course')
  const underlines = ['none']

  //occList start
  const occList = [
    { id: 0, title: '所有場合' },
    { id: 1, title: '生日慶祝' },
    { id: 2, title: '情人節' },
    { id: 3, title: '新婚喜慶' },
    {
      id: 4,
      title: '母親節',
    },
    { id: 5, title: '慰問安慰' },
    {
      id: 6,
      title: '感謝禮物',
    },
    { id: 7, title: '慶祝祝賀' },
    {
      id: 8,
      title: '紀念日',
    },
  ]
  //occList end

  //colorList start
  const colorList = [
    {
      id: 0,
      title: '所有顏色',
    },
    {
      id: 1,
      title: '紅色',
    },
    {
      id: 2,
      title: '橘色',
    },
    {
      id: 3,
      title: '黃色',
    },
    {
      id: 4,
      title: '綠色',
    },
    {
      id: 5,
      title: '藍色',
    },
    {
      id: 6,
      title: '紫色',
    },
    {
      id: 7,
      title: '粉色',
    },
    {
      id: 8,
      title: '棕色',
    },
    {
      id: 9,
      title: '灰色',
    },
    {
      id: 10,
      title: '黑色',
    },
    {
      id: 11,
      title: '白色',
    },
    { id: 12, title: '其他' },
  ]
  //colorList end

  //roleList start
  const roleList = [
    {
      id: 0,
      title: '所有對象',
    },
    {
      id: 1,
      title: '長輩',
    },
    {
      id: 2,
      title: '朋友',
    },
    {
      id: 3,
      title: '同學',
    },
    {
      id: 4,
      title: '師長',
    },
    {
      id: 5,
      title: '戀人',
    },
    {
      id: 6,
      title: '工作伙伴',
    },
    {
      id: 7,
      title: '新生嬰兒',
    },
    {
      id: 8,
      title: '親人',
    },
    { id: 9, title: '新婚夫婦' },
  ]
  //roleList end

  //seasonList start
  const seasonList = [
    {
      id: 0,
      title: '所有季節',
    },
    {
      id: 1,
      title: '春',
    },
    { id: 2, title: '夏' },
    {
      id: 3,
      title: '秋',
    },
    { id: 4, title: '冬' },
    {
      id: 5,
      title: '全年',
    },
  ]
  //seasonList end

  //sortList start
  const sortList = [
    // {
    //   id: 0,
    //   title: '預設排序',
    // },
    {
      id: 1,
      title: 'A-Z',
    },
    {
      id: 2,
      title: 'Z-A',
    },
  ]
  //sortList end
  // ----------篩選部分的資料宣告end----------
  return (
    <DefaultLayout
      activePage={activePage}
      className="flex flex-col justify-center items-center"
    >
      {/* 置中 & 背景色 */}
      <main className="flex flex-col justify-center items-center bg-white">
        {/* 主要容器 */}
        <div className="bg-white container justify-center flex flex-col items-start columns-12 static">
          {/* 麵包屑 */}
          <div className="bg-white flex flex-col flex-wrap gap-4 py-6 w-full">
            {underlines.map((u) => (
              <div key={u}>
                <Breadcrumbs underline={u}>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>花與遊戲</BreadcrumbItem>
                  <BreadcrumbItem color="primary">花圖鑑</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>
          {/* ------------花圖鑑首頁banner start ------------*/}
          {/* banner圖  */}
          <div className="relative w-full">
            {/* banner圖 */}
            <Image
              alt="花圖鑑首頁banner圖"
              src="/assets/intro/intro_flower_banner.png"
              className="rounded-2xl"
            />
            {/* 文字方塊 */}
            <Card className="flex flex-row p-3 columns-2 m-4 md:m-10 absolute top-0 left-0 z-10 rounded-lg opacity-80">
              <CardBody className="p-0">
                <div className="flex flex-col gap-1 items-start justify-between">
                  {/* <h1>
                    "Si tu aimes une fleur qui se trouve dans un etoile, c'est
                    doux, la nuit, de regarder le ciel."─Le petit Prince
                  </h1> */}
                  <p>
                    「如果你愛著一朵盛開在浩瀚星海裡的花，那麼當你抬頭仰望繁星時，便會感到幸福。」─《小王子Le
                    Petit Prince》
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
          {/* ------------花圖鑑首頁banner end------------*/}

          {/* ------------清水模背景區塊 start------------*/}
          <div className="bg-[url('/assets/intro/vintage_speckles.png')]">
            <div className="m-8">
              {/* --------search & select & sort end--------*/}

              <Subtitle text="花圖鑑" />
              <div className="flex py-10 px-15 justify-between w-full">
                {/* ------------searchbar start------------*/}
                <div className="flex max-w-xs">
                  {/* 輸入框 */}
                  <div className="flex w-full rounded-md shadow-sm">
                    <input
                      type="text"
                      name="search"
                      id="price"
                      className="block text-base w-full rounded-l-xl px-4 py-2 text-tertiary placeholder:text-tertiary-gray-100 border-1 border-tertiary-gray-200 focus:ring-0 focus:outline-none focus:border-teal focus:border-primary-100"
                      placeholder="輸入關鍵字"
                    />
                    <button className="bg-primary-100 w-12 flex justify-center items-center rounded-r-xl hover:bg-[#85B5A7]">
                      <CiSearch fill="white" className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                {/* ------------searchbar end------------ */}

                {/* ------------filter start------------*/}
                <div className="hidden sm:flex flex-cols items-center space-x-2 ">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['所有場合']}
                    label="場合"
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {occList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="hidden sm:flex flex-cols items-center space-x-4">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['所有顏色']}
                    label="顏色"
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {colorList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="hidden sm:flex flex-cols items-center space-x-4">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['所有對象']}
                    label="對象"
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {roleList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="hidden sm:flex flex-cols items-center space-x-4">
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['所有季節']}
                    label="季節"
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {seasonList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* ------------filter end------------*/}
                {/* ------------sort start------------*/}
                <div className="hidden sm:flex flex-cols items-center space-x-4">
                  {/* <p className="text-lg text-tertiary-black whitespace-nowrap">
                    排序
                  </p> */}
                  <Select
                    placeholder="Select"
                    defaultSelectedKeys={['A-Z']}
                    label="排序"
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {sortList.map((item, index) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* ------------sort end------------*/}
              </div>
              {/* --------search & select & sort end--------*/}
            </div>

            {/* --------花朵卡片群組-------- */}
            <div className="grid gap-y-4 my-14 ">
              <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1 text-center">
                          詳細介紹
                        </ModalHeader>
                        <ModalBody className="flex flex-row">
                          <div className="max-w-60 mx-auto ">
                            <Image
                              isZoomed
                              removeWrapper
                              alt="flowerCard"
                              src={modalData ? modalData.flower_image_2 : ''}
                            />
                          </div>
                          <div className="flex flex-col m-12 justify-center">
                            <ul>
                              <li>{modalData ? modalData.intro : ''}</li>

                              <hr className="h-px my-8 border-1 border-secondary-100" />
                              <div className="list-disc">
                                <li>
                                  花期:{modalData ? modalData.season : ''}
                                </li>
                                <li>
                                  常見顏色:{modalData ? modalData.color : ''}
                                </li>
                                <li>
                                  適合對象:{modalData ? modalData.role : ''}
                                </li>
                                <li>
                                  適合場合:{modalData ? modalData.occ : ''}
                                </li>
                              </div>
                            </ul>
                            <div className="justify-center flex m-3">
                              <MyButton color="secondary" size="md">
                                販售店家
                              </MyButton>
                            </div>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>

                {introData.map((item, index) => (
                  <Card
                    key={index}
                    onPress={() => handleOpen(item)} // 將卡片的相關資料傳遞給 handleOpen 函數
                    shadow="none"
                    isPressable
                    className="bg-transparent"
                  >
                    <CardBody className="static overflow-visible p-0 bg-transparent">
                      <div className="bg-transparent">
                        <Image
                          isZoomed
                          removeWrapper
                          shadow="none"
                          radius="none"
                          width="130%"
                          alt={item.name}
                          className="w-auto object-cover h-auto opacity-100"
                          src={item.flower_image_1}
                        />
                      </div>
                    </CardBody>
                    <CardHeader className="block text-center bg-transparent">
                      <div>
                        <p class="text-xl truncate ...">{item.name}</p>
                      </div>
                      <div>
                        <p class="text-base truncate ...">{item.engname}</p>
                      </div>
                    </CardHeader>
                    {/* <CardFooter className="text-small justify-between"></CardFooter> */}
                  </Card>
                ))}
              </div>
              <div class="flex justify-center">
                <MyButton>查看更多</MyButton>
              </div>
            </div>
            {/* --------花朵卡片群組-------- */}
          </div>
          {/* ------------清水模背景區塊 end------------*/}
        </div>
      </main>
    </DefaultLayout>
  )
}
