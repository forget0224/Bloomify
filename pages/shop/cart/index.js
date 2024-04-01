import React, { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import ShopSlider from '@/components/shop/shop-slider'
import { MyButton } from '@/components/btn/mybutton'
import { Button } from '@nextui-org/react'
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

export default function Cart() {
  const [activePage, setActivePage] = useState('shop')
  return (
    <>
      <DefaultLayout activePage={activePage}>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 md:px-0 mb-10">
            {/* session bar */}
            <div className="flex w-full">
              <div class="flex flex-1 items-center justify-center h-16 max-h-full md:max-h-16 border-b-1 border-black">
                <p>代客送花</p>
              </div>
              <div class="flex flex-1 items-center justify-center h-16 max-h-full md:max-h-16 border-b-1 border-black">
                <p>線上商城</p>
              </div>
              <div class="flex flex-1 items-center justify-center h-16 max-h-full md:max-h-16 border-b-1 border-black">
                <p>課程預約</p>
              </div>
            </div>
            {/* steps */}
            <div>{/* https://github.com/saini-g/react-step-progress */}</div>
            {/* cart content start*/}
            <div className="flex w-full flex-col">
              <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList:
                    'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                  cursor: 'w-full bg-[#22d3ee]',
                  tab: 'max-w-fit px-0 h-12',
                  tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
                }}
              >
                <Tab
                  key="information"
                  title={
                    <div className="flex items-center space-x-2">購物車</div>
                  }
                >
                  <Card>
                    <div className="flex flex-col gap-3">
                      <Table
                        selectionMode="single"
                        defaultSelectedKeys={['2']}
                        aria-label="Example static collection table"
                      >
                        <TableHeader>
                          <TableColumn className="w-1/2 md:w-1/3 lg:w-1/4">
                            商品
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            單價
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            數量
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            小計
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            變更
                          </TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            <TableCell>
                              <div className="flex flex-row items-center space-x-6">
                                <Image
                                  src={
                                    '/assets/shop/products/pink_Gladiola_0.jpg'
                                  }
                                  alt=""
                                  className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                                />
                                <p>花的名稱</p>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex gap-4 items-center ">
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  +
                                </Button>
                                <div>1</div>
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  -
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex flex-col space-y-2">
                                <MyButton color="primary" size="xl" isOutline>
                                  下次再買
                                </MyButton>
                                <MyButton color="primary" size="xl" isOutline>
                                  移除商品
                                </MyButton>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow key="2">
                            <TableCell>
                              <div className="flex flex-row items-center space-x-6">
                                <Image
                                  src={
                                    '/assets/shop/products/pink_Gladiola_0.jpg'
                                  }
                                  alt=""
                                  className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                                />
                                <p>花的名稱</p>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex gap-4 items-center ">
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  +
                                </Button>
                                <div>1</div>
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  -
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex flex-col space-y-2">
                                <MyButton color="primary" size="xl" isOutline>
                                  下次再買
                                </MyButton>
                                <MyButton color="primary" size="xl" isOutline>
                                  移除商品
                                </MyButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <CardFooter className="flex justify-end pr-6">
                      <div className="flex flex-col space-y-2">
                        <div>共 2 項商品，數量 6 個</div>
                        <div className="flex justify-end space-x-6">
                          <span>小計</span>
                          <span className="text-primary">NT$90</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Tab>
                {/* buy again */}
                <Tab
                  key="store"
                  title={
                    <div className="flex items-center space-x-2">下次再買</div>
                  }
                >
                  <Card>
                    <div className="flex flex-col gap-3">
                      <Table
                        selectionMode="single"
                        defaultSelectedKeys={['2']}
                        aria-label="Example static collection table"
                      >
                        <TableHeader>
                          <TableColumn className="w-1/2 md:w-1/3 lg:w-1/4">
                            商品
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            單價
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            數量
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            小計
                          </TableColumn>
                          <TableColumn className="w-1/4 md:w-1/5 lg:w-1/6">
                            變更
                          </TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            <TableCell>
                              <div className="flex flex-row items-center space-x-6">
                                <Image
                                  src={
                                    '/assets/shop/products/pink_Gladiola_0.jpg'
                                  }
                                  alt=""
                                  className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                                />
                                <p>花的名稱</p>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex gap-4 items-center ">
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  +
                                </Button>
                                <div>1</div>
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  -
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex flex-col space-y-2">
                                <MyButton color="primary" size="xl">
                                  下次再買
                                </MyButton>
                                <MyButton color="primary" size="xl" isOutline>
                                  移除商品
                                </MyButton>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow key="2">
                            <TableCell>
                              <div className="flex flex-row items-center space-x-6">
                                <Image
                                  src={
                                    '/assets/shop/products/pink_Gladiola_0.jpg'
                                  }
                                  alt=""
                                  className="w-6 h-6 md:w-24 md:h-24 mx-auto"
                                />
                                <p>花的名稱</p>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex gap-4 items-center ">
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  +
                                </Button>
                                <div>1</div>
                                <Button
                                  isIconOnly
                                  variant="faded"
                                  className="border-transparent"
                                >
                                  -
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>NT$30</TableCell>
                            <TableCell>
                              <div className="flex flex-col space-y-2">
                                <MyButton color="primary" size="xl">
                                  下次再買
                                </MyButton>
                                <MyButton color="primary" size="xl" isOutline>
                                  移除商品
                                </MyButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Card>
                </Tab>
              </Tabs>
            </div>
            {/* cart content end */}
            <div className="flex justify-center space-x-10 py-10">
              <MyButton color="primary" size="xl" isOutline>
                繼續購物
              </MyButton>
              <MyButton color="primary" size="xl">
                下一步
              </MyButton>
            </div>
            <ShopSlider />
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}
