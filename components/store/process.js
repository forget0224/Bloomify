import React from 'react'

export default function Process({
  process01,
  process02,
  process03,
  process04,
  process05,
}) {
  return (
    <>
      <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
        {process01}
      </div>
      <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
        {process02}
      </div>
      <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
        {process03}
      </div>
      <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
        {process04}
      </div>
      <div className="w-[222px] h-[222px] bg-rose-100 rounded-full flex justify-center items-center">
        {process05}
      </div>
    </>
  )
}
