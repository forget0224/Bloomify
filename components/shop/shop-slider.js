import React, { useState, useRef, useEffect } from 'react'
import Subtitle from '../common/subtitle'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { BsHeart } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

const ITEM_WIDTH = 300

function ShopSlider() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true)
  const [isRightDisabled, setIsRightDisabled] = useState(false)
  const productList = [
    {
      img: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
      title: 'Avocado',
      starCount: '5.0',
      shop: 'shop1',
      tag: 'hot sale',
      price: '$15.70',
    },
    {
      img: '/assets/shop/products/flowers/red_Amaryllis_3.jpg',
      title: 'Watermelon',
      starCount: '4.0',
      shop: 'shop2',
      tag: 'hot sale',
      price: '$8.70',
    },
    {
      img: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
      title: 'Apple',
      starCount: '3.0',
      shop: 'shop3',
      tag: 'hot sale',
      price: '$44.70',
    },
    {
      img: '/assets/shop/products/flowers/pink_Gladiola_0.jpg',
      title: 'Orange',
      starCount: '5.0',
      shop: 'shop4',
      tag: 'hot sale',
      price: '$78.70',
    },
  ]

  const containerRef = useRef()
  const contentWidth = ITEM_WIDTH * productList.length

  // function to handle scrolling when the btn is clicked
  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount
    // update the state with the new scroll position
    setScrollPosition(newScrollPosition)
    // access the container element and set its scrollLeft property
    containerRef.current.scrollLeft = newScrollPosition
  }

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth
    const contentWidth = containerRef.current.scrollWidth
    const maxScroll = contentWidth - containerWidth

    setIsLeftDisabled(scrollPosition === 0)
    setIsRightDisabled(scrollPosition >= maxScroll)
  }, [scrollPosition])

  return (
    <>
      <Subtitle text="熱門商品" />
      <div className="container relative my-8 flex justify-center">
        <div className="absolute left-0 top-[50%] z-10">
          <Button
            color="primary"
            className="hidden sm:px-unit-3 sm:min-w-unit-3 sm:rounded-full sm:flex sm:items-center sm:justify-center "
            onClick={() => {
              handleScroll(-ITEM_WIDTH)
            }}
            disabled={isLeftDisabled}
            style={{
              opacity: isLeftDisabled ? 0.5 : 1,
            }}
          >
            <IoIosArrowBack />
          </Button>
        </div>

        <div
          ref={containerRef}
          className="overflow-x-scroll scrollbar-hide scroll-smooth sm:mx-20"
        >
          <div
            className="content-box w-auto flex align-center gap-5"
            style={{ width: contentWidth }}
          >
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
                      isZoomed
                      shadow="none"
                      radius="none"
                      width="100%"
                      alt={item.title}
                      className="w-[300px] object-cover h-[200px] z-0"
                      src={item.img}
                    />
                  </Link>
                </CardBody>
                <CardHeader className="block text-left">
                  <div className="flex justify-between">
                    <p className="text-xl truncate">{item.title}</p>
                  </div>
                  <p className="text-base">{item.shop}</p>
                </CardHeader>
                <CardFooter className="text-small justify-between">
                  <p className="text-xl truncate">{item.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-[50%]">
          <Button
            color="primary"
            className="hidden sm:px-unit-3 sm:min-w-unit-3 sm:rounded-full sm:flex sm:items-center sm:justify-center "
            onClick={() => {
              handleScroll(ITEM_WIDTH)
            }}
            disabled={isRightDisabled}
            style={{
              opacity: isRightDisabled ? 0.5 : 1,
            }}
          >
            <IoIosArrowForward />
          </Button>
        </div>
      </div>
    </>
  )
}

export default ShopSlider
