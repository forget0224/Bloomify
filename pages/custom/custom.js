import { useState } from 'react'
import logo from '@/assets/singleLogo.svg'
import Image from 'next/image'
import { CiUndo } from 'react-icons/ci'
import { MyButton } from '@/components/btn/mybutton'
import BottomSheetButton from '@/components/custom/BottomSheetButton'
import 'react-spring-bottom-sheet/dist/style.css'
import items from '@/components/custom/items'
import MainFlowerComponent from '@/components/custom/MainFlowerComponent'
import AccentFlowerComponent from '@/components/custom/AccentFlowerComponent'
import LeafComponent from '@/components/custom/LeafComponent'
import PackageComponent from '@/components/custom/PackageComponent'
import CardComponent from '@/components/custom/CardComponent'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { IoLayersOutline } from 'react-icons/io5'
import Link from 'next/link'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'
import LayerContent from '@/components/custom/LayerContent'

export default function Custom() {
  const [openedIndex, setOpenedIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState('main')
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0)

  const components = [
    { component: MainFlowerComponent, name: 'main' },
    { component: AccentFlowerComponent, name: 'accent' },
    { component: LeafComponent, name: 'leaf' },
    { component: PackageComponent, name: 'package' },
    { component: CardComponent, name: 'card' },
  ]

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
              <BreadcrumbItem key="accent" isCurrent={currentPage === 'accent'}>
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
            <CurrentComponent
              onPrev={handlePrevComponent}
              onNext={handleNextComponent}
            />
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

        {/* 右邊區塊 */}
      </div>
    </>
  )
}
