import React, { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import ColorSelector from './ColorSelector'
import Image from 'next/image'
const MainFlowerComponent = () => {
  const [selectedFlower, setSelectedFlower] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const dragY = useMotionValue(0)
  const DRAG_BUFFER = 50
  const ITEM_HEIGHT = 160 // 每个花朵项的高度，包括间距
  const SPRING_OPTIONS = {
    type: 'spring',
    mass: 9,
    stiffness: 400,
    damping: 50,
  }
  const flowers = [
    {
      id: 1,
      src: '/custom/custom/flowers/03063469700328e035c37f615e1f3d7d.jpg',
      name: '玫瑰',
      colors: ['red', 'yellow', 'blue'],
    },
    {
      id: 2,
      src: '/custom/custom/flowers/0c19e718edd2ba4ed62b185ba0d958c8.jpg',
      name: '百合',
      colors: ['pink', 'yellow'],
    },
    {
      id: 3,
      src: '/custom/custom/flowers/5925d3602969b5e1a4e547075168af80.jpg',
      name: '鬱金香',
      colors: ['pink', 'black', 'red'],
    },
    {
      id: 4,
      src: '/custom/custom/flowers/a04a3b0f8d30f22ca8302eecfcfb9a28.jpg',
      name: '薰衣草',
      colors: ['pink', 'black', 'red', 'purple', 'white'],
    },
    {
      id: 5,
      src: '/custom/custom/flowers/cfbf57db29b572fec135cf7f75532d88.jpg',
      name: '小雛菊',
      colors: ['pink', 'yellow', 'red', 'purple', 'white', 'green'],
    },
  ]

  const handleSelectColor = (color) => {
    console.log(`選擇的顏色是: ${color}`)
    setSelectedFlower(null) // 返回到花朵選擇
  }

  const onDragStart = () => {
    setDragging(true)
  }
  const onDragEnd = () => {
    const y = dragY.get()
    if (y <= -DRAG_BUFFER && imgIndex < flowers.length - 3) {
      setImgIndex((prevIndex) => prevIndex + 1)
    } else if (y >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
    }
  }

  return (
    <>
      {selectedFlower ? (
        <ColorSelector
          itemName={selectedFlower.name}
          itemColors={selectedFlower.colors}
          onConfirm={handleSelectColor}
        />
      ) : (
        <div className="h-full w-full text-tertiary-black flex flex-col justify-start items-center gap-3">
          <div className="text-center">
            <h1 className="text-3xl py-2">主花</h1>
            <p className="text-tertiary-gray-100">
              請選擇您喜歡的主花，然後選擇顏色。
            </p>
          </div>
          <div className="w-full h-full">
            <div className=" w-[150px] h-[580px] overflow-hidden mx-auto pt-4">
              <motion.div
                transition={SPRING_OPTIONS}
                style={{ y: dragY }}
                drag="y"
                onDragEnd={onDragEnd}
                animate={{
                  translateY: `-${imgIndex * 35}%`,
                }}
                dragConstraints={{ top: 0, bottom: 0 }} // 調整拖動範圍
                className="flex flex-col justify-around  items-center h-full  gap-2 "
              >
                {flowers.map((flower) => (
                  <>
                    <div
                      key={flower.id}
                      className="flex flex-col gap-1 cursor-grab active:cursor-grabbing w-auto mt-1"
                    >
                      <div
                        onClick={() => setSelectedFlower(flower)}
                        style={{ backgroundImage: `url(${flower.src})` }}
                        className="bg-cover bg-center aspect-square w-[150px] rounded-xl object-cover cursor-pointer"
                        src={flower.src}
                      ></div>
                      <p className="text-center">{flower.name}</p>
                    </div>
                  </>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MainFlowerComponent
