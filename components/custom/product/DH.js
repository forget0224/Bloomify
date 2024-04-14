import { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react'
import { motion, useMotionValue } from 'framer-motion'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { CiShoppingCart } from 'react-icons/ci'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

const DraggableProductList = ({ productList }) => {
  const dragBuffer = 50
  const dragX = useMotionValue(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [cardMinWidth, setCardMinWidth] = useState(125) // Minimum card width
  const [cardMinGap, setCardMinGap] = useState(14) // Minimum card width

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

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -dragBuffer && imgIndex < productList.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1)
    } else if (x >= dragBuffer && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
    }
  }

  const handleHeartClick = () => {
    setIsHeart(!isHeart)
  }

  const [isHeart, setIsHeart] = useState(false)

  return (
    <div className=" sm:overflow-hidden  max-w-[1200px]">
      <motion.div
        transition={{ type: 'spring', mass: 9, stiffness: 400, damping: 50 }}
        drag="x"
        style={{ x: dragX }}
        onDragEnd={onDragEnd}
        className="grid grid-flow-col auto-cols-max gap-4 sm:gap-4 sm:pr-8 sm:py-3  py-2 "
        animate={{
          translateX: `-${imgIndex * (cardMinWidth + cardMinGap)}px`,
        }}
        dragConstraints={{ left: 0, right: 0 }}
      >
        {productList.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            className="cursor-grab active:cursor-grabbing"
            style={{ width: `${cardMinWidth}px` }}
          >
            <CardBody className="p-0">
              <div
                style={{ backgroundImage: `url(${item.src})` }}
                className="bg-cover bg-center aspect-video w-full rounded-t-xl"
              ></div>
            </CardBody>
            <CardHeader className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="sm:text-lg text:md">{item.name}</h1>
                <div className="cursor-pointer" onClick={handleHeartClick}>
                  {isHeart ? (
                    <IoIosHeartEmpty className="text-danger text-xl" />
                  ) : (
                    <IoIosHeart className="text-danger text-xl" />
                  )}
                </div>
              </div>
              <p className="sm:text-sm text-xs  text-tertiary-gray-100 text-left">
                {item.store}
              </p>
            </CardHeader>
            <CardFooter className=" justify-between">
              <p className="sm:text-lg text-md">
                {item.discount !== 0 ? (
                  <>
                    <span className="line-through">${item.price}</span>
                    <span className="ml-2 text-danger">
                      ${parseInt(item.price) - parseInt(item.discount)}
                    </span>
                  </>
                ) : (
                  <>${item.price}</>
                )}
              </p>
              <p className="text-base items-center">
                <CiShoppingCart className="text-primary-100 h-6 w-6 cursor-pointer" />
              </p>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
      <div className="flex flex-row items-center text-2xl justify-end cursor-pointer  gap-3  w-full">
        <GoArrowLeft onClick={handlePrev} className="text-tertiary-black " />

        <GoArrowRight onClick={handleNext} className="text-tertiary-black " />
      </div>
    </div>
  )
}

export default DraggableProductList
