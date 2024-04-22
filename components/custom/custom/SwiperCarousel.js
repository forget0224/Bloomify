import React, { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const DRAG_BUFFER = 50
const SPRING_OPTIONS = {
  type: 'spring',
  mass: 9,
  stiffness: 400,
  damping: 50,
}

export default function SwiperCarousel({ items, onItemSelect }) {
  console.log(items)
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
    if (x <= -DRAG_BUFFER && imgIndex < items.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
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
        {items ? (
          items.map((item, index) => (
            <div key={index} className="flex flex-col items-center mr-4">
              <div
                onClick={() =>
                  onItemSelect(item.attributes, item.category_name)
                }
                style={{ backgroundImage: `url(${item.category_url})` }}
                className="bg-cover bg-center aspect-square w-[125px] rounded-xl object-cover"
              ></div>
              <p>{item.category_name}</p>
            </div>
          ))
        ) : (
          <div
            className="flex justify-center items-center w-full "
            style={{ height: 'calc(100% - 64px)' }}
          >
            <p>目前店家尚未上架商品</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
