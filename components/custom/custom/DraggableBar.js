import { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
const DraggableBar = ({
  items,
  onItemSelect,
  itemHeight,
  dragBuffer,
  className,
}) => {
  const dragY = useMotionValue(0)
  const [imgIndex, setImgIndex] = useState(0)
  // console.log(items)
  const onDragEnd = () => {
    const y = dragY.get()
    if (y <= -dragBuffer && imgIndex < items.length - 3) {
      setImgIndex((prevIndex) => prevIndex + 1)
    } else if (y >= dragBuffer && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
    }
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        transition={{ type: 'spring', mass: 9, stiffness: 400, damping: 50 }}
        style={{ y: dragY }}
        drag="y"
        onDragEnd={onDragEnd}
        animate={{
          translateY: `-${imgIndex * itemHeight}%`,
        }}
        dragConstraints={{ top: 0, bottom: 0 }}
        className="flex flex-col justify-around items-center h-full gap-2"
      >
        {items ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 cursor-grab active:cursor-grabbing w-auto mt-1"
              onClick={() => {
                onItemSelect(item.attributes, item.category_name)
              }}
            >
              <div
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
                className=" bg-center bg-no-repeat aspect-square w-[150px] rounded-xl object-fit   cursor-pointer"
              ></div>
              <p className="text-center">{item.category_name}</p>
            </div>
          ))
        ) : (
          <div className="w-full ">
            <p> 目前店家尚未上架商品</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default DraggableBar
