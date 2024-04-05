// 表單標籤
import React from 'react'

export default function FormTag(props) {
  return (
    <div className="flex text-black border-b-2 border-primary-300">
      <span className="bg-primary-300 p-4 rounded-t-xl text-base">
        {props.text}
      </span>
    </div>
  )
}
