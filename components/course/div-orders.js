import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Card } from '@nextui-org/react'

export default function CourseOrder({ order }) {
  // 縮短 UUID
  function shortenUUID(uuid) {
    const parts = uuid.split('-')
    const shortUUID = parts.slice(0, 2).join('-')
    return shortUUID
  }

  //外層手風琴樣式
  const accordionStyle = {
    base: ['p-0', 'text-tertiary-black', 'p-4'], // 訂單明細
    content: ['p-0'], // 商品列表
    title: ['text-tertiary-black'],
    trigger: ['px-0', 'py-1'],
  }

  return (
    <>
      <Card
        key={order.id}
        className="shadow-none border-1 border-tertiary-gray-200 mb-4"
      >
        <Accordion itemClasses={accordionStyle} key={order.id}>
          <AccordionItem
            aria-label={'AccordionItem'}
            title={
              <>
                <div className="flex flex-col md:flex-row gap-2 items-left text-nowrap">
                  訂單號碼
                  <span className="text-primary-100">
                    {order ? `#${shortenUUID(order.order_number)}` : ''}
                  </span>
                </div>
                <div className="pt-2">
                  {order.items ? (
                    <>
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col md:flex-row text-base border-b-1 last:border-0 py-1"
                        >
                          <span className="md:w-[350px] line-clamp-1">
                            {item.course.name}/{item.period}期
                          </span>
                          <span className="md:w-[150px]">
                            NT${item.course.price}
                          </span>
                        </div>
                      ))}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </>
            }
          >
            {/* 手風琴內容 */}
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
              {/* 新表格 */}
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col border-1 border-tertiary-gray-200 rounded-lg p-4 mt-2">
                  <div className="flex justify-between md:justify-start">
                    <span className="w-[100px]">訂單總額：</span>
                    <span className="ml-1">NT${order.total_cost}</span>
                  </div>
                  <div className="flex justify-between md:justify-start">
                    <span className="w-[100px]">折扣金額：</span>
                    <span className="ml-1">
                      {order.discount === 0 ? '-' : `NT$${order.discount}`}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-start">
                    <span className="w-[100px]">應付總額：</span>
                    <span className="ml-1 text-righttext-primary-100">
                      NT${order.payment_amount}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-start">
                    <span className="w-[100px]">付款方式：</span>
                    <span className="ml-1">
                      {order.share_payment_id === 1
                        ? '綠界'
                        : order.share_payment_id === 2
                        ? 'Line Pay'
                        : '現金'}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-start">
                    <span className="w-[100px]">付款狀態：</span>
                    <span
                      className={`ml-1 ${
                        order.payment_status &&
                        order.payment_status.name === '未付款'
                          ? 'text-danger'
                          : 'text-primary'
                      }`}
                    >
                      {order.payment_status ? order.payment_status.name : ''}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-start">
                    <span className="w-[100px]">發票種類：</span>
                    <span className="ml-1">
                      {order.invoice ? order.invoice.name : ''}
                      {/* 如果 invoice_id 是 2 ，則顯示手機條碼 */}
                      {order.invoice_id === 2 && order.mobile_barcode
                        ? `(${order.mobile_barcode})`
                        : ''}
                    </span>
                  </div>
                  <div className="flex justify-between md:justify-start">
                    <span className="w-[100px]">成立時間：</span>
                    <span className="ml-1 text-right">
                      {moment(order.created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  )
}
