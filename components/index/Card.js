import React from 'react'
import Image from 'next/image'
export default function Card({ card, index, selected }) {
  return (
    <>
      {index === selected && (
        <div className="absolute w-screen h-screen top-0 left-0 flex justify-between">
          <div className="flex flex-col justify-around">
            <Image alt="ffff" className="w-40 rotate-12" src={card.bgImg} />
            <Image alt="ffff" className="w-72 rotate-45" src={card.bgImg} />
          </div>
          <div className="flex flex-col justify-around">
            <Image alt="ffff" className="w-36 -rotate-90" src={card.bgImg} />
            <Image alt="ffff" className="w-64 rotate-90" src={card.bgImg} />
          </div>
        </div>
      )}

      <div className="h-full relative w-full">
        <div
          className={`${card.bgCardColor} h-full rounded-xl flex justify-center items-center z-10 relative`}
        >
          <span className="text-white text-[1.5rem] absolute top-5 left-5">
            {card.icon}
          </span>
          <h1
            className={`${
              selected === index
                ? 'rotate-0 text-[2rem]'
                : 'text-[1.1rem] rotate-90'
            }    font-bold   transition-all  ease-in-out duration-[3000ms]`}
          >
            {card.title}
          </h1>
          {index === selected && (
            <div
              className={`content ${card.textColor}  text-sm p-4 absolute  bottom-5 opacity-0 
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
          } w-60 absolute top-0 `}
        />
      </div>
    </>
  )
}
