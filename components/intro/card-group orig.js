import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'

//import { BsFillStarFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'

export default function CardGroup() {
  const list = [
    {
      title: '孤挺花',
      content: 'Amaryllis',
      img: '/assets/intro/01_孤挺花Amaryllis.png',
    },
    {
      title: '銀蓮花',
      content: 'Anemone',
      img: '/assets/intro/02_銀蓮花Anemone.png',
    },
    {
      title: '蘋果花',
      content: 'Apple Blossoms',
      img: '/assets/intro/03_蘋果花Apple_Blossoms.png',
    },
    {
      title: '紫菀',
      content: 'Asters',
      img: '/assets/intro/04_紫菀Asters.png',
    },
  ]

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          shadow="none"
          key={index}
          isPressable
          onPress={() => console.log('item pressed')}
          className="bg-transparent"
        >
          <CardBody className="static overflow-visible p-0 bg-transparent">
            <div className="bg-transparent">
              <Image
                shadow="none"
                radius="none"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-auto opacity-100"
                src={item.img}
              />
            </div>
          </CardBody>
          <CardHeader className="block text-center bg-transparent">
            <div>
              <p class="text-xl truncate ...">{item.title}</p>
            </div>
            <div>
              <p class="text-base truncate ...">{item.content}</p>
            </div>
          </CardHeader>
          <CardFooter className="text-small justify-between">
            <p className="text-base flex">
              {/* <BsFillStarFill className="text-secondary-100" /> */}
              {item.star}
            </p>
            <p className="text-base">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
