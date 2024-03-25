import React from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

function Products() {
  const list = [
    {
      title: 'Avocado',
      img: '/images/fruit-5.jpeg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/images/fruit-6.jpeg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/images/fruit-7.jpeg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/images/fruit-8.jpeg',
      price: '$12.20',
    },
    {
      title: 'Orange',
      img: '/images/fruit-1.jpeg',
      price: '$5.50',
    },
    {
      title: 'Tangerine',
      img: '/images/fruit-2.jpeg',
      price: '$3.00',
    },
    {
      title: 'Raspberry',
      img: '/images/fruit-3.jpeg',
      price: '$10.00',
    },
    {
      title: 'Lemon',
      img: '/images/fruit-4.jpeg',
      price: '$5.30',
    },
    {
      title: 'Avocado',
      img: '/images/fruit-5.jpeg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/images/fruit-6.jpeg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/images/fruit-7.jpeg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/images/fruit-8.jpeg',
      price: '$12.20',
    },
  ]

  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log('item pressed')}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
              style={{ width: '350px', height: '350px' }}
            />
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="flex justify-between w-full">
              <b>{item.title}</b>
              <span className="flex">
                <p>star</p>
                <p className="text-default-500">4.0</p>
              </span>
            </div>
            <small className="text-default-500">花店名稱</small>
            <div className="border-solid border-2 py-0.4 px-4">
              <p className="text-tiny uppercase font-bold">TAGS</p>
            </div>
            <div className="flex justify-between w-full">
              <h4 className="font-bold text-large">NT{item.price}</h4>
              <p className="text-default-500">CART</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Products
