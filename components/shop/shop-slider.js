import React, { useState, useRef, useEffect } from 'react'
import Subtitle from '../common/subtitle'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from '@nextui-org/react'
import { BsHeart } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'

const ITEM_WIDTH = 300

function ShopSlider({ products }) {
  const folderMappings = [
    { category: '鮮花', directory: '/assets/shop/products/flowers/' },
    { category: '花盆栽', directory: '/assets/shop/products/flower-pots' },
    { category: '葉材', directory: '/assets/shop/products/foliage' },
    { category: '植盆栽', directory: '/assets/shop/products/plant-pots' },
    { category: '器具', directory: '/assets/shop/products/tools' },
    { category: '材料', directory: '/assets/shop/products/materials' },
  ]

  const productItems = products.map((product) => {
    // 查找对应的文件夹路径
    const folder =
      folderMappings.find(
        (mapping) => mapping.category === product.category.name
      )?.directory || 'shop/images/all'
    const imagePath = product.mainImage
      ? `${folder}/${product.mainImage}`
      : '/assets/shop/products/flowers/default.jpg'
    return {
      name: product.name,
      image: imagePath,
      store: product.stores.store_name,
      price: `NT$${product.price}`,
      tag: product.tags.map((tag) => tag.id),
    }
  })

  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true)
  const [isRightDisabled, setIsRightDisabled] = useState(false)

  const containerRef = useRef()
  const contentWidth = ITEM_WIDTH * productItems.length

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
            {productItems
              .filter((product) => product.tag.some((tagId) => tagId === 4)) // 使用 some 方法检查 tags 数组
              .map((product) => (
                <Card
                  shadow="sm"
                  key={product.id}
                  isPressable
                  onPress={() => console.log('item pressed')}
                >
                  <CardBody className="relative overflow-visible p-0">
                    <Link
                      href={{
                        pathname: '/shop/[pid]',
                        query: { pid: product.id },
                      }}
                      as={`/shop/${product.id}`}
                    >
                      <BsHeart className="absolute right-3 top-3 sm:right-5 sm:top:5 sm:w-6 sm:h-6 z-10 text-secondary-100" />
                      <Image
                        isZoomed
                        shadow="none"
                        radius="none"
                        width="100%"
                        alt={product.name}
                        className="w-[300px] object-cover h-[200px] z-0"
                        src={product.image}
                      />
                    </Link>
                  </CardBody>
                  <CardHeader className="block text-left">
                    <div className="flex justify-between">
                      <p className="text-xl truncate">{product.name}</p>
                    </div>
                    <p className="text-base">{product.store}</p>
                  </CardHeader>
                  <CardFooter className="text-small justify-between">
                    <p className="text-xl truncate">{product.price}</p>
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
