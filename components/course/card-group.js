import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'

export default function CardGroup() {
  const list = [
    {
      title: '課程一',
      content: '課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_01.png',
      star: '5',
      price: 'NT$1200',
    },
    {
      title: '課程二',
      img: '/assets/course/img_course_card_02.png',
      star: '5',
      price: 'NT$1000',
    },
    {
      title: '課程三',
      img: '/assets/course/img_course_card_03.png',
      star: '5',
      price: 'NT$800',
    },
    {
      title: '課程四',
      img: '/assets/course/img_course_card_04.png',
      star: '5',
      price: 'NT$600',
    },
  ]

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log('item pressed')}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="none"
              radius="none"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardHeader>
            <div>
              <b>{item.title}</b>
            </div>
            <div>
              <p>{item.content}</p>
            </div>
          </CardHeader>
          <CardFooter className="text-small justify-between">
            <p className="text-default-500">{item.star}</p>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
