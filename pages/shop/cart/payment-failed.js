import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Image,
  CardFooter,
} from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import Subtitle from '@/components/course/subtitle'
import { MyButton } from '@/components/btn/mybutton'
import { IoMdCheckmark } from 'react-icons/io'

export default function Confirm() {
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div className="mx-auto md:px-52 sm:24 space-y-10">
            <div className="flex justify-center my-16">
              <div className="flex flex-col items-center space-y-6">
                <div className="border border-solid rounded-full bg-danger w-10 h-10 flex justify-center items-center color-white w-24 h-24 lg:w-24 lg:h-24">
                  <IoMdCheckmark
                    className="w-20 h-20 lg:w-20 lg:h-20"
                    style={{ color: 'white' }}
                  />
                </div>
                <p className="text-2xl lg:text-3xl xl:text-4xl text-danger text-center px-4 lg:px-8">
                  付款失敗
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-1/2 space-y-6">
                <Subtitle text="訂單明細" />
                <Card>
                  <CardBody>
                    <Table
                      hideHeader
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>xx</TableColumn>
                        <TableColumn>xx</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell>訂單編號</TableCell>
                          <TableCell>S2024022700</TableCell>
                        </TableRow>
                        <TableRow key="2">
                          <TableCell>訂單金額</TableCell>
                          <TableCell>NT$90</TableCell>
                        </TableRow>
                        <TableRow key="3">
                          <TableCell>訂單成立日期</TableCell>
                          <TableCell>2024-02-27 11:02:08</TableCell>
                        </TableRow>
                        <TableRow key="4">
                          <TableCell>訂單狀態</TableCell>
                          <TableCell>處理中</TableCell>
                        </TableRow>
                        <TableRow key="5">
                          <TableCell>付款方式</TableCell>
                          <TableCell>Line Pay</TableCell>
                        </TableRow>
                        <TableRow key="6">
                          <TableCell>付款狀態</TableCell>
                          <TableCell className="text-danger">待付款</TableCell>
                        </TableRow>
                        <TableRow key="7">
                          <TableCell>發票</TableCell>
                          <TableCell>載具</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="flex justify-center space-x-10 py-10">
              <MyButton color="primary" size="xl" isOutline>
                上一步
              </MyButton>
              <MyButton color="primary" size="xl">
                下一步
              </MyButton>
            </div>
          </div>
        </>
      }
    </DefaultLayout>
  )
}
