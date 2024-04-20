import { useState, useEffect } from 'react'

import BottomSheetButton from '@/components/custom/custom/BottomSheetButton'
import 'react-spring-bottom-sheet/dist/style.css'
import MainFlowerComponent from '@/components/custom/custom/MainFlowerComponent'
import AccentFlowerComponent from '@/components/custom/custom/AccentFlowerComponent'
import LeafComponent from '@/components/custom/custom/LeafComponent'
import PackageComponent from '@/components/custom/custom/PackageComponent'
import CardComponent from '@/components/custom/custom/CardComponent'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { IoLayersOutline } from 'react-icons/io5'
import ShareModal from '@/components/custom/common/Modal'
import WorkingArea from '@/components/custom/custom/WorkingArea'
import { ColorProvider } from '@/hooks/use-color'
import { RoleProvider } from '@/hooks/use-role'
import { OccProvider } from '@/hooks/use-occ'
import { FlowerProvider } from '@/hooks/use-flower'
import { StoreProvider } from '@/hooks/use-store'
import CustomNav from '@/components/custom/custom/customNav'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'
import LayerContent from '@/components/custom/custom/LayerContent'
import {
  PiFlowerTulipLight,
  PiLeafLight,
  PiGiftLight,
  PiPencilLineLight,
} from 'react-icons/pi'
import FlowerContent from '@/components/custom/custom/FlowerContent'
import LeafContent from '@/components/custom/custom/LeafContent'
import PackageContent from '@/components/custom/custom/PackageContent'
import GiftCardContent from '@/components/custom/custom/GiftCardContent'
// import LayerContent from '@/components/custom/custom/LayerContent'

export default function Custom() {
  const [openedIndex, setOpenedIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState('main')
  const [storeData, setStoreData] = useState(null)
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0)
  // const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [items, setItems] = useState([])
  // const storeData = useStore()
  const components = [
    { component: MainFlowerComponent, name: 'main' },
    { component: AccentFlowerComponent, name: 'accent' },
    { component: LeafComponent, name: 'leaf' },
    { component: PackageComponent, name: 'package' },
    { component: CardComponent, name: 'card' },
  ]
  const [isModalOpen, setModalOpen] = useState(true)
  const [selectedStore, setSelectedStore] = useState(null)
  const handleConfirm = (store) => {
    setSelectedStore(store)
    setModalOpen(false)
    fetchStoreData(store.store_id)
  }

  useEffect(() => {
    if (storeData && storeData.items) {
      // 設置當前組件的數據
      const currentItems = storeData.items[currentPage] // 根據當前頁面類型獲取數據

      if (currentItems) {
        // 更新當前頁面的數據
        setCurrentData(currentItems)
      } else {
        // 如果沒有數據，設置為空數組或其它默認值
        setCurrentData([])
      }
    }
    // setItemsWithCurrentData(getItems(currentData))
    // console.log(currentData)
  }, [storeData, currentPage]) // 依賴 storeData 和 currentPage
  useEffect(() => {
    if (storeData && storeData.items) {
      // 創建一個新的 items 陣列來更新底部導航欄
      const newItems = [
        {
          icon: <PiFlowerTulipLight />,
          label: '花材',
          name: ['main', 'accent'],
          content: (
            <FlowerContent
              mainItems={storeData.items['main'] || []}
              accentItems={storeData.items['accent'] || []}
            />
          ),
          headerContent: '花材標題',
        },
        {
          icon: <PiLeafLight />,
          label: '葉材',
          name: 'leaf',
          content: <LeafContent items={storeData.items['leaf'] || []} />,
          headerContent: '葉材標題',
        },
        {
          icon: <PiGiftLight />,
          label: '包裝',
          name: 'package',
          content: <PackageContent items={storeData.items['package'] || []} />,
          headerContent: '包裝',
        },
        {
          icon: <PiPencilLineLight />,
          label: '賀卡',
          name: 'card',
          content: <GiftCardContent items={storeData.items['card'] || []} />,
          headerContent: '賀卡',
        },
        {
          icon: <IoLayersOutline />,
          label: '圖層',
          content: <LayerContent />,
          headerContent: '圖層',
        },
      ]
      setItems(newItems)
    }
  }, [storeData]) // 依賴 storeData 變化

  // 確保有一個 state 來存儲當前的數據
  const [currentData, setCurrentData] = useState([])

  const fetchStoreData = async (storeId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/custom/custom/${storeId}`
      )
      const data = await response.json()

      setStoreData(data.data)
    } catch (error) {
      console.error('Failed to fetch store data:', error)
    }
  }

  const handleNextComponent = () => {
    const newIndex =
      (currentComponentIndex + 1 + components.length) % components.length
    setCurrentComponentIndex(newIndex)
    setCurrentPage(components[newIndex].name)
  }

  const handlePrevComponent = () => {
    const newIndex =
      (currentComponentIndex - 1 + components.length) % components.length
    setCurrentComponentIndex(newIndex)
    setCurrentPage(components[newIndex].name)
  }

  const CurrentComponent = components[currentComponentIndex].component
  const handleAction = (key) => {
    const index = components.findIndex((component) => component.name === key)
    if (index !== -1) {
      setCurrentComponentIndex(index)
      setCurrentPage(key)
    }
    console.log(storeData) // 檢查 storeData 結構
  }
  const handleOpen = (index) => {
    setOpenedIndex(index)
  }

  const handleClose = () => {
    setOpenedIndex(null)
  }

  const handlePrev = () => {
    setOpenedIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : items.length - 1
      console.log('Prev index:', newIndex)
      return newIndex
    })
  }

  const handleNext = () => {
    setOpenedIndex((prevIndex) => {
      const newIndex = prevIndex < items.length - 1 ? prevIndex + 1 : 0
      console.log('Next index:', newIndex)
      return newIndex
    })
  }

  const [imageUrl, setImageUrl] = useState('')

  const handleSelectImage = (selectedUrl) => {
    setImageUrl(selectedUrl) // 假設你有方式從選擇器獲取 URL
  }
  return (
    <StoreProvider>
      <FlowerProvider>
        <ColorProvider>
          <OccProvider>
            <RoleProvider>
              <>
                {selectedStore ? (
                  <div className="h-screen w-screen bg-secondary-300 flex flex-col sm:flex-row">
                    <div className="flex flex-col sm:w-8/12 h-full ">
                      <CustomNav />
                      <main className="flex-1 w-full h-auto relative">
                        {/* 圖層的區塊 */}
                        <div className="hidden sm:block">
                          <Popover placement="bottom-start">
                            <PopoverTrigger>
                              <Button
                                isIconOnly
                                className="rounded-full border-1 text-tertiary-black border-tertiary-black w-12 h-12 bg-secondary-200 flex flex-col items-center justify-center m-4"
                              >
                                <IoLayersOutline className="text-3xl" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <LayerContent />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div
                          className="bg-secondary-200 sm:w-[500px] sm:h-[550px] m-auto "
                          style={{
                            backgroundImage:
                              'url("/custom/custom/canvasBg.png")',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                          <WorkingArea />
                        </div>
                      </main>
                    </div>
                    <div className="sm:w-4/12  bg-white sm:flex hidden sm:flex-col h-screen">
                      <div className="py-2 mx-4">
                        <Breadcrumbs
                          separator="/"
                          itemClasses={{
                            separator: 'px-2',
                          }}
                          underline="active"
                          onAction={handleAction}
                        >
                          <BreadcrumbItem
                            key="main"
                            isCurrent={currentPage === 'main'}
                          >
                            主花
                          </BreadcrumbItem>
                          <BreadcrumbItem
                            key="accent"
                            isCurrent={currentPage === 'accent'}
                          >
                            配花
                          </BreadcrumbItem>
                          <BreadcrumbItem
                            key="leaf"
                            isCurrent={currentPage === 'leaf'}
                          >
                            葉材
                          </BreadcrumbItem>
                          <BreadcrumbItem
                            key="package"
                            isCurrent={currentPage === 'package'}
                          >
                            包裝
                          </BreadcrumbItem>
                          <BreadcrumbItem
                            key="card"
                            isCurrent={currentPage === 'card'}
                          >
                            賀卡
                          </BreadcrumbItem>
                        </Breadcrumbs>
                      </div>
                      <div className="h-full">
                        {storeData && (
                          <CurrentComponent
                            items={currentData}
                            onPrev={handlePrevComponent}
                            onNext={handleNextComponent}
                          />
                        )}
                      </div>
                    </div>
                    {/* 底部  */}
                    <div className="bg-secondary-200 h-20 w-full fixed bottom-0 sm:hidden">
                      <div className="flex flex-row gap-2 justify-evenly items-center h-full">
                        {items &&
                          items.map((item, index) => (
                            <BottomSheetButton
                              key={index}
                              {...item}
                              isOpen={openedIndex === index}
                              onOpen={() => handleOpen(index)}
                              onClose={handleClose}
                              onPrev={handlePrev}
                              onNext={handleNext}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <ShareModal
                    isModalOpen={isModalOpen}
                    onConfirm={handleConfirm} // 確保這裡傳入的是函數
                    onClose={() => setModalOpen(false)}
                  />
                )}
              </>
            </RoleProvider>
          </OccProvider>
        </ColorProvider>
      </FlowerProvider>
    </StoreProvider>
  )
}
