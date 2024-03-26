import React, { useState } from 'react'
import Image from 'next/image'

function Category() {
  const categories = [
    {
      title: '全部',
      img: '/assets/shop/pink_Gladiola_0.jpg',
    },
    {
      title: '鮮花類',
      img: '/assets/shop/pink_Gladiola_0.jpg',
    },
    {
      title: '植栽類',
      img: '/assets/shop/pink_Gladiola_0.jpg',
    },
    {
      title: '資材類',
      img: '/assets/shop/pink_Gladiola_0.jpg',
    },
  ]

  const initialSelectedCategoryIndex = categories.findIndex(
    (category) => category.title === '全部'
  )
  const defaultIndex =
    initialSelectedCategoryIndex !== -1 ? initialSelectedCategoryIndex : 0
  const [selectedCategory, setSelectedCategory] = useState(defaultIndex)

  return (
    <div className="flex justify-center flex-wrap">
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => setSelectedCategory(index)}
          style={{
            cursor: 'pointer',
            borderBottom:
              index === selectedCategory
                ? '5px solid #FFC1B4'
                : '5px solid transparent',
          }}
          className="my-8 mx-4 sm:mx-0"
        >
          <Image
            width={300}
            height={300}
            src={category.img}
            alt={category.title}
            className="w-36 h-36 rounded-full mx-auto"
          />
          <p className="text-center text-2xl my-6">{category.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Category
