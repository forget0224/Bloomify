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
        localStorage.removeItem('cartItems')
        localStorage.removeItem('fillOutDetails')
        localStorage.removeItem('store711')
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
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-center columns-12 mb-10 px-5 md:px-0">
            {/* 成功圖示 */}
            <div className="flex flex-col md:w-6/12 lg:w-4/12 items-center my-10">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M98.6044 60.0116C99.0499 60.2247 99.4808 60.4426 99.873 60.6701V60.6605C103.191 62.5754 105.866 65.4313 107.561 68.8668C109.256 72.3024 109.894 76.1633 109.394 79.9614C108.894 83.7595 107.28 87.3242 104.754 90.2045C102.228 93.0849 98.9054 95.1516 95.2052 96.1434C93.5596 96.5847 91.8635 96.8094 90.1598 96.8116C86.7691 96.8111 83.4386 95.9159 80.5046 94.2162C80.1124 93.9886 79.7057 93.7223 79.3038 93.4463C79.3425 93.9354 79.3667 94.4196 79.3667 94.8747C79.3667 100.012 77.3261 104.938 73.6938 108.57C70.0616 112.203 65.1351 114.243 59.9983 114.243C54.8615 114.243 49.9351 112.203 46.3028 108.57C42.6705 104.938 40.6299 100.012 40.6299 94.8747C40.6299 94.4147 40.6541 93.9305 40.6928 93.4463C40.2909 93.732 39.8842 93.9886 39.492 94.2162C37.2884 95.5081 34.8511 96.3513 32.3204 96.6973C29.7896 97.0433 27.2154 96.8853 24.7459 96.2325C22.2765 95.5796 19.9606 94.4447 17.9315 92.8931C15.9024 91.3415 14.2003 89.4039 12.9231 87.1918C11.6459 84.9798 10.8189 82.5369 10.4897 80.0039C10.1605 77.4709 10.3355 74.8978 11.0048 72.4327C11.674 69.9677 12.8242 67.6593 14.3892 65.6406C15.9542 63.6218 17.9031 61.9326 20.1236 60.6701C20.5158 60.4426 20.9467 60.2247 21.3922 60.0116C20.9467 59.7986 20.5158 59.5807 20.1236 59.3531C17.9031 58.0906 15.9542 56.4014 14.3892 54.3827C12.8242 52.3639 11.674 50.0556 11.0048 47.5905C10.3355 45.1254 10.1605 42.5523 10.4897 40.0193C10.8189 37.4863 11.6459 35.0435 12.9231 32.8314C14.2003 30.6193 15.9024 28.6817 17.9315 27.1301C19.9606 25.5786 22.2765 24.4437 24.7459 23.7908C27.2154 23.1379 29.7896 22.9799 32.3204 23.3259C34.8511 23.672 37.2884 24.5152 39.492 25.807C39.8842 26.0346 40.2909 26.3009 40.6928 26.5769C40.6299 26.0637 40.6299 25.5795 40.6299 25.1243V25.1243C40.6299 19.9874 42.6705 15.061 46.3028 11.4287C49.9351 7.79645 54.8615 5.75586 59.9983 5.75586C65.1351 5.75586 70.0616 7.79645 73.6938 11.4287C77.3261 15.061 79.3667 19.9874 79.3667 25.1243C79.3667 25.6085 79.3425 26.0927 79.3038 26.5769C79.7057 26.2912 80.1124 26.0346 80.5046 25.807C82.7082 24.5152 85.1455 23.672 87.6762 23.3259C90.207 22.9799 92.7812 23.1379 95.2507 23.7908C97.7201 24.4437 100.036 25.5786 102.065 27.1301C104.094 28.6817 105.796 30.6193 107.073 32.8314C108.351 35.0435 109.178 37.4863 109.507 40.0193C109.836 42.5523 109.661 45.1254 108.992 47.5905C108.323 50.0556 107.172 52.3639 105.607 54.3827C104.042 56.4014 102.094 58.0906 99.873 59.3531C99.4808 59.5807 99.0499 59.7986 98.6044 60.0116Z"
                  fill="#68A392"
                />
                <path
                  d="M39.6016 57.7857L53.2016 73.0008L80.4016 47.8008"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
