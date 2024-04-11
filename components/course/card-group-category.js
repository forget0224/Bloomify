import React from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'

export default function CardGroup() {
  const list = [
    {
      title: '基礎花藝課程',
      img: '/assets/course/img_course_card_01.png',
    },
    {
      title: '植栽園藝課程',
      img: '/assets/course/img_course_card_02.png',
    },
    {
      title: '節慶主題課程',
      img: '/assets/course/img_course_card_03.png',
    },
    {
      title: '進階商業課程',
      img: '/assets/course/img_course_card_04.png',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="w-full object-cover h-[180px]"
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
