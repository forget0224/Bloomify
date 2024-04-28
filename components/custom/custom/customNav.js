import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import logo from '@/assets/singleLogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { CiUndo } from 'react-icons/ci'
import { MyButton } from '@/components/btn/mybutton'
import { useFlower } from '@/hooks/use-flower'
import { useFlowerCart } from '@/hooks/use-flowerCart'

export default function CustomNav() {
  const router = useRouter()
  const { clearCanvas, snapshotCanvas, imagesInfo, cardInfo } = useFlower()
  const handleUndo = () => {
    clearCanvas()
  }
  const { dispatch, state } = useFlowerCart()

  const handleComplete = useCallback(() => {
    const urlWorkingArea = snapshotCanvas()

    console.log('Canvas URL:', urlWorkingArea)

    if (urlWorkingArea) {
      dispatch({
        type: 'SET_BOUQUET_INFO',
        payload: {
          image_url: urlWorkingArea,
        },
      })

      dispatch({
        type: 'SET_CARD',
        payload: { content: cardInfo },
      })

      const productPayload = imagesInfo.map((img) => ({
        left: img.left,
        top: img.top,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
        angle: img.angle,
        product_id: img.product_id,
        product_category: img.product_category,
        product_price: img.product_price,
        url: img.url,
        color: img.color,
        name: img.name,
        zIndex: img.zIndex,
      }))

      dispatch({
        type: 'ADD_PRODUCTS',
        payload: productPayload,
      })
      router.push('/cart')
    } else {
      console.error('No canvas snapshot URL available')
    }
  }, [snapshotCanvas, imagesInfo, dispatch])

  return (
    <>
      <nav className="w-full h-14 flex flex-row items-center px-5 gap-4 sm:h-16">
        <div className="text-center w-10 sm:h-16 cursor-pointer">
          <Link href="/">
            <Image className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div className="text-xl text-tertiary-black flex flex-col items-center mt-2 sm:mt-1 sm:text-3xl cursor-pointer">
            <CiUndo onClick={handleUndo} />
            <p className="text-xs">reset</p>
          </div>
          <div className="sm:hidden ">
            <MyButton size="xs" color="secondary200" onClick={handleComplete}>
              完成
            </MyButton>
          </div>
          <div className="hidden sm:block">
            <MyButton size="md" color="secondary200" onClick={handleComplete}>
              完成
            </MyButton>
          </div>
        </div>
      </nav>
    </>
  )
}
