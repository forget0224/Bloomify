import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from '@nextui-org/react'
import { CiPhone } from 'react-icons/ci'
import { CiLocationOn } from 'react-icons/ci'
import Subtitle from './subtitle'

export default function CourseMap() {
  return (
    <Card className="p-4">
      <CardHeader>
        <Subtitle text="開課商家資訊" />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {/* <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/hero-card-complete.jpeg"
          width={270}
        /> */}
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.007875795804!2d121.5404192760508!3d25.03380678829804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd379a5ec97%3A0xedc006d25a9e35df!2z6LOH5bGV5ZyL6Zqb6IKh5Lu95pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1711707763962!5m2!1szh-TW!2stw"></iframe>
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="text-large">花疫室</h4>
        <div className="flex flex-row">
          <CiPhone />
          <p className="text-tiny uppercase">(02)1234-5678</p>
        </div>
        <div className="flex flex-row">
          <CiLocationOn />
          <small className="text-tiny uppercase">
            台北市花園區藝術大道123號
          </small>
        </div>
      </CardFooter>
    </Card>
  )
}
