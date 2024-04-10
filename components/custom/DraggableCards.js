import React, { useState } from 'react'
import { Card, CardBody } from '@nextui-org/react'
import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa'
const DraggableCards = ({ cards, direction = 'horizontal' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardSize = 300 // 卡片的尺寸（宽度或高度）
  const gap = 16 // 卡片之间的间隙
  const totalSize = cards.length * (cardSize + gap)
  const dragValue = useMotionValue(0)

  const isHorizontal = direction === 'horizontal'

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="flex items-center justify-center">
      {isHorizontal ? (
        <FaArrowLeft className="cursor-pointer text-2xl" onClick={handlePrev} />
      ) : (
        <FaArrowUp className="cursor-pointer text-2xl" onClick={handlePrev} />
      )}
      <div
        className={`overflow-hidden ${
          isHorizontal ? 'w-[320px]' : 'h-[320px]'
        } mx-4`}
      >
        <motion.div
          drag={isHorizontal ? 'x' : 'y'}
          dragConstraints={{
            [isHorizontal ? 'left' : 'top']: -(totalSize - cardSize),
            [isHorizontal ? 'right' : 'bottom']: 0,
          }}
          style={isHorizontal ? { x: dragValue } : { y: dragValue }}
          className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} gap-4`}
          animate={
            isHorizontal
              ? { x: -(currentIndex * (cardSize + gap)) }
              : { y: -(currentIndex * (cardSize + gap)) }
          }
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              className={`${isHorizontal ? 'w-[300px]' : 'h-[300px]'}`}
            >
              <CardBody>
                <Image src={card.src} />
                <p>{card.name}</p>
                {/* <p>{card.shop}</p> */}
              </CardBody>
            </Card>
          ))}
        </motion.div>
      </div>
      {isHorizontal ? (
        <FaArrowRight
          className="cursor-pointer text-2xl"
          onClick={handleNext}
        />
      ) : (
        <FaArrowDown className="cursor-pointer text-2xl" onClick={handleNext} />
      )}
    </div>
  )
}

export default DraggableCards
