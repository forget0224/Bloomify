import { useState } from 'react'
import { Image } from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Stepper } from 'react-dynamic-stepper'
import { Link } from '@nextui-org/react'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import { useFlowerCart } from '@/hooks/use-flowerCart'
export default function CustomCheckOut() {
  const [activePage, setActivePage] = useState('cart')
  const { state } = useFlowerCart()

  //明細 table 樣式
  const tableStylesContent = {
    th: ['text-base', 'text-tertiary-gray-100', 'font-normal'], // 表頭
    td: ['text-base', 'py-1', ''], // 表格 text-initial md:text-right
    wrapper: ['text-base', 'shadow-none', 'border-1', 'rounded-xl'], // 整個表格
  }

  const flowerStorage = JSON.parse(
    localStorage.getItem('flowerCartState') || '{}'
  )

  const contactStorage = JSON.parse(
    localStorage.getItem('fillOutDetails') || '{}'
  )
  console.log(flowerStorage)
  function groupProductsByProductId(products) {
    if (!products) return []
    const grouped = products.reduce((acc, item) => {
      const key = item.product_id
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 0,
          total: 0,
        }
      }
      acc[key].count += 1
      acc[key].total += item.product_price
      return acc
    }, {})

    return Object.values(grouped)
  }

  const groupedProducts = groupProductsByProductId(flowerStorage.products)

  const totalPrice = groupedProducts.reduce(
    (total, item) => total + item.total,
    0
  )
  // stepper
  const steps = [
    {
      header: {
        label: '購物車',
      },
      // content: <div>First step content</div>,
      isError: false,
      isWarning: false,
      isComplete: true,
    },
    {
      header: {
        label: '填寫資料',
      },
      // content: <div>Second step content</div>,
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: true,
    },
    {
      header: {
        label: '訂單確認',
      },
      // content: <div>Third step content</div>,
      isError: false,
      isComplete: false,
    },
  ]

  // cart content end

  return (
    <>
      {/* 主要內容 */}
      <div className="flex flex-col w-full lg:w-8/12 gap-14">
        {/* order-detail start */}
        <div className="flex flex-col w-full">
          <Subtitle text="購物明細" />
          {/* 明細 */}
          <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto w-full text-base shadow-none border-1 rounded-xl">
            <h1 className="sm:text-2xl text-xl sm:text-left text-center">
              {flowerStorage.store_name} {' - '}
              {flowerStorage.bouquet_name}
            </h1>
            <div
              className=" w-[300px] h-[180px] mx-auto bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: `url(${flowerStorage.image_url})`,
              }}
            ></div>
            <div className="flex flex-col gap-3 mt-6 mb-4">
              {groupedProducts.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-row items-center sm:h-[70px] justify-between w-full  text-sm "
                >
                  <div className="flex-grow">
                    <div
                      className="my-1 w-[60px] rounded-md m-auto aspect-square  bg-center bg-contain"
                      style={{
                        backgroundImage: `url(${item.url})`,
                      }}
                    ></div>
                  </div>

                  <div className="flex flex-row sm:gap-2 sm:justify-between flex-grow  items-center gap-1">
                    <div className="flex-grow flex sm:flex-row flex-col sm:justify-around">
                      <div className="sm:w-[80px] text-center">{item.name}</div>
                      <div className="sm:w-[80px] text-center sm:text-sm text-xs sm:text-tertiary-black text-tertiary-gray-100">
                        {item.color}
                      </div>
                    </div>

                    <div className="sm:w-[80px] text-center text-sm   text-tertiary-black ">
                      {item.count}
                      {item.product_category === 'flower' && '朵'}
                      {item.product_category === 'card' && '張'}
                      {item.product_category === 'package' && '個'}
                    </div>
                  </div>

                  <div className="flex-grow text-center ">
                    <p>${item.product_price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 小計 */}
          <div>
            <Table
              hideHeader
              aria-label="Example static collection table"
              classNames={{ ...tableStylesContent }}
            >
              <TableHeader>
                <TableColumn>無</TableColumn>
                <TableColumn>無</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell></TableCell>
                  <TableCell className="text-nowrap">
                    共 2 項商品，數量 6 個
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell className="w-full pr-8">小計</TableCell>
                  <TableCell className="text-right">NT$180</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell className="w-full pr-8">運費</TableCell>
                  <TableCell className="text-right">NT$60</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell className="w-full pr-8">折扣</TableCell>
                  <TableCell className="text-right">-</TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell className="w-full pr-8">總計</TableCell>
                  <TableCell className="text-right text-lg font-medium">
                    NT$220
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        {/* order-detail end */}
        {/* shipping & payment detail start*/}
        <div className="flex flex-col justify-center w-full gap-6">
          <Subtitle text="配送/付款明細" />
          <Table
            hideHeader
            aria-label="Example static collection table"
            classNames={{ ...tableStylesContent }}
          >
            <TableHeader>
              <TableColumn>配送方式</TableColumn>
              <TableColumn>內容</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="pr-8 text-nowrap">配送方式</TableCell>
                <TableCell className="w-full text-right">
                  {contactStorage.deliveryOption}
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="pr-8 text-nowrap">配送地址</TableCell>
                <TableCell className="w-full text-right line-clamp-1">
                  7-ELEVEN 大安門市 / 台北市大安區xxx路xxx號x樓
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="pr-8 text-nowrap">收件人</TableCell>
                <TableCell className="w-full text-right">芙莉蓮</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="pr-8 text-nowrap">連絡電話</TableCell>
                <TableCell className="w-full text-right">0912345678</TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell className="pr-8 text-nowrap">付款方式</TableCell>
                <TableCell className="w-full text-right">Line Pay</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell className="pr-8 text-nowrap">發票</TableCell>
                <TableCell className="w-full text-right">載具</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* shipping & payment detail end*/}
        <div className="w-full flex justify-center">
          <Checkbox defaultSelected>
            我同意辦理退貨時，由floral_shop代為處理發票及銷貨退回證明單，以加速退貨退款作業。
          </Checkbox>
        </div>

        <div className="w-full gap-2 flex justify-center sm:gap-4 ">
          <Link href="/cart/fill-out">
            <MyButton color="primary" size="xl" isOutline>
              上一步
            </MyButton>
          </Link>
          <Link href="/cart/payment-successful" className="text-white">
            <MyButton color="primary" size="xl">
              確認，進行付款
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}
