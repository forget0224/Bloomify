import { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react'
import { motion, useMotionValue } from 'framer-motion'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { CiShoppingCart } from 'react-icons/ci'

const DraggableProductList = ({ productList }) => {
  const [isHeart, setIsHeart] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(300) // Default card width
  const [slideCount, setSlideCount] = useState(1) // Default slide count
  const dragX = useMotionValue(0)

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) {
        setCardWidth(300) // Set card width for mobile
        setSlideCount(1) // Set slide count for mobile
      } else {
        setCardWidth(300) // Set card width for desktop
        setSlideCount(3) // Set slide count for desktop
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)

    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  const onDragEnd = () => {
    const x = dragX.get()
    if (
      x <= -cardWidth * slideCount &&
      imgIndex < productList.length - slideCount
    ) {
      setImgIndex((prevIndex) => prevIndex + slideCount)
    } else if (x >= cardWidth * slideCount && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - slideCount)
    }
  }

  const handleHeartClick = () => {
    setIsHeart(!isHeart)
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        transition={{ type: 'spring', mass: 9, stiffness: 400, damping: 50 }}
        drag="x"
        style={{ x: dragX }}
        onDragEnd={onDragEnd}
        className="flex flex-row justify-around items-center h-full gap-4"
        animate={{
          translateX: `-${imgIndex * cardWidth}px`,
        }}
      >
        {productList.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            className={`cursor-grab active:cursor-grabbing`}
            style={{ width: `${cardWidth}px` }}
          >
            <CardBody className="p-0">
              <div
                style={{ backgroundImage: `url(${item.src})` }}
                className="bg-cover bg-center aspect-video w-full rounded-t-xl"
              ></div>
            </CardBody>
            <CardHeader className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-lg truncate">{item.name}</h1>
                <div className="cursor-pointer" onClick={handleHeartClick}>
                  {isHeart ? (
                    <IoIosHeartEmpty className="text-danger text-xl" />
                  ) : (
                    <IoIosHeart className="text-danger text-xl" />
                  )}
                </div>
              </div>
              <p className="text-sm text-tertiary-gray-100 text-left">
                {item.store}
              </p>
            </CardHeader>
            <CardFooter className="text-small justify-end">
              <p className="text-lg truncate">
                {item.discount !== '' ? (
                  <>
                    <span className="line-through text-md">${item.price}</span>
                    <span className="ml-2 text-danger">
                      ${parseInt(item.price) - parseInt(item.discount)}
                    </span>
                  </>
                ) : (
                  <>${item.price}</>
                )}
              </p>
              {/* <p className="text-base items-center">
                <CiShoppingCart className="text-primary-100 h-6 w-6 cursor-pointer" />
              </p> */}
            </CardFooter>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}

export default DraggableProductList
