// 小標題
import React from 'react'

export default function Subtitle(props) {
  return (
    <div className="border-s-5 border-primary text-2xl px-4 text-black">
      <p>{props.text}</p>
    </div>
  )
}
