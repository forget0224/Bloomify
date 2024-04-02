import React from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { Pagination } from '@nextui-org/react'
import Subtitle from '@/components/common/subtitle'
import { BsFillStarFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'

function ProductReview() {
  const [selected, setSelected] = React.useState('all')
  return (
    <>
      <div className="space-y-6">
        <Subtitle text="商品評價" />
        {/* starts */}
        <div className="flex items-center mt-2.5 mb-1 space-x-4">
          <div>
            <p className="text-4xl text-tertiary-black font-bold">5.0/5</p>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <BsFillStarFill className="text-secondary-100" />
            <BsFillStarFill className="text-secondary-100" />
            <BsFillStarFill className="text-secondary-100" />
            <BsFillStarFill className="text-secondary-100" />
            <BsFillStarFill className="text-secondary-100" />
          </div>
        </div>
        {/* tabs & review content */}
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="all" title="全部(25)">
              <Card>
                <CardBody>
                  {/* first comment */}
                  <div>
                    <div>
                      <h3>用戶名稱</h3>
                      <span>2024.02.12</span>
                    </div>
                    {/* starts */}

                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                      <BsFillStarFill className="text-secondary-100" />
                    </div>

                    {/* comment */}
                    <p>
                      哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                      哈哈哈 哈哈哈 哈哈哈 哈哈哈 哈哈哈
                    </p>
                  </div>
                  <hr className="my-3" />
                  {/* second comment */}
                  <div>
                    <div>
                      <h3>用戶名稱</h3>
                      <span>2024.02.12</span>
                    </div>
                    {/* starts */}
                    <div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <BsFillStarFill className="text-secondary-100" />
                        <BsFillStarFill className="text-secondary-100" />
                        <BsFillStarFill className="text-secondary-100" />
                        <BsFillStarFill className="text-secondary-100" />
                        <BsFillStarFill className="text-secondary-100" />
                      </div>
                    </div>
                    {/* comment */}
                    <p>
                      哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                      哈哈哈 哈哈哈 哈哈哈 哈哈哈 哈哈哈
                    </p>
                    {/* imgs */}
                    <div className="my-4 flex space-x-1.5">
                      <div className="max-w-[100px] max-h-[100px] border border-gray-400 overflow-hidden rounded-lg mb-1">
                        <Image
                          alt=""
                          className="object-fit w-full h-full rounded-none"
                          src="https://i.pinimg.com/originals/86/90/14/869014ea87e157354d2326a5961b20e0.png"
                        />
                      </div>
                      <div className="max-w-[100px] max-h-[100px] border border-gray-400 overflow-hidden rounded-lg">
                        <Image
                          alt=""
                          className="object-fit w-full h-full rounded-none"
                          src="https://i.pinimg.com/originals/86/90/14/869014ea87e157354d2326a5961b20e0.png"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="withImg" title="附圖評價(25)">
              <Card>
                <CardBody>附圖評價</CardBody>
              </Card>
            </Tab>
            <Tab key="five-stars" title="五星(25)">
              <Card>
                <CardBody>五星(25)</CardBody>
              </Card>
            </Tab>
            <Tab key="four-stars" title="四星(25)">
              <Card>
                <CardBody>四星(25)</CardBody>
              </Card>
            </Tab>
            <Tab key="three-stars" title="三星(25)">
              <Card>
                <CardBody>三星(25)</CardBody>
              </Card>
            </Tab>
            <Tab key="two-stars" title="二星(25)">
              <Card>
                <CardBody>二星(25)</CardBody>
              </Card>
            </Tab>
            <Tab key="one-star" title="一星(25)">
              <Card>
                <CardBody>一星(25)</CardBody>
              </Card>
            </Tab>
          </Tabs>
          <div className="my-6">
            <Pagination
              showControls
              total={10}
              initialPage={1}
              className="flex justify-center"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductReview
