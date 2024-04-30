import React, { useState, useRef, useLayoutEffect } from 'react'
import { FaAppleWhole } from 'react-icons/fa6'
import { GiCutLemon } from 'react-icons/gi'
import { GiStrawberry } from 'react-icons/gi'
import { PiOrangeSliceLight } from 'react-icons/pi'
import apple from '@/assets/apple.png'
import lemon from '@/assets/lemon.png'
import strawberry from '@/assets/strawberry.png'
import orange from '@/assets/orange.png'
import Card from './Card'
import gsap from 'gsap'
export default function ChangeCard() {
  const cards = [
    {
      title: '代客送花',
      bgCardColor: 'bg-[#9e7777]', // 莫蘭迪紅色
      bgColor: '#b28b84',
      textColor: 'text-[#f4ede8]',
      icon: <FaAppleWhole />,
      img: apple,
      bgImg: apple,
      content:
        '提供專業的代客送花服務，無論是節日還是日常，我們都能幫您傳遞愛與關懷。',
    },
    {
      title: '線上商城',
      bgCardColor: 'bg-[#86756f]', // 莫蘭迪粉紅
      bgColor: '#a39088',
      textColor: 'text-[#f4ede8]',
      icon: <GiStrawberry />,
      img: strawberry,
      bgImg: strawberry,
      content: '探索我們豐富的線上商品，從鮮花到園藝用品，一應俱全。',
    },
    {
      title: '課程預約',
      bgCardColor: 'bg-[#e5d5b8]', // 莫蘭迪黃色
      bgColor: '#ded1ba',
      textColor: 'text-[#332d29]',
      icon: <GiCutLemon />,
      img: lemon,
      bgImg: lemon,
      content:
        '預約專業花藝課程，學習花卉設計的技巧，提升個人審美和手工製作能力。',
    },
    {
      title: '花朵圖鑑',
      bgCardColor: 'bg-[#cba476]', // 莫蘭迪橙色
      bgColor: '#c7a876',
      textColor: 'text-[#f4ede8]',
      icon: <PiOrangeSliceLight />,
      img: orange,
      bgImg: orange,
      content:
        '探索我們的植物世界！在我們的網站中，您將發現一個專為您打造的植物介紹區域。',
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
