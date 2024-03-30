import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Image,
} from '@nextui-org/react'
import CircleBtn from './btn-circle'
import { MyButton } from '../btn/mybutton'

export default function CourseTime() {
  return (
    <Card className="flex flex-row px-6">
      <CardBody className="flex px-0">
        <div className="flex items-center justify-between">
          <p className="text-md">3期</p>
          <div>
            <p>2024.04.12</p>
            <p>6:00 am - 8:00 am</p>
          </div>
          <p className="text-tertiary-gray-100">尚餘3個名額</p>
          <div className="flex gap-2">
            <CircleBtn />
            <MyButton color="primary" size="xl">
              直接購買
            </MyButton>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
