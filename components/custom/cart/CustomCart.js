import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MyButton } from '../../btn/mybutton'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { useFlowerCart } from '@/hooks/use-flowerCart'
import Link from 'next/link'
import { CiTrash } from 'react-icons/ci'

export default function CustomCart() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { state, dispatch } = useFlowerCart()

  function groupProductsByProductId(products, packageInfo, cardInfo) {
    const grouped = products.reduce((acc, item) => {
      const key = item.product_id

      const positionsCount = item.positions ? item.positions.length : 1

      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: positionsCount,
          total: positionsCount * item.product_price,
        }
      } else {
        acc[key].count += positionsCount
        acc[key].total = acc[key].count * item.product_price
      }
      return acc
    }, {})

    if (packageInfo && packageInfo.product_id != '') {
      const packageKey = packageInfo.product_id || 'package'
      grouped[packageKey] = {
        ...packageInfo,
        count: 1,
        total: packageInfo.product_price,
        sortOrder: 3,
      }
    }

    if (cardInfo && cardInfo.product_id != '') {
      const cardKey = cardInfo.product_id || 'card'
      grouped[cardKey] = {
        ...cardInfo,
        count: 1,
        total: cardInfo.product_price,
        sortOrder: 2,
      }
    }

    return Object.values(grouped).sort(
      (a, b) => (a.sortOrder || 1) - (b.sortOrder || 1)
    )
  }

  const groupedProducts = groupProductsByProductId(
    state.products,
    state.package,
    state.card
  )

  const totalPrice = groupedProducts.reduce(
    (total, item) => total + item.total,
    0
  )

  console.log(state)

  const clearCardInfo = () => {
    dispatch({ type: 'CLEAR_CARD' })
  }

  const clearPackageInfo = () => {
    dispatch({ type: 'CLEAR_PACKAGE' })
  }

  const clearProductsAndBouquetInfo = () => {
    dispatch({ type: 'CLEAR_PRODUCTS_AND_BOUQUET' })
  }
  const handleClearCart = () => {
    clearCardInfo()
    clearPackageInfo()
    clearProductsAndBouquetInfo()
    onOpenChange(false)
  }
  const isEmpty = state.products.length === 0 && !state.bouquet_name

  if (isEmpty) {
    return (
      <>
        <div className="min-h-[355px]">
          <h2 className="text-center mt-4">目前尚未加入任何花束</h2>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="w-screen sm:max-w-[600px] sm:h-full flex flex-col px-5 gap-2 relative  mt-4">
        <div className="flex flex-row justify-between">
          <h1 className="sm:text-2xl text-xl sm:text-left text-center">
            {state.store_name}
            {' - '}
            {state.bouquet_name}
          </h1>

          <Button
            variant="light"
            isIconOnly
            color="primary"
            className="rounded-full  "
            onPress={onOpen}
          >
            <CiTrash className="text-xl" />
          </Button>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  確認清除
                </ModalHeader>
                <ModalBody>
                  <p>確定要清除客製花束購物車嗎?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    取消
                  </Button>
                  <Button color="primary" onPress={handleClearCart}>
                    確定
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <div
          className=" w-[300px] h-[180px] mx-auto bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage: `url(${state.image_url})`,
          }}
        ></div>
        <div className="flex flex-col w-full gap-2   overflow-auto sm:overflow-visible">
          <div className="flex flex-col gap-3 sm:h-auto h-[250px]">
            {groupedProducts.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-row items-center sm:h-[70px] justify-between w-full border-1  rounded-md text-sm shadow-md"
              >
                <div className="flex-grow">
                  <div
                    className="my-1 w-[60px] rounded-md m-auto aspect-square  bg-center  bg-no-repeat"
                    style={{
                      backgroundImage: `url(${item.image_url})`,
                      backgroundSize:
                        item &&
                        (item.product_category === 'package' ||
                          item.product_category === 'card')
                          ? 'cover'
                          : 'contain',
                    }}
                  ></div>
                </div>

                <div className="flex flex-row sm:gap-2 sm:justify-between flex-grow  items-center gap-1">
                  <div className="flex-grow flex sm:flex-row flex-col sm:justify-around">
                    <div className="sm:w-[80px] text-center">{item.name}</div>
                    <div className="sm:w-[80px] text-center sm:text-sm text-xs sm:text-tertiary-black text-tertiary-gray-100">
                      {item.color ? item.color : '-'}
                    </div>
                  </div>

                  <div className="sm:w-[80px] text-center text-sm   text-tertiary-black ">
                    {item.count}
                    {item.product_category === 'card'
                      ? '張'
                      : item.product_category === 'package'
                      ? '個'
                      : '朵'}
                  </div>
                </div>

                <div className="text-center min-w-[108px]">
                  <p>${item.product_price}</p>
                </div>
                {state?.cardInfo && (
                  <div className="flex-grow text-center ">
                    <CiTrash onClick={clearCardInfo} />
                  </div>
                )}
              </div>
            ))}
          </div>{' '}
        </div>
        <div className="sm:static sticky bottom-0 left-0 bg-white">
          <hr className="w-full mt-2" />
          <div className="flex justify-end w-full p-3">
            <div className="flex justify-between items-center sm:w-[180px]">
              <span className="px-3">小計</span>
              <div className="flex items-center">
                <span className="text-primary">NT$</span>
                <span className="text-primary pl-1">{totalPrice}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 sm:gap-4 sm:my-10">
            <MyButton color="primary" size="xl" isOutline>
              <Link href="/custom/custom">上一步</Link>
            </MyButton>
            <MyButton color="primary" size="xl">
              <Link href="/cart/fill-out?source=flower">下一步</Link>
            </MyButton>
          </div>
        </div>
      </div>
    </>
  )
}
