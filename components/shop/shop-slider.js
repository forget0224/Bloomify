import React from 'react'
import Subtitle from '../common/subtitle'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { BsFillStarFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

function ShopSlider() {
  const productList = [
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Avocado',
      starCount: '5.0',
      shop: 'shop1',
      tag: 'hot sale',
      price: '$15.70',
    },
    {
      img: '/assets/shop/products/red_Amaryllis_3.jpg',
      title: 'Watermelon',
      starCount: '4.0',
      shop: 'shop2',
      tag: 'hot sale',
      price: '$8.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Apple',
      starCount: '3.0',
      shop: 'shop3',
      tag: 'hot sale',
      price: '$44.70',
    },
    {
      img: '/assets/shop/products/pink_Gladiola_0.jpg',
      title: 'Orange',
      starCount: '5.0',
      shop: 'shop4',
      tag: 'hot sale',
      price: '$78.70',
    },
  ]

  return (
    <>
      <Subtitle text="熱門商品" />
      <div className="flex items-center justify-between my-8">
        <Button
          color="primary"
          className="hidden sm:px-unit-3 sm:min-w-unit-3 sm:rounded-full sm:flex sm:items-center sm:justify-center"
        >
          <IoIosArrowBack />
        </Button>

        <div className="bg-white p-4 rounded-lg gap-2 grid grid-cols-1 sm:grid-cols-4 ">
          {productList.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log('item pressed')}
            >
              <CardBody className="relative overflow-visible p-0">
                <Link
                  href="/shop/details"
                  key={index}
                  className="block relative"
                >
                  <BsHeart className="absolute right-3 top-3 sm:right-5 sm:top:5 sm:w-6 sm:h-6 z-10 text-secondary-100" />
                  <Image
                    shadow="none"
                    radius="none"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px] z-0"
                    src={item.img}
                  />
                </Link>
              </CardBody>
              <CardHeader className="block text-left">
                <div className="flex justify-between">
                  <p class="text-xl truncate">{item.title}</p>
                  {/* <p className="text-base flex items-center space-x-1">
                    <BsFillStarFill className="text-secondary-100" />
                    {item.star}
                    <span>{item.starCount}</span>
                  </p> */}
                </div>
                <p class="text-base">{item.shop}</p>
              </CardHeader>
              <CardFooter className="text-small justify-between">
                <p class="text-xl truncate">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Button
          color="primary"
          className="hidden sm:px-unit-3 sm:min-w-unit-3 sm:rounded-full sm:flex sm:items-center sm:justify-center"
        >
          <IoIosArrowForward />
        </Button>
      </div>
    </>
  )
}

export default ShopSlider
