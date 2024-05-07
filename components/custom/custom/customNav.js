import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Logo from '@/assets/singleLogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { CiUndo } from 'react-icons/ci'
import { MyButton } from '@/components/btn/mybutton'
import { useFlower } from '@/hooks/use-flower'
import { useFlowerCart } from '@/hooks/use-flowerCart'
export default function CustomNav() {
  const router = useRouter()
  const {
    snapshotCanvas,
    imagesInfo,
    cardInfo,
    clearObjectsOnCanvas,
    packageInfo,
  } = useFlower()
  const handleUndo = () => {
    clearObjectsOnCanvas()
  }
  const { dispatch, state } = useFlowerCart()

  const handleComplete = useCallback(() => {
    const urlWorkingArea = snapshotCanvas()

    if (urlWorkingArea) {
      dispatch({
        type: 'SET_BOUQUET_INFO',
        payload: {
          image_url: urlWorkingArea,
        },
      })
    }
    dispatch({
      type: 'SET_CARD',
      payload: cardInfo,
    })

    dispatch({
      type: 'SET_PACKAGE',
      payload: packageInfo,
    })

    const productPayload = imagesInfo
      .filter((img) => img.id)
      .map((img) => ({
        id: img.id,
        left: img.left,
        top: img.top,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
        angle: img.angle,
        product_id: img.product_id,
        product_category: img.product_category,
        product_price: img.product_price,
        image_url: img.url,
        color: img.color,
        name: img.product_name || img.name,
        zIndex: img.zIndex,
      }))

    dispatch({
      type: 'ADD_PRODUCTS',
      payload: productPayload,
    })
    router.push('/cart')
  }, [snapshotCanvas, imagesInfo, dispatch, cardInfo, packageInfo])

  return (
    <>
      <nav className="w-full h-14 flex flex-row items-center px-5 gap-4 sm:h-16">
        <div className="text-center w-10 sm:h-16 cursor-pointer">
          <Link href="/">
            <Logo className="w-full h-full" />
          </Link>
        </div>
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div className="text-xl text-tertiary-black flex flex-col items-center mt-2 sm:mt-1 sm:text-3xl cursor-pointer">
            <CiUndo onClick={handleUndo} />
            <p className="text-xs">reset</p>
          </div>
          <div className="sm:hidden block">
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
