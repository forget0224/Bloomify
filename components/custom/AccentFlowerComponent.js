import React, { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import ColorSelector from './ColorSelector'
import Image from 'next/image'
import DraggableBar from './DraggableBar'
import { BsSignStopLights } from 'react-icons/bs'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci'
import ChangeComponent from './ChangeComponent'
const AccentFlowerComponent = ({ onNext, onPrev }) => {
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
    setSelectedFlower(color) // 返回到花朵選擇
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
        <div className="h-full w-full text-tertiary-black flex flex-col justify-start items-center ">
          <div className="text-center min-h-[95px]">
            <h1 className="text-3xl py-2">配花</h1>
            <p className="text-tertiary-gray-100 text-sm px-4 inline-block h-auto">
              花束中用來點綴和裝飾的次要花材，通常是形狀或顏色上與主花相配的花朵。
            </p>
          </div>
          <div className="w-full h-full relative">
            <DraggableBar
              items={flowers}
              onItemSelect={setSelectedFlower}
              itemHeight={35}
              dragBuffer={50}
              className="w-[150px] h-[580px] mx-auto pt-2"
            />
            <ChangeComponent onNext={onNext} onPrev={onPrev} />
          </div>
        </div>
      )}
    </>
  )
}

export default AccentFlowerComponent
