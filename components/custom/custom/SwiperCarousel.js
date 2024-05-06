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
  // const cardWidth = 125 // Width of the card
  const cardWidth = 28 // Width of the card
  const gap = 6 // Gap between cards
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
    <div className="w-full h-full overflow-hidden ">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{
          x: dragX,
          height:
            items[0].attributes &&
            items[0].attributes.length > 0 &&
            (items[0].attributes[0].product_category === 'main' ||
              items[0].attributes[0].product_category === 'accent')
              ? '100%'
              : '250px',
        }}
        // animate={{ translateX: `-${imgIndex * (cardWidth + gap)}px` }}
        animate={{ translateX: `-${imgIndex * (cardWidth + gap)}%` }}
        transition={SPRING_OPTIONS}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="flex justify-start cursor-grab active:cursor-grabbing  items-center gap-2"
      >
        {items ? (
          items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                onClick={() =>
                  onItemSelect(item.attributes, item.category_name)
                }
                style={{
                  backgroundImage: `url(${item.category_url})`,
                  backgroundSize:
                    item.attributes &&
                    item.attributes.length > 0 &&
                    (item.attributes[0].product_category === 'package' ||
                      item.attributes[0].product_category === 'card')
                      ? 'cover'
                      : 'contain',
                }}
                className="bg-cover bg-center aspect-square w-[120px] rounded-xl bg-no-repeat"
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
