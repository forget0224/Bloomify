import React from 'react'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image'

function Products() {
  const productList = [
    {
      title: 'Avocado',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$12.20',
    },
    {
      title: 'Orange',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$5.50',
    },
    {
      title: 'Tangerine',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$3.00',
    },
    {
      title: 'Raspberry',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$10.00',
    },
    {
      title: 'Lemon',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$5.30',
    },
    {
      title: 'Avocado',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/assets/shop/pink_Gladiola_0.jpg',
      price: '$12.20',
    },
  ]

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {productList.map((item, index) => (
        <div key={index} className="shadow-sm">
          <div className="overflow-visible p-0">
            <Image
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg"
              width={300}
              height={300}
            />
          </div>
          <div className="pb-0 pt-2 px-4 flex flex-col items-start">
            <div className="flex justify-between w-full">
              <b>{item.title}</b>
              <div className="flex items-center">
                <p>star</p>
                <p className="text-default-500">4.0</p>
              </div>
            </div>
            <small className="text-default-500">花店名稱</small>
            <div className="border border-solid border-2 py-1 px-4 mt-1">
              <p className="text-xs uppercase font-bold">TAGS</p>
            </div>
            <div className="flex justify-between w-full">
              <h4 className="font-bold text-lg">NT{item.price}</h4>
              <p className="text-default-500">CART</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Products
