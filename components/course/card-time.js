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

export default function CourseTime() {
  return (
    <Card className="flex flex-row px-6 py-6">
      <CardBody className="flex flex-col lg:flex-row items-left lg:items-center justify-between p-0">
        <p className="text-md">3期</p>
        <div>
          <p>2024.04.12</p>
          <p>6:00 am - 8:00 am</p>
        </div>
        <p className="text-tertiary-gray-100">尚餘3個名額</p>
        <div className="flex gap-4 mt-2 lg:mt-0">
          <CircleBtn />
          <MyButton color="primary" size="xl" className="w-full">
            直接購買
          </MyButton>
        </div>
      </CardBody>
    </Card>
  )
}
