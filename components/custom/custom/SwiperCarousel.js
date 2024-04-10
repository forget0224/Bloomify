import React, { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const DRAG_BUFFER = 50
const SPRING_OPTIONS = {
  type: 'spring',
  mass: 9,
  stiffness: 400,
  damping: 50,
}

export default function SwiperCarousel({ productList, setSelectedFlower }) {
  const dragX = useMotionValue(0)
  const [imgIndex, setImgIndex] = useState(0)
  const cardWidth = 125 // Width of the card
  const gap = 16 // Gap between cards
  const [isDragging, setIsDragging] = useState(false)

  const onDragStart = () => {
    setIsDragging(true)
  }

  const onDragEnd = () => {
    setIsDragging(false)
    const x = dragX.get()
    if (x <= -DRAG_BUFFER && imgIndex < productList.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
    }
  }

  const handleClick = (product) => {
    if (!isDragging) {
      setSelectedFlower(product)
    }
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * (cardWidth + gap)}px` }}
        transition={SPRING_OPTIONS}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="flex justify-start cursor-grab active:cursor-grabbing h-full"
      >
        {productList.map((product) => (
          <div key={product.id} className="flex flex-col items-center mr-4">
            <div
              onClick={() => handleClick(product)}
              style={{ backgroundImage: `url(${product.src})` }}
              className="bg-cover bg-center aspect-square w-[125px] rounded-xl object-cover"
            ></div>
            <p>{product.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
