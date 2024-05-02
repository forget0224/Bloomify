import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Image } from '@nextui-org/react'

const OrderItemCard = ({ orderDetailId, orderItems, tableStylesContent }) => {
  const filteredItems = orderItems.filter(
    (item) => String(item.product_order_detail_id) === String(orderDetailId)
  )
  console.log('filteredItems', filteredItems)

  return (
    <>
      <div className="flex flex-col">
        <>
          <Table
            selectionMode="single"
            defaultSelectedKeys={['2']}
            aria-label="Example static collection table"
            classNames={tableStylesContent}
          >
            <TableHeader className="bg-secondary-200">
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
              {filteredItems.map((item) => {
                let imageUrl = item.thumbnail_url
                  ? `/assets/shop/products/${item.directory}/${item.thumbnail_url}`
                  : `/assets/shop/products/default_fallback_image.jpg`
                return (
                  <TableRow key="1">
                    <TableCell>
                      <div className="flex flex-row items-center sm:gap-4">
                        <Image
                          src={imageUrl}
                          alt=""
                          className="hidden sm:block sm:w-16 sm:h-16 mx-auto rounded-xl"
                        />
                        <div>
                          <p className="text-nowrap">{item.name}</p>
                          <p className="text-nowrap md:contents text-tertiary-gray-100">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>NT$ {item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>NT$90</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </>
        {/* 付款資訊, 運送資訊 */}
        <div className="flex flex-col pt-4 w-full">
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">付款方式</div>
            <div className="py-1 text-nowrap">Line Pay</div>
          </div>
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">寄送方式</div>
            <div className="py-1">7-ELEVEN 超商</div>
          </div>
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">運送資訊</div>
            <div className="py-1">已取貨</div>
          </div>
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">發票種類</div>
            <div className="py-1">載具</div>
          </div>
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">送達時間</div>
            <div className="py-1">2024-02-27 11:02:08</div>
          </div>
          <hr className="my-1" />
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">小計</div>
            <div className="py-1">NT$90</div>
          </div>
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">運費</div>
            <div className="py-1">NT$60</div>
          </div>
          <div className="flex w-full text-nowrap">
            <div className="py-1 mr-2 text-tertiary-gray-100">折扣</div>
            <div className="py-1 text-primary-100">-NT$50</div>
          </div>
          <div className="flex w-full text-nowrap items-center">
            <div className="py-1 mr-2 text-tertiary-gray-100">總計</div>
            <div className="py-1 text-lg font-medium">NT$100</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderItemCard
