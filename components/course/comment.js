import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function CourseComment() {
  return (
    <div className="flex flex-col gap-2 py-4 border-b-1 border-b-tertiary-gray-200 last:border-0">
      <p>
        用戶名稱<span className="ml-2 text-tertiary-gray-100">2024.02.12</span>
      </p>
      <div className="flex flex-row items-center text-secondary-100">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar className="text-secondary-200" />
        <FaStar className="text-secondary-200" />
      </div>
      <p>
        買了搖滾區座位，提早一個小時到現場排隊，讓孩子坐在正中央舞台前的位置，當作生日禮物，孩子非常滿意開心！因為雖然是小小女生，但卻是個恐龍迷，恐龍控最適合的活動！對了，孩子最愛翼龍，希望以後有機會看到翼龍登場喔！
      </p>
    </div>
  )
}
