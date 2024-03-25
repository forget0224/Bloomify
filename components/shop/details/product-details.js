import React from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react'

function ProductDetails() {
  const [selected, setSelected] = React.useState('information')

  return (
    <>
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
            title={<div className="flex items-center space-x-2">商品訊息</div>}
          >
            <Card>
              <CardBody>商品訊息</CardBody>
            </Card>
          </Tab>

          <Tab
            key="store"
            title={<div className="flex items-center space-x-2">販售店家</div>}
          >
            <Card>
              <CardBody>販售店家</CardBody>
            </Card>
          </Tab>
          <Tab
            key="size"
            title={<div className="flex items-center space-x-2">尺寸</div>}
          >
            <Card>
              <CardBody>尺寸</CardBody>
            </Card>
          </Tab>
          {/* 新增的Tab */}
          <Tab
            key="note"
            title={<div className="flex items-center space-x-2">注意事項</div>}
          >
            <Card>
              <CardBody>注意事項</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default ProductDetails
