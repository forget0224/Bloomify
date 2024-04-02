import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Tabs, Tab, Image } from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import Subtitle from '@/components/common/subtitle'
import { MyButton } from '@/components/btn/mybutton'
import { Checkbox } from '@nextui-org/react'

export default function Confirm() {
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <main className="flex flex-col justify-center items-center bg-white">
            <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 md:px-0 mb-10">
              {/* steps */}
              <p className="flex w-full justify-center py-10">
                用戶 <span className="text-primary px-2">訂購人姓名</span>
                您好，請確認您的購物資訊無誤
              </p>

              {/* order-detail start */}
              <div className="flex flex-col w-full lg:w-10/12 gap-6 mb-10">
                <Subtitle text="購物明細" />
                {/* 明細 */}
                <div className="flex flex-col gap-3">
                  <Table
                    selectionMode="single"
                    defaultSelectedKeys={['2']}
                    aria-label="Example static collection table"
                  >
                    <TableHeader>
                      <TableColumn className="w-1/2 md:w-1/3 lg:w-1/4 bg-primary-300">
                        商品
                      </TableColumn>
                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                        單價
                      </TableColumn>
                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                        數量
                      </TableColumn>
                      <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6 bg-primary-300">
                        小計
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>
                          <div className="flex flex-row items-center space-x-6">
                            <Image
                              src={'/assets/shop/products/pink_Gladiola_0.jpg'}
                              alt=""
                              className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                            />
                            <p>花的名稱</p>
                          </div>
                        </TableCell>
                        <TableCell>NT$30</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>NT$30</TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell>
                          <div className="flex flex-row items-center space-x-6">
                            <Image
                              src={'/assets/shop/products/pink_Gladiola_0.jpg'}
                              alt=""
                              className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                            />
                            <p>花的名稱</p>
                          </div>
                        </TableCell>
                        <TableCell>NT$30</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>NT$30</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                {/* 小計 */}
                <div>
                  <Table
                    hideHeader
                    aria-label="Example static collection table"
                  >
                    <TableHeader>
                      <TableColumn>無</TableColumn>
                      <TableColumn>無</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell></TableCell>
                        <TableCell className="w-1/4">
                          共 2 項商品，數量 6 個
                        </TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell>小計</TableCell>
                        <TableCell>NT$180</TableCell>
                      </TableRow>
                      <TableRow key="3">
                        <TableCell>運費</TableCell>
                        <TableCell>NT$60</TableCell>
                      </TableRow>
                      <TableRow key="4">
                        <TableCell>折扣</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                      <TableRow key="5">
                        <TableCell>總計</TableCell>
                        <TableCell>NT$220</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              {/* order-detail end */}

              {/* shipping & payment detail start*/}
              <div className="flex flex-col w-full lg:w-10/12 gap-6">
                <Subtitle text="配送/付款明細" />
                <Table hideHeader aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>配送方式</TableColumn>
                    <TableColumn>內容</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>配送方式</TableCell>
                      <TableCell>超商取貨</TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>配送地址</TableCell>
                      <TableCell>
                        7-ELEVEN 大安門市 / 台北市大安區xxx路xxx號x樓
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>收件人</TableCell>
                      <TableCell>芙莉蓮</TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>連絡電話</TableCell>
                      <TableCell>0912345678</TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell>付款方式</TableCell>
                      <TableCell>Line Pay</TableCell>
                    </TableRow>
                    <TableRow key="6">
                      <TableCell>發票</TableCell>
                      <TableCell>載具</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* shipping & payment detail end*/}
              <Checkbox
                defaultSelected
                className="flex justify-center w-full lg:w-10/12 py-10"
              >
                我同意辦理退貨時，由floral_shop代為處理發票及銷貨退回證明單，以加速退貨退款作業。
              </Checkbox>

              <div className="w-full flex justify-center gap-4">
                <MyButton color="primary" size="xl" isOutline>
                  上一步
                </MyButton>
                <MyButton color="primary" size="xl">
                  確認，進行付款
                </MyButton>
              </div>
            </div>
          </main>
        </>
      }
    </DefaultLayout>
  )
}
