import { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import { Link } from '@nextui-org/react'
import Subtitle from '@/components/common/subtitle'
import moment from 'moment'

const ShopPaymentSuccess = () => {
  const tableStyles = {
    th: 'text-base', // 表頭
    td: 'text-base', // 表格
    wrapper: 'text-base', // 整個表格
  }
  const [orderDetails, setOrderDetails] = useState([])
  // console.log(orderDetails)

  // 獲得訂單明細
  const getOrderDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/products/get-order-details`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data.data)
      }
    } catch (error) {
      // console.log('Error order detail', error)
    }
  }
  useEffect(() => {
    getOrderDetail()
  }, [])

  // 取數據陣列的最後一項，確保數據已加載
  // const latestDetail = orderDetails[orderDetails.length - 1] 這樣寫結果會是undefined
  const latestDetail =
    orderDetails.length > 0 ? orderDetails[orderDetails.length - 1] : null
  // console.log(latestDetail?.total_cost)

  return (
    <>
      <div className="w-full flex flex-col md:w-6/12 lg:w-4/12 items-center justify-center gap-4">
        <Subtitle text="訂單明細" className="w-full" />
        <Table hideHeader classNames={tableStyles} aria-label="Order Details">
          <TableHeader>
            <TableColumn></TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>

          <TableBody>
            <TableRow key="1">
              <TableCell>訂單編號</TableCell>
              <TableCell>S2024022700</TableCell>
            </TableRow>

            <TableRow key="2">
              <TableCell>訂單金額</TableCell>
              <TableCell>
                NT${''}
                {latestDetail?.total_cost}
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>訂單成立日期</TableCell>
              <TableCell>
                {moment(latestDetail?.updated_at).format('YYYY-MM-DD HH:MM')}
              </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>訂單狀態</TableCell>
              <TableCell className="text-danger">處理中</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>付款方式</TableCell>
              <TableCell>{latestDetail?.payment_method}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>付款狀態</TableCell>
              <TableCell>已付款</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell>發票</TableCell>
              <TableCell>{latestDetail?.invoice_option}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="container flex flex-wrap justify-center my-10 mx-4 sm:mx-6">
        <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
          <Link href="/center/shop-order">
            <MyButton
              color="primary"
              size="xl"
              isOutline
              className="w-full sm:w-auto"
            >
              查看訂單
            </MyButton>
          </Link>

          <Link href="/">
            <MyButton color="primary" size="xl" className="w-full sm:w-auto">
              回首頁
            </MyButton>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ShopPaymentSuccess
