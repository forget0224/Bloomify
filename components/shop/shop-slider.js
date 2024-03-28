import React from 'react'
import Subtitle from '../course/subtitle'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { BsFillStarFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

function ShopSlider() {
  const list = [
    {
      title: 'Orange',
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      price: '$5.50',
    },
    {
      title: 'Tangerine',
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      price: '$3.00',
    },
    {
      title: 'Raspberry',
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      price: '$10.00',
    },
    {
      title: 'Lemon',
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      price: '$5.30',
    },
  ]

  return (
    <>
      <Subtitle text="熱門商品" />
      <div className="flex items-center justify-between my-8">
        <IoIosArrowDropleft style={{ fontSize: '30px' }} />
        <div className="flex gap-2">
          {list.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log('item pressed')}
              className="flex-auto w-[200px]"
              style={{ maxWidth: '200px' }}
            >
              <CardBody className="static overflow-visible p-0">
                <Image
                  shadow="none"
                  radius="none"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
              <CardHeader className="block text-left">
                <div>
                  <p class="text-xl truncate ...">{item.title}</p>
                </div>
                <div>
                  <p class="text-base truncate ...">{item.content}</p>
                </div>
              </CardHeader>
              <CardFooter className="text-small justify-between">
                <p className="text-base flex">
                  <BsFillStarFill className="text-secondary-100" />
                  {item.star}
                </p>
                <p className="text-base">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <IoIosArrowDropright style={{ fontSize: '30px' }} />
      </div>
    </>
  )
}

export default ShopSlider
