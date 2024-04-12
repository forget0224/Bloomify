import React from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'

export default function CardGroupStore() {
  const list = [
    {
      title: 'AA商家',
      img: '/assets/course/img_logo_01.png',
    },
    {
      title: 'BB商家',
      img: '/assets/course/img_logo_01.png',
    },
    {
      title: 'CC商家',
      img: '/assets/course/img_logo_01.png',
    },
    {
      title: 'DD商家',
      img: '/assets/course/img_logo_01.png',
    },
    {
      title: 'EE商家',
      img: '/assets/course/img_logo_01.png',
    },
    {
      title: 'FF商家',
      img: '/assets/course/img_logo_01.png',
    },
    {
      title: 'GG商家',
      img: '/assets/course/img_logo_01.png',
    },
    {
      title: 'HH商家',
      img: '/assets/course/img_logo_01.png',
    },
  ]

  return (
    <div className="grid grid-cols-3 lg:grid-cols-8 gap-6">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log('item pressed')}
          className="bg-danger"
        >
          <Link href="/course/details" key={index} className="w-full">
            <CardBody className="p-0">
              <Image
                isZoomed
                shadow="none"
                radius="none"
                width="100%"
                className="w-full object-cover h-[150px]"
                alt={item.title}
                src={item.img}
              />
            </CardBody>
            <CardFooter className="w-full block text-center bg-white">
              <p className="w-full text-xl">{item.title}</p>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}
