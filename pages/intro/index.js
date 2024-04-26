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
// ----------季節篩選器部分start----------
// 花卡片的季節狀態及更新函數
const [selectedSeason, setSelectedSeason] = useState('所有季節')

// 季節選擇器改變時的處理函數
const handleSeasonChange = (e) => {
  // 清空搜尋字串
  setSearchTerm('')
  
  setSelectedOccasion('所有場合')
    setSelectedColor('所有顏色')
    setSelectedRole('所有對象')
    setSortOption('A→Z')
  const selectedSeason = e.target.value
  console.log(selectedSeason)
  setSelectedSeason(selectedSeason)

  // 根據選擇的季節進行相應的操作
  // 如果選擇了「所有季節」，則設置所有的花朵資料 否則，根據選擇的季節進行篩選
  if (selectedSeason === '所有季節') {
    setFlowerData(introData)
  } else {
    // 在這裡使用 selectedSeason 來篩選 introData 中的花朵資料
    const filteredData = introData.filter((flower) =>
      flower.season.includes(selectedSeason)
    )
    setFlowerData(filteredData)
  }
}
// ----------季節篩選器部分start----------
  // ----------對象篩選器部分start----------
  // 花卡片的對象狀態及更新函數
  const [selectedRole, setSelectedRole] = useState('所有對象')
  // 對象選擇器改變時的處理函數
  const handleRoleChange = (e) => {
    // 清空搜尋字串
    setSearchTerm('')
    
    setSelectedOccasion('所有場合')
    setSelectedColor('所有顏色')
    setSelectedSeason('所有季節')
    setSortOption('A→Z')
    
    const selectedRole = e.target.value
    console.log(selectedRole)
    setSelectedRole(selectedRole)

    // 根據選擇的對象進行相應的操作
    // 如果選擇了「所有對象」，則設置所有的花朵資料 否則，根據選擇的對象進行篩選
    if (selectedRole === '所有對象') {
      setFlowerData(introData)
    } else {
      // 在這裡使用 selectedRole 來篩選 introData 中的花朵資料
      const filteredData = introData.filter((flower) =>
        flower.role.includes(selectedRole)
      )
      setFlowerData(filteredData)
    }
  }
  // ----------對象篩選器部end----------
  // ----------顏色篩選器部分start----------
  // 花卡片的顏色狀態及更新函數
  const [selectedColor, setSelectedColor] = useState('所有顏色')
  // 花卡片的顏色選擇器改變時的處理函數
  const handleColorChange = (e) => {
    // 清空搜尋字串
    setSearchTerm('')
    
    setSelectedOccasion('所有場合')
    setSelectedRole('所有對象')
    setSelectedSeason('所有季節')
    setSortOption('A→Z')
    const selectedColor = e.target.value
    console.log(selectedColor)
    setSelectedColor(selectedColor)

    // 根據選擇的顏色進行相應的操作
    // 在這裡可以執行顏色篩選或其他相應的操作
    // 如果選擇了「所有場合」，則設置所有的花朵資料 否則，根據選擇的場合進行篩選
    if (selectedColor === '所有顏色') {
      setFlowerData(introData)
    } else {
      // 在這裡使用 selectedColor 來篩選 introData 中的花朵資料
      const filteredData = introData.filter((flower) =>
        flower.color.includes(selectedColor)
      )
      setFlowerData(filteredData)
    }
  }
  // ----------顏色篩選器部分end----------

  // ----------場合過濾器宣告部分start----------
  // const [selectedOption, setSelectedOption] = useState('')

  // 場合選擇狀態及更新函數
  const [selectedOccasion, setSelectedOccasion] = useState('所有場合')

  // 場合選擇器改變時的處理函數
  const handleOccasionChange = (e) => {
    // // 清空場合篩選器的選擇
    // setSelectedOccasion('')
    // 清空搜尋字串
    setSearchTerm('')
    
    setSelectedColor('所有顏色')
    setSelectedRole('所有對象')
    setSelectedSeason('所有季節')
    setSortOption('A→Z')
    

    const selectedOccasion = e.target.value
    console.log(selectedOccasion)
    console.log('12333333333')
    setSelectedOccasion(selectedOccasion)

    // 如果沒有選擇任何場合，則返回所有花朵資料
    // 否則，根據選擇的場合進行篩選
    // if (!selectedOccasion) {

    // 如果選擇了「所有場合」，則設置所有的花朵資料 否則，根據選擇的場合進行篩選
    if (selectedOccasion === '所有場合') {
      setFlowerData(introData)
    } else {
      // 在這裡使用 selectedOccasion 來篩選 introData 中的花朵資料
      const filteredData = introData.filter((flower) =>
        flower.occ.includes(selectedOccasion)
      )
      setFlowerData(filteredData)
    }
  }
  // ----------場合過濾器宣告部分end----------
  // ----------看更多宣告部分start----------
  const [visibleCards, setVisibleCards] = useState(12) // 控制當前顯示的卡片數量
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false) // 控制是否禁用「查看更多」按鈕handleOccasionChange

  const handleLoadMore = () => {
    const newVisibleCards = visibleCards + 8 // 每次顯示8張卡片
    setVisibleCards(newVisibleCards)

    if (newVisibleCards >= flowerData.length) {
      setIsLoadMoreDisabled(true) // 如果已經顯示了所有卡片，禁用按鈕
    }
  }

  // ----------看更多宣告部分end------------

  // ----------搜尋宣告部分start----------
  const [searchTerm, setSearchTerm] = useState('') // 儲存輸入框的值

  const handleSearch = () => {
    // 在這裡使用 searchTerm 執行搜尋
    const filteredData = introData.filter((flower) =>
      Object.values(flower).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    )
    // console.log(searchTerm) // 繡球
    // console.log(filteredData) // 搜到的資料陣列 [2]

    setFlowerData(filteredData)

    // let y = document.getElementById('selectItems')
    // console.log(y)

    // let x = document.querySelectorAll('.occitem')
    // console.log(x)

    // 設置場合選擇器的值為「所有XX」
     
    setSelectedOccasion('所有場合')
    setSelectedColor('所有顏色')
    setSelectedRole('所有對象')
    setSelectedSeason('所有季節')
    setSortOption('A→Z')
  
    // let selectedOccasion = '23'
    // console.log(selectedOccasion)
    // setSelectedOccasion(selectedOccasion)
    // console.log(setSelectedOccasion(''))
    // console.log('1222222222')

    //   // 找到已選項目的值
    // const selectedValue = selectedOccasion;
    // if (selectedValue) {
    //   // 從 selectedOccasion 中移除已選項目的值
    //   const updatedSelectedOccasion = '';
    //   setSelectedOccasion(updatedSelectedOccasion);
    // }
  }

  // ----------搜尋宣告部分end------------

  // ----------排序宣告部分start----------
  const [flowerData, setFlowerData] = useState(introData) // 初始花卡片資料
  const [sortOption, setSortOption] = useState('A→Z') // 初始排序選項

  // 選擇器改變時的處理函數
  const handleSortChange = (e) => {
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    setSortOption(e.target.value)
    // 根據選項的標題來確定排序方向
    if (e.target.value === 'A→Z') {
      sortFlowers('A→Z')
    } else {
      sortFlowers('Z→A')
    }
  }

  // 排序花卡片資料的函數
  // const sortFlowers = (direction) => {
  //   const sortedData = [...flowerData].sort((a, b) => {
  //     if (direction === 'A→Z') {
  //       console.log(sortedData)
  //       console.log('123')
  //       return a.engname.localeCompare(b.engname) // A 到 Z
  //     } else if (direction === 'Z→A') {
  //       // console.log('123')
  //       // console.log(a.engname)
  //       return b.engname.localeCompare(a.engname) // Z 到 A
  //     }
  //     // 如果 direction 不是 A→Z 或 Z→A，則預設遞增排序
  //     return a.engname.localeCompare(b.engname)
  //   })
  //   setFlowerData(sortedData)
  // }
  const sortFlowers = (direction) => {
    setFlowerData((flowerData) => {
      return flowerData.sort((a, b) => {
        if (direction === 'A→Z') {
          return a.engname.localeCompare(b.engname) // A 到 Z
        } else if (direction === 'Z→A') {
          return b.engname.localeCompare(a.engname) // Z 到 A
        }
        // 如果 direction 不是 A→Z 或 Z→A，則預設遞增排序
        return a.engname.localeCompare(b.engname)
      })
    })
  }

  // ----------排序宣告部分end----------

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

  // ----------篩選資料Data宣告start----------
  const [activePage, setActivePage] = useState('intro')
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
      title: '紅',
    },
    {
      id: 2,
      title: '橘',
    },
    {
      id: 3,
      title: '黃',
    },
    // {
    //   id: 4,
    //   title: '綠',
    // },
    {
      id: 5,
      title: '藍',
    },
    {
      id: 6,
      title: '紫',
    },
    {
      id: 7,
      title: '粉',
    },
    // {
    //   id: 8,
    //   title: '棕',
    // },
    // {
    //   id: 9,
    //   title: '灰',
    // },
    // {
    //   id: 10,
    //   title: '黑',
    // },
    {
      id: 11,
      title: '白',
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
    //   title: 'A→Z',
    // },
    {
      id: 1,
      title: 'A→Z',
    },
    {
      id: 2,
      title: 'Z→A',
    },
  ]
  //sortList end
  // ----------篩選資料Data宣告end----------

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
                      id="search"
                      className="block text-base w-full rounded-l-xl px-4 py-2 text-tertiary placeholder:text-tertiary-gray-100 border-1 border-tertiary-gray-200 focus:ring-0 focus:outline-none focus:border-teal focus:border-primary-100"
                      placeholder="輸入關鍵字"
                      value={searchTerm} // 將輸入框的值綁定到 searchTerm
                      onChange={(e) => setSearchTerm(e.target.value)} // 更新 searchTerm 的值
                    />
                    <button
                      className="bg-primary-100 w-12 flex justify-center items-center rounded-r-xl hover:bg-[#85B5A7]"
                      onClick={handleSearch}
                    >
                      <CiSearch fill="white" className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                {/* ------------searchbar end------------ */}

                {/* ------------filter start------------*/}
                <div className="hidden sm:flex flex-cols items-center space-x-2 ">
                  <Select
                    placeholder="所有場合"
                    clearable
                    key={selectedOccasion}
                    // defaultSelectedKeys={['所有場合']}
                    // selectedKeys={[selectedOption]}
                    label="場合"
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    // selectedKeys={selectedOccasion}
                    // onSelectionChange={setSelectedOccasion}
                    // value={setSelectedOccasion}
                    // value={}
                    defaultSelectedKeys={[selectedOccasion]}
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    onChange={handleOccasionChange} // 在選項改變時觸發處理函數
                    // id="selectItems"
                  >
                    {occList.map((item, index) => (
                      <SelectItem
                        // className="occitem"
                        key={item.title}
                        value={item.title.trim()}
                      >
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="hidden sm:flex flex-cols items-center space-x-4">
                  <Select
                    placeholder="所有顏色"
                    // defaultSelectedKeys={['所有顏色']}
                    label="顏色"
                    clearable
                    key={selectedColor}
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    defaultSelectedKeys={[selectedColor]}
                    onChange={handleColorChange} // 在選項改變時觸發處理函數
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
                    placeholder="所有對象"
                    // defaultSelectedKeys={['所有對象']}
                    label="對象"
                    clearable
                    key={selectedRole}
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    defaultSelectedKeys={[selectedRole]}
                    onChange={handleRoleChange}
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
                    placeholder="所有季節"
                    // defaultSelectedKeys={['所有季節']}
                    label="季節"
                    clearable
                    key={selectedSeason}
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    onChange={handleSeasonChange}
                    defaultSelectedKeys={[selectedSeason]}
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
                  <Select
                    placeholder="請選擇"
                    defaultSelectedKeys={[sortOption]}
                    // defaultValue={['A→Z']}
                    label="排序"
                    clearable
                    key={sortOption}
                    labelPlacement="inside"
                    className="max-w-xs w-36"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    onChange={(e) => handleSortChange(e)}
                    // defaultSelectedKeys={[sortOption]}
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

                {flowerData.slice(0, visibleCards).map((item, index) => (
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
                        <p className="text-xl truncate ...">{item.name}</p>
                      </div>
                      <div>
                        <p className="text-base truncate ...">{item.engname}</p>
                      </div>
                    </CardHeader>
                    {/* <CardFooter className="text-small justify-between"></CardFooter> */}
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <MyButton
                  onClick={handleLoadMore}
                  isDisabled={isLoadMoreDisabled}
                >
                  查看更多
                </MyButton>
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
