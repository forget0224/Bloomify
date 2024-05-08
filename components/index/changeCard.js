import React, { useState, useRef, useLayoutEffect } from 'react'
import { LuFlower } from 'react-icons/lu'
import { CiShop } from 'react-icons/ci'
import { GiCutLemon } from 'react-icons/gi'
import { GiStrawberry } from 'react-icons/gi'
import { PiPottedPlantThin } from 'react-icons/pi'
import { PiOrangeSliceLight } from 'react-icons/pi'
import { FaStarOfDavid } from 'react-icons/fa'
import { PiStarOfDavidLight } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import apple from '@/public/custom/custom/accent/red_tropaeolum.png'
import lemon from '@/public/custom/custom/accent/yellow_coreopsis.png'
import strawberry from '@/public/custom/custom/accent/blue_forgetmenotsit.png'
import orange from '@/public/custom/custom/flowers/red_carnation.png'
import Card from './Card'
import gsap from 'gsap'
export default function ChangeCard() {
  const { t } = useTranslation()
  const cards = [
    {
      title: t('section3.customTitle'),
      bgCardColor: 'bg-[#E5DDC5]', // 莫蘭迪紅色
      bgColor: '#F1EEDC',
      textColor: 'text-[#c5441c]',
      icon: <LuFlower />,
      img: apple,
      bgImg: apple,
      content: t('section3.customDescription'),
    },
    {
      title: t('section3.onlineStoreTitle'),
      bgCardColor: 'bg-[#B4B4B3]', // 莫蘭迪粉紅
      bgColor: '#EBE4D1',
      textColor: 'text-[#2263a6]',
      icon: <CiShop />,
      img: strawberry,
      bgImg: strawberry,
      content: t('section3.onlineStoreDescription'),
    },
    {
      title: t('section3.courseBookingTitle'),
      bgCardColor: 'bg-[#e5d5b8]', // 莫蘭迪黃色
      bgColor: '#ded1ba',
      textColor: 'text-[#332d29]',
      icon: <PiPottedPlantThin />,
      img: lemon,
      bgImg: lemon,
      content: t('section3.courseBookingDescription'),
    },
    {
      title: t('section3.flowerEncyclopediaTitle'),
      bgCardColor: 'bg-[#cba476]', // 莫蘭迪橙色
      bgColor: '#c7a876',
      textColor: 'text-[#f4ede8]',
      icon: <PiStarOfDavidLight />,
      img: orange,
      bgImg: orange,
      content: t('section3.flowerEncyclopediaDescription'),
    },
  ]

  const [selected, setSelected] = useState(0)
  const cardsRef = useRef([])
  const bg = useRef()
  const contentRef = useRef(null)
  const handleClick = (key) => {
    setSelected(key)
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray(cardsRef.current).forEach((card, index) => {
        if (`card-${index}` === `card-${selected}`) {
          gsap.to(bg.current, {
            backgroundColor: cards[index].bgColor,
            duration: 2,
            ease: 'none',
          })

          gsap.to('.img', {
            top: '-140px',
            delay: 0.7,
            duration: 2,
            ease: 'none',
            onComplete: () => {
              gsap.to('.content', {
                opacity: 1,
                duration: 1,
                delay: 0.5,
              })
            },
          })
        }
      })
    })
    return () => ctx.revert()
  }, [selected])

  const addToRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }
  return (
    <>
      <div ref={bg} className="h-screen flex items-center justify-center">
        {cards.map((card, key) => {
          return (
            <div
              ref={addToRef}
              key={key}
              className={`card-${key} ${
                key === selected ? 'w-[500px]' : 'w-20'
              } h-96  cursor-pointer  transition-all duration-[3000ms] ease-in-out`}
              onClick={() => {
                handleClick(key)
              }}
            >
              <Card card={card} selected={selected} index={key} />
            </div>
          )
        })}
      </div>
    </>
  )
}
