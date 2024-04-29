import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { CiPhone } from 'react-icons/ci'
import { CiLocationOn } from 'react-icons/ci'
import { BsChevronRight } from 'react-icons/bs'
import { Link } from '@nextui-org/react'
import Subtitle from '../common/subtitle'

export default function CourseMap({ store }) {
  // 如果傳進來的值未定義
  if (!store) {
    return <div>Loading...</div>
  }

  // 接收父組件的商家資訊
  return (
    <Card className="p-4 text-tertiary-black">
      <CardHeader>
        <Subtitle text="開課商家資訊" />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <iframe
          className="w-full h-[280px]"
          title="商家地圖"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            store.store_address
          )}&output=embed`}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </CardBody>

      <CardFooter className="flex flex-col gap-1 pb-2 pt-2 items-start">
        <h4 className="text-xl">{store.store_name}</h4>
        <div className="flex flex-row">
          <CiPhone className="w-6 h-6 mr-1" />
          <p className="text-l uppercase">{store.store_tel}</p>
        </div>
        <div className="flex flex-row">
          <CiLocationOn className="w-6 h-6 mr-1" />
          <p className="text-l uppercase">{store.store_address}</p>
        </div>
        <Link href={`/course/search?store_id=${store.store_id}`}>
          <div className="flex flex-row items-center">
            <p className="text-l uppercase hover:underline">
              查看此商家開設課程
            </p>
            <BsChevronRight />
          </div>
        </Link>
      </CardFooter>
    </Card>
  )
}
