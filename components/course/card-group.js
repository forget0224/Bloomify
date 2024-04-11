import React from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import { BsFillStarFill } from 'react-icons/bs'
import { BsFillHeartFill } from 'react-icons/bs'

export default function CardGroup() {
  const list = [
    {
      title: '課程一',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_01.png',
      star: '5.0',
      price: 'NT$1200',
    },
    {
      title: '課程二',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_02.png',
      star: '5.0',
      price: 'NT$1000',
    },
    {
      title: '課程三',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_03.png',
      star: '5.0',
      price: 'NT$800',
    },
    {
      title: '課程四',
      content:
        '課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容',
      img: '/assets/course/img_course_card_04.png',
      star: '5.0',
      price: 'NT$600',
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
          className="relative"
        >
          <Link href="/course/details" key={index} className="block relative">
            <CardBody className="relative overflow-visible p-0">
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
            <CardFooter className="block text-left">
              <p className="text-xl truncate mb-2">{item.title}</p>
              <p className="line-clamp-2 mb-2">{item.content}</p>
              <div className="text-small flex justify-between pt-0">
                <p className="text-lg">{item.price}</p>
                <p className="text-base flex items-center">
                  <BsFillStarFill className="text-secondary-100 mr-1" />
                  {item.star}
                </p>
              </div>
            </CardFooter>
            <BsFillHeartFill className="text-secondary-100 absolute top-4 right-4 z-10 w-6 h-6" />
          </Link>
        </Card>
      ))}
    </div>
  )
}
