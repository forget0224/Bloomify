import React from 'react'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci'
export default function ChangeComponent({ onPrev, onNext }) {
  return (
    <div className="flex flex-row justify-between items-center text-tertiary-black text-4xl px-4 absolute bottom-0 w-full">
      <CiCircleChevLeft className="cursor-pointer" onClick={onPrev} />
      <CiCircleChevRight className="cursor-pointer" onClick={onNext} />
    </div>
  )
}
