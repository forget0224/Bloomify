import React from 'react'
import { useCart } from '@/context/course-cart-context'
import { Card, CardBody, Link } from '@nextui-org/react'
import CircleBtn from './btn-add-to-cart'
import { MyButton } from '../btn/mybutton'
import FlowerIcon from './image-flower'
import moment from 'moment'
import 'moment/locale/zh-cn'

// 把加入購物車會到的 courseDetails 和 datetimes 資訊送進來
export default function CourseTime({ courseDetails, datetimes }) {
  moment.locale('zh-cn')
  const { cart, addToCart } = useCart()

  // 如果傳進來的值未定義
  if (!courseDetails || !datetimes) {
    return <div>Loading...</div>
  }

  // 處理日期格式
  // function formatDate(dateString) {
  //   const options = {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   }
  //   return new Date(dateString).toLocaleDateString('zh-TW', options)
  // }
  // 處理時間格式
  function formatTime(timeString) {
    return moment(timeString, 'HH:mm').format('HH:mm')
  }
  const now = moment()

  return (
    <>
      {datetimes.map((datetimes) => {
        const isExpired = moment(datetimes.date).isBefore(now, 'day')

        return (
          <Card key={datetimes.id} className="flex flex-row px-6 py-6">
            <CardBody className="flex flex-col lg:flex-row items-left lg:items-center justify-between p-0">
              <div className="flex flex-row gap-2">
                <FlowerIcon />
                <p className="text-md">{datetimes.period}期</p>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4">
                <p>{moment(datetimes.date).format('YYYY年MM月DD日（dddd）')}</p>
                <p>
                  {formatTime(datetimes.start_time)}-
                  {formatTime(datetimes.end_time)}
                </p>
              </div>
              {/* TODO: */}
              {/* <p className="text-tertiary-gray-100">尚餘{`3`}個名額</p> */}
              <div className="flex gap-4 mt-2 lg:mt-0">
                {/* 加入購物車按鈕綁定動作 */}
                <CircleBtn
                  onClick={() => addToCart(courseDetails, datetimes.period)}
                  disabled={isExpired}
                />
                <Link href="/cart?tab=course">
                  <MyButton
                    color="primary"
                    size="xl"
                    className="w-full md:w-1/2 lg:w-full"
                    onClick={() => addToCart(courseDetails, datetimes.period)}
                    isDisabled={isExpired}
                  >
                    立即預約
                  </MyButton>
                </Link>
              </div>
            </CardBody>
          </Card>
        )
      })}
    </>
  )
}
