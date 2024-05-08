import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
export default function Card({ card, index, selected }) {
  const animationRef = useRef(null)

  useEffect(() => {
    if (index === selected) {
      gsap.fromTo(
        animationRef.current,
        { y: 180, opacity: 0 },
        { y: 0, opacity: 1, duration: 3, ease: 'bounce.out' }
      )
    }
  }, [index, selected])
  return (
    <>
      {index === selected && (
        <div
          ref={animationRef}
          className="absolute w-screen h-screen top-0 left-0 flex justify-between"
        >
          <div className="flex flex-col sm:justify-around justify-between">
            <Image
              alt="ffff"
              className="sm:w-40 w-10 rotate-60"
              src={card.bgImg}
            />
            <Image
              alt="ffff"
              className="sm:w-72 w-12 rotate-30"
              src={card.bgImg}
            />
          </div>
          <div className="flex flex-col justify-around">
            <Image
              alt="ffff"
              className="sm:w-36 w-9 -rotate-45"
              src={card.bgImg}
            />
            <Image
              alt="ffff"
              className="sm:w-64 w-12 rotate-45"
              src={card.bgImg}
            />
          </div>
        </div>
      )}

      <div className="h-full relative w-full">
        <div
          className={`${card.bgCardColor} h-full rounded-xl flex justify-center items-center z-10 relative `}
        >
          <span
            className={`${
              selected === index ? 'top-2 left-2' : ' top-1/2 left-1/3'
            }  text-white sm:text-[1.5rem]  text-xl  absolute sm:top-5 sm:left-5 transition-all  ease-in-out duration-[3000ms] `}
          >
            {card.icon}
          </span>
          <h1
            className={`${
              selected === index
                ? 'rotate-0 sm:text-[2rem] text-md   top-20'
                : 'sm:text-[1.1rem] rotate-90 text-transparent '
            }    font-bold  absolute  transition-all  ease-in-out duration-[3000ms]`}
          >
            {card.title}
          </h1>
          {index === selected && (
            <div
              className={`content ${card.textColor}  px-8 sm:text-sm text-xs sm:w-[300px] h-auto  absolute text-center sm:bottom-1/3 opacity-0 bottom-5/6 
            }`}
            >
              {card.content}
            </div>
          )}
        </div>

        <Image
          alt="ffff"
          src={card.img}
          className={` img z-1 ${
            selected === index ? 'opacity-1' : 'opacity-0'
          } sm:w-60 w-40 absolute top-0 `}
        />
      </div>
    </>
  )
}
