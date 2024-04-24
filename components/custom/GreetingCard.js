import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdEdit } from 'react-icons/md'
import { CiCircleCheck } from 'react-icons/ci'

const GreetingCard = () => {
  const [flipped, setFlipped] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('壽星')
  const [greeting, setGreeting] = useState('Your Best Friend, L')
  const [message, setMessage] = useState(
    '生日快樂!!\n身體健康、萬事如意!\n\n\nHAPPY BIRTHDAY!'
  )
  const maxLength = 50
  const countCharacters = (text) => {
    return text.replace(/\s/g, '').length
  }

  const cardVariants = {
    initial: {
      scale: 1,
      x: 0, // 初始时，没有平移
    },
    flipped: {
      scale: 1.2, // 放大效果
      x: '50%', // 向左平移卡片宽度的50%，以便卡片中心对齐
    },
  }

  const toggleCard = () => {
    if (!editing) {
      setFlipped(!flipped)
    }
  }

  const toggleEditing = () => {
    setEditing(!editing)
    // 不再重置翻轉狀態，讓卡片保持當前的狀態
  }

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value)
  }

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="relative w-64 h-96 perspective-2500 cursor-pointer"
        onClick={toggleCard}
        animate={flipped ? 'flipped' : 'initial'}
        variants={cardVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Edit/Finish Button */}
        <div
          className="absolute bottom-2 right-2 bg-white rounded-sm p-2 flex items-center justify-center z-10"
          style={{ width: '40px', height: '20px' }}
          onClick={(e) => {
            e.stopPropagation()
            toggleEditing()
          }}
        >
          {editing ? (
            <CiCircleCheck className="text-lg text-gray-600" />
          ) : (
            <MdEdit className="text-xl text-gray-600" />
          )}
        </div>

        {/* Inside of the card */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-white shadow-xl" // Added shadow effect
        >
          <input
            type="text"
            value={title}
            onChange={handleInputChange(setTitle)}
            className={`text-center w-full mt-8 text-xl font-bold ${
              editing ? 'bg-secondary-200' : ''
            }`}
            disabled={!editing}
          />
          <div className="h-60 relative">
            <textarea
              value={message}
              onChange={handleInputChange(setMessage)}
              className={`w-full mt-2 px-8 py-3 h-full ${
                editing ? 'bg-secondary-200' : ''
              } resize-none`}
              disabled={!editing}
              maxLength={maxLength}
            />
            <div className="text-xs text-gray-500 absolute right-2 bottom-2">
              {`${countCharacters(message)}/${maxLength}`}
            </div>
          </div>
          <input
            type="text"
            value={greeting}
            onChange={handleInputChange(setGreeting)}
            className={`w-full mt-4 px-8 ${editing ? 'bg-secondary-200' : ''}`}
            disabled={!editing}
          />
        </div>

        {/* Front of the card */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white shadow-xl z-20"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'left' }}
          animate={{ rotateY: flipped ? -180 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <h3 className="text-center mt-8 text-xl font-bold bg-gradient-to-r from-yellow-300 to-pink-500">
            HAPPY BIRTHDAY Love!
          </h3>
          {/* Balloons and other decorations */}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GreetingCard
