import React, { useState, useRef, useLayoutEffect } from 'react'
import { LuFlower } from 'react-icons/lu'
import { CiShop } from 'react-icons/ci'
import { PiPottedPlantThin } from 'react-icons/pi'
import { PiStarOfDavidLight } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import apple from '@/public/custom/custom/accent/red_tropaeolum.png'
import lemon from '@/public/custom/custom/accent/yellow_coreopsis.png'
import strawberry from '@/public/custom/custom/accent/blue_forgetmenotsit.png'
import shop from '@/public/index/2_sec_3.png'
import shopbg from '@/public/index/22_sec_3.png'
import course from '@/public/index/3_sec_3.png'
import coursebg from '@/public/index/33_sec_3.png'
import flower from '@/public/index/4_sec_3.png'
import flowerbg from '@/public/index/44_sec_3.png'
import orange from '@/public/custom/custom/flowers/red_carnation.png'
import Card from './Card'
import gsap from 'gsap'
export default function ChangeCard() {
  const { t } = useTranslation()
  const cards = [
    {
      title: t('section3.customTitle'),
      bgCardColor: 'bg-[#c9d6cc]',
      bgColor: '#F1EEDC',
      textColor: 'text-[#c5441c]',
      icon: <LuFlower />,
      img: apple,
      bgImg: apple,
      content: t('section3.customDescription'),
    },
    {
      title: t('section3.onlineStoreTitle'),
      bgCardColor: 'bg-[#B4B4B3]',
      bgColor: '#EBE4D1',
      textColor: 'text-[#2263a6]',
      icon: <CiShop />,
      img: shop,
      bgImg: shopbg,
      content: t('section3.onlineStoreDescription'),
    },
    {
      title: t('section3.courseBookingTitle'),
      bgCardColor: 'bg-[#e5d5b8]',
      bgColor: '#ded1ba',
      textColor: 'text-[#332d29]',
      icon: <PiPottedPlantThin />,
      img: course,
      bgImg: coursebg,
      content: t('section3.courseBookingDescription'),
    },
    {
      title: t('section3.flowerEncyclopediaTitle'),
      bgCardColor: 'bg-[#E5DDC5]',
      bgColor: ' #daf3ff ',
      textColor: 'text-[#4ba4d0]',
      icon: <PiStarOfDavidLight />,
      img: flower,
      bgImg: flowerbg,
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
            top: '-170px',
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
        <div
          className="h-screen w-full flex items-center justify-center"
          style={{ background: 'url(/index/Noise.png)' }}
        >
          {cards.map((card, key) => {
            return (
              <div
                ref={addToRef}
                key={key}
                className={`card-${key} ${
                  key === selected ? 'sm:w-[500px] w-[250px]' : 'sm:w-20 w-10'
                } h-96  cursor-pointer  transition-all duration-[3000ms] ease-in-out   `}
                onClick={() => {
                  handleClick(key)
                }}
              >
                <Card card={card} selected={selected} index={key} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
