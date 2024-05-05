import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MdEdit } from 'react-icons/md'
import { CiCircleCheck } from 'react-icons/ci'
import { useMediaQuery } from 'react-responsive'
import { useFlower } from '@/hooks/use-flower'
const GreetingCard = () => {
  const { setCardInfo, snapshotCanvas, previewStyle, confirmedStyle } =
    useFlower()
  const currentStyle = previewStyle || confirmedStyle

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  })
  const isMobile = useMediaQuery({
    query: '(max-width: 375px)',
  })
  const [flipped, setFlipped] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('壽星')
  const [greeting, setGreeting] = useState('Your Best Friend, L')
  const [message, setMessage] = useState(
    '生日快樂!!\n身體健康、萬事如意!\n\n\nHAPPY BIRTHDAY!'
  )
  const maxLength = 50
  // const cleanedMessage = message.replace(/\n/g, '')
  // const cardContent = `標題:${title}\n訊息:${cleanedMessage}\n署名:${greeting}`

  const countCharacters = (text) => {
    return text.replace(/\s/g, '').length
  }

  const cardVariants = {
    initial: {
      scale: 1,
      x: 0,
    },
    flipped: {
      scale: isDesktopOrLaptop ? 1.2 : isMobile ? 1 : 1.1,
      x: '50%',
    },
  }

  const toggleCard = () => {
    if (!editing) {
      setFlipped(!flipped)
      const cardContent = `標題:${title}訊息: ${message.replace(
        /\s/g,
        ''
      )}署名: ${greeting}`
    }
  }

  const toggleEditing = () => {
    setEditing(!editing)
  }

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value)
  }
  useEffect(() => {
    if (currentStyle) {
      setCardInfo({
        card_url: currentStyle.url,
        product_id: currentStyle.product_id,
        product_price: currentStyle.product_price,
        product_category: currentStyle.product_category,
        content: `標題:${title} 訊息:${message.replace(
          /\s/g,
          ''
        )} 署名:${greeting}`,
      })
    }
  }, [title, greeting, message, currentStyle, setCardInfo])

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: 'calc(100vh - 144px)' }}
    >
      <motion.div
        className="relative sm:w-64 sm:h-96  w-[188px] h-[282px] perspective-2500 cursor-pointer"
        onClick={toggleCard}
        animate={flipped ? 'flipped' : 'initial'}
        variants={cardVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div
          className="    absolute sm:bottom-2 right-2 sm:bg-transparent  rounded-full p-2 flex items-center justify-center z-10 bottom-0"
          style={{ width: '30px', height: '30px' }}
          onClick={(e) => {
            e.stopPropagation()
            toggleEditing()
          }}
        >
          {editing ? (
            <CiCircleCheck className="text-2xl text-gray-600 text-bold" />
          ) : (
            <MdEdit className="text-lg text-gray-600" />
          )}
        </div>

        <div className="absolute top-0 left-0 w-full h-full  bg-white shadow-xl">
          <input
            type="text"
            value={title}
            onChange={handleInputChange(setTitle)}
            className={` text-center w-full sm:mt-8 text-xl font-bold ${
              editing ? 'bg-secondary-200' : ''
            }`}
            disabled={!editing}
          />
          <div className="sm:h-60 h-48 relative">
            <textarea
              value={message}
              onChange={handleInputChange(setMessage)}
              className={`w-full sm:text:base text-sm py-4 px-4 mt-2 sm:px-8 sm:py-3 h-full ${
                editing ? 'bg-secondary-200' : ''
              } resize-none`}
              disabled={!editing}
              maxLength={maxLength}
            />
            <div className="text-xs text-gray-500 absolute sm:right-2 bottom-2  right-4">
              {`${countCharacters(message)}/${maxLength}`}
            </div>
          </div>
          <input
            type="text"
            value={greeting}
            onChange={handleInputChange(setGreeting)}
            className={`w-full sm:text-base text-xs mt-4 px-4 text-right sm:mt-4 sm:px-8 ${
              editing ? 'bg-secondary-200' : ''
            }`}
            disabled={!editing}
          />
        </div>

        <motion.div
          className={`absolute top-0 left-0 w-full h-full shadow-xl z-20 ${
            currentStyle && currentStyle.url ? '' : 'bg-white'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left',
            backgroundImage:
              currentStyle && currentStyle.url
                ? `url(${currentStyle.url})`
                : 'none',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          animate={{ rotateY: flipped ? -180 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <h3
            className={`${
              currentStyle && currentStyle.url ? 'hidden' : 'block'
            }   text-center mt-8 text-xl font-bold bg-gradient-to-r from-yellow-300 to-pink-500`}
          >
            HAPPY BIRTHDAY Love!
          </h3>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GreetingCard
