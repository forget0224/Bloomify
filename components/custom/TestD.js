import React, { useState } from 'react'
import { Card, Text } from '@nextui-org/react'
import { motion, useMotionValue } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export function TestD({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardWidth = 300 // 卡片的宽度
  const gap = 16 // 卡片之间的间隙
  const totalWidth = cards.length * (cardWidth + gap)
  const dragX = useMotionValue(0)

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
      <FaArrowLeft className="cursor-pointer text-2xl" onClick={handlePrev} />
      <div className="overflow-hidden w-[320px] mx-4">
        <motion.div
          drag="x"
          dragConstraints={{ left: -(totalWidth - cardWidth), right: 0 }}
          style={{ x: dragX }}
          className="flex gap-4"
          animate={{ x: -(currentIndex * (cardWidth + gap)) }}
        >
          {cards.map((card, index) => (
            <Card key={index} className="w-[300px]">
              <Card.Body>
                <Text h4>{card.title}</Text>
                <Text>{card.description}</Text>
              </Card.Body>
            </Card>
          ))}
        </motion.div>
      </div>
      <FaArrowRight className="cursor-pointer text-2xl" onClick={handleNext} />
    </div>
  )
}
