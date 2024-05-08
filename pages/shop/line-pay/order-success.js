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
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import SuccessAnimation from '@/components/common/animation_success'
import Head from 'next/head'

export default function OrderSuccess() {
  const [activePage, setActivePage] = useState('shop')
  const tableStyles = {
    th: 'text-base', // 表頭
    td: 'text-base', // 表格
    wrapper: 'text-base', // 整個表格
  }
  const [orderDetails, setOrderDetails] = useState([])
  // console.log(orderDetails)

  // 獲得訂單明細
  const getOrderDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/products/get-all-order-details`,
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
        if (data && data.orderDetails) {
          setOrderDetails(data.orderDetails)
        } else {
          console.log('No order details available or data is malformed:', data)
          setOrderDetails([]) // 若無數據，設置為空陣列
        }
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
      setOrderDetails([])
    }
  }
  useEffect(() => {
    getOrderDetails()
  }, [])

  // 取數據陣列的最後一項，確保數據已加載
  const latestDetail =
    orderDetails.length > 0 ? orderDetails[orderDetails.length - 1] : null
  // console.log(latestDetail)

  // Line Pay: 確認交易，處理伺服器通知 line pay 已確認付款
  const router = useRouter()
  const [paidSuccess, setPaidSuccess] = useState([])
  const handleConfirm = async (transactionId, orderId) => {
    try {
      const r = await fetch(
        'http://localhost:3005/products/line-pay/confirm' +
          `?transactionId=${transactionId}&orderId=${orderId}`
      )

      const d = await r.json()
      if (d.success) {
        setPaidSuccess(true)
      } else {
        setPaidSuccess(false)
        // 跳出錯誤提示
        console.log('付款失敗')
      }
    } catch (ex) {
      console.log(ex)
    }
  }
  // Line Pay: confirm 回來使用
  useEffect(() => {
    if (router.isReady) {
      // console.log(router.query)
      const { transactionId, orderId } = router.query

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)或跳出錯誤訊息
      if (!transactionId || !orderId) {
        console.log('qs 參數錯誤')
        router.push('/shop/line-pay/order-confirm')
        // 關閉載入狀態
        return
      }

      // 向server發送確認交易api
      handleConfirm(transactionId, orderId)
    }

    // eslint-disable-next-line
  }, [router.isReady])

  return (
    <DefaultLayout activePage={activePage}>
      <>
        <Head>
          <title>付款成功!</title>
        </Head>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-center columns-12 mb-10 px-5 md:px-0">
            {/* 成功圖示 */}
            <div className="flex flex-col md:w-6/12 lg:w-4/12 items-center my-10">
              <SuccessAnimation />
              <p className="text-2xl font-medium mt-6">
                付款成功，您的訂單已成立
              </p>
            </div>

            <div className="w-full flex flex-col md:w-6/12 lg:w-4/12 items-center justify-center gap-4">
              <Subtitle text="訂單明細" className="w-full" />
              <Table
                hideHeader
                classNames={tableStyles}
                aria-label="Order Details"
              >
                <TableHeader>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>

                <TableBody>
                  <TableRow key="1">
                    <TableCell>訂單編號</TableCell>
                    <TableCell>{latestDetail?.order_number}</TableCell>
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
                      {moment(latestDetail?.created_at).format('YYYY-MM-DD')}
                    </TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>訂單狀態</TableCell>
                    <TableCell className="text-danger">
                      {latestDetail?.order_status}
                    </TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>付款方式</TableCell>
                    <TableCell>{latestDetail?.payment_method}</TableCell>
                  </TableRow>
                  <TableRow key="6">
                    <TableCell>付款狀態</TableCell>
                    <TableCell className="text-primary">已付款</TableCell>
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
                  <MyButton
                    color="primary"
                    size="xl"
                    className="w-full sm:w-auto"
                  >
                    回首頁
                  </MyButton>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    </DefaultLayout>
  )
}
