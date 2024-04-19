import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Image,
} from '@nextui-org/react'
import CircleBtn from './btn-add-to-cart'
import { MyButton } from '../btn/mybutton'

export default function CourseTime({ datetimes }) {
  // 處理日期格式
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('zh-TW', options)
  }
  // 處理時間格式
  function formatTime(timeString) {
    return timeString.substr(0, 5)
  }

  return (
    <>
      {datetimes.map((datetimes) => (
        <Card key={datetimes.id} className="flex flex-row px-6 py-6">
          <CardBody className="flex flex-col lg:flex-row items-left lg:items-center justify-between p-0">
            <p className="text-md">{datetimes.period}期</p>
            <div>
              <p>{formatDate(datetimes.date)}</p>
              <p>
                {formatTime(datetimes.start_time)}-
                {formatTime(datetimes.end_time)}
              </p>
            </div>
            <p className="text-tertiary-gray-100">尚餘{`3`}個名額</p>
            <div className="flex gap-4 mt-2 lg:mt-0">
              <Link href="/cart/">
                <CircleBtn />
              </Link>
              <Link href="/cart/">
                <MyButton
                  color="primary"
                  size="xl"
                  className="w-full md:w-1/2 lg:w-full"
                >
                  立即預約
                </MyButton>
              </Link>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  )
}
