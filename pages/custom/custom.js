import { useState, useEffect } from 'react'
import logo from '@/assets/singleLogo.svg'
import Image from 'next/image'
import { CiUndo } from 'react-icons/ci'
import { MyButton } from '@/components/btn/mybutton'
import BottomSheetButton from '@/components/custom/custom/BottomSheetButton'
import 'react-spring-bottom-sheet/dist/style.css'
import items from '@/components/custom/custom/items'
import MainFlowerComponent from '@/components/custom/custom/MainFlowerComponent'
import AccentFlowerComponent from '@/components/custom/custom/AccentFlowerComponent'
import LeafComponent from '@/components/custom/custom/LeafComponent'
import PackageComponent from '@/components/custom/custom/PackageComponent'
import CardComponent from '@/components/custom/custom/CardComponent'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { IoLayersOutline } from 'react-icons/io5'
import ShareModal from '@/components/custom/common/Modal'
import Link from 'next/link'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'
import LayerContent from '@/components/custom/custom/LayerContent'

export default function Custom() {
  const [openedIndex, setOpenedIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState('main')
  const [storeData, setStoreData] = useState(null)
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0)

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
    fetchStoreData(store.id)
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const urls = [
  //         'http://localhost:3005/api/share-colors',
  //         'http://localhost:3005/api/share-occs',
  //         'http://localhost:3005/api/share-roles',
  //       ]

  //       const responses = await Promise.all(urls.map((url) => fetch(url)))
  //       const dataPromises = responses.map((response) => response.json())
  //       const results = await Promise.all(dataPromises)

  //       if (
  //         results[2].status === 'success' &&
  //         Array.isArray(results[2].data.roles)
  //       ) {
  //         setRoles(results[2].data.roles)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   console.log('storeData 更新後的值:', storeData)

  //   if (storeData && storeData.items) {
  //     // 將每個 component 的數據更新為對應的類型數據
  //     Object.keys(components).forEach((key) => {
  //       // 檢查 storeData.items 中是否有對應的 category type
  //       if (storeData.items[key]) {
  //         // 如果有，更新相應 component 的 data 屬性
  //         components[key].data = storeData.items[key]
  //         const currentData = storeData.items[currentPage]
  //       }
  //     })
  //   }
  // }, [storeData])
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

    console.log(currentData)
  }, [storeData, currentPage]) // 依賴 storeData 和 currentPage

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

  return (
    <>
      {selectedStore ? (
        <div className="h-screen w-screen bg-secondary-300 flex flex-col sm:flex-row">
          <div className="flex flex-col sm:w-8/12 h-full ">
            <nav className="w-full h-14 flex flex-row items-center px-5 gap-4 sm:h-16">
              <div className="text-center w-10 sm:h-16 cursor-pointer">
                <Link href="/">
                  <Image className="w-full h-full" src={logo} alt="" />
                </Link>
              </div>
              <div className="w-full h-full flex flex-row justify-between items-center">
                <div className="text-xl text-tertiary-black flex flex-col items-center mt-2 sm:mt-1 sm:text-3xl cursor-pointer">
                  <CiUndo />
                  <p className="text-xs">reset</p>
                </div>
                <div className="sm:hidden ">
                  <MyButton size="xs" color="secondary200">
                    完成
                  </MyButton>
                </div>
                <div className="hidden sm:block">
                  <MyButton size="md" color="secondary200">
                    完成
                  </MyButton>
                </div>
              </div>
            </nav>

            <main className="flex-1 w-full h-auto relative">
              {/* <div className="rounded-full border-1 text-tertiary-black border-tertiary-black w-16 h-16 bg-secondary-200 flex flex-col items-center justify-center m-4">
              <div className="text-3xl">
                <IoLayersOutline />
              </div>
              <p>圖層</p>
              <IoLayersOutline />
            </div> */}
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
                <BreadcrumbItem key="main" isCurrent={currentPage === 'main'}>
                  主花
                </BreadcrumbItem>
                <BreadcrumbItem
                  key="accent"
                  isCurrent={currentPage === 'accent'}
                >
                  配花
                </BreadcrumbItem>
                <BreadcrumbItem key="leaf" isCurrent={currentPage === 'leaf'}>
                  葉材
                </BreadcrumbItem>
                <BreadcrumbItem
                  key="package"
                  isCurrent={currentPage === 'package'}
                >
                  包裝
                </BreadcrumbItem>
                <BreadcrumbItem key="card" isCurrent={currentPage === 'card'}>
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
  )
}
