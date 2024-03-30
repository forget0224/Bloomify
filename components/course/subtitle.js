// 小標題
import React from 'react'

export default function Subtitle(props) {
  return (
    <div className="border-s-5 border-primary-100 text-2xl px-4 text-tertiary-black">
      <p>{props.text}</p>
    </div>
  )
}
