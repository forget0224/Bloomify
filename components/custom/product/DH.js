import { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Skeleton,
} from '@nextui-org/react'
import { motion, useMotionValue } from 'framer-motion'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { CiShoppingCart } from 'react-icons/ci'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { useRouter } from 'next/router'
import { useColors } from '@/hooks/use-color'
import CustomCheckbox from '../common/CustomCheckbox'
import { useFlowerCart } from '@/hooks/use-flowerCart'

import AddFav from '@/components/custom/common/AddFav'
const DraggableProductList = ({ productList }) => {
  const router = useRouter()
  const dragBuffer = 50
  const dragX = useMotionValue(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [cardMinWidth, setCardMinWidth] = useState(125) // Minimum card width
  const [cardMinGap, setCardMinGap] = useState(14) // Minimum card width
  const [isDragging, setIsDragging] = useState(false)
  const color = useColors()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardMinWidth(170)
        setCardMinGap(10)
      } else {
        setCardMinWidth(285)
        setCardMinGap(14)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
    }
  }

  const handleNext = () => {
    if (imgIndex < productList.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1)
    }
  }
  const onDragStart = () => {
    setIsDragging(true)
  }

  const onDragEnd = () => {
    setIsDragging(false)
    const x = dragX.get()
    if (x <= -dragBuffer && imgIndex < productList.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1)
    } else if (x >= dragBuffer && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
    }
  }

  const handleCardClick = (id) => {
    router.push(`/custom/${id}`)
  }

  return (
    <div className="   max-w-[1200px] sm:px-[10px] sm:py-3  py-2 ">
      <motion.div
        transition={{ type: 'spring', mass: 9, stiffness: 400, damping: 50 }}
        drag="x"
        style={{ x: dragX }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="grid grid-flow-col auto-cols-max gap-3  "
        animate={{
          translateX: `-${imgIndex * (cardMinWidth + cardMinGap)}px`,
        }}
        dragConstraints={{ left: 0, right: 0 }}
      >
        {' '}
        {productList.map((item) => {
          const colorCode = color.find(
            (color) => color.name === item.color_name
          )?.code
          return (
            <Card
              shadow="sm"
              key={item.template_id}
              className="cursor-grab active:cursor-grabbing"
              style={{ width: `${cardMinWidth}px` }}
              isPressable
              // onPress={handleCardClick(item.id)}
              onClick={() => handleCardClick(item.template_id)}
            >
              <CardBody className="p-0  bg-secondary-200">
                <div
                  style={{ backgroundImage: `url(${item.image_url})` }}
                  className="bg-contain bg-center bg-no-repeat aspect-video w-full rounded-t-xl"
                ></div>
              </CardBody>
              <CardHeader className="flex flex-col items-start">
                <div className="flex flex-row items-center justify-between w-full">
                  <h1 className="sm:text-lg text:md">{item.template_name}</h1>
                  <div className="cursor-pointer">
                    <AddFav
                      templateId={item.template_id}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <p className="sm:text-sm text-xs  text-tertiary-gray-100 text-left">
                  {item.store_name}
                </p>{' '}
                {colorCode && (
                  <CustomCheckbox
                    width={'w-4'}
                    height={'h-4'}
                    value={item.color_name}
                    bgColor={colorCode}
                  />
                )}
                {/* bgColor={code} */}
              </CardHeader>
              <CardFooter className=" justify-end">
                <p className="sm:text-lg text-md">
                  {item.discount !== 0 ? (
                    <>
                      <span className="line-through">${item.total_price}</span>
                      <span className="ml-2 text-danger">
                        ${parseInt(item.total_price) - parseInt(item.discount)}
                      </span>
                    </>
                  ) : (
                    <>${item.total_price}</>
                  )}
                </p>
              </CardFooter>
            </Card>
          )
        })}{' '}
      </motion.div>
      <div className="flex flex-row items-center text-2xl justify-end cursor-pointer  gap-3  w-full">
        <GoArrowLeft onClick={handlePrev} className="text-tertiary-black " />

        <GoArrowRight onClick={handleNext} className="text-tertiary-black " />
      </div>
    </div>
  )
}

export default DraggableProductList
