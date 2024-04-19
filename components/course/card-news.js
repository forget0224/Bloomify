import React from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

export default function CardNews({ news }) {
  //外層手風琴樣式
  const accordionStyle = {
    root: ['bg-danger'],
    base: ['p-0', 'text-tertiary-black', 'flex', 'flex-col', 'mb-2'],
    heading: [''],
    titleWrapper: [''],
    subtitle: [''],
    startContent: [''],
    indicator: [''],
    content: ['p-0', 'text-tertiary-black'],
    title: ['p-0', 'text-tertiary-black'],
    trigger: [''],
  }

  // 處理日期格式
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(dateString).toLocaleDateString('zh-TW', options)
  }

  return (
    <Accordion
      variant="splitted"
      itemClasses={accordionStyle}
      className="custom-accordion-padding"
    >
      {news.map((news) => (
        <AccordionItem
          key={news.id}
          style={{ padding: '8px 24px' }}
          aria-label={''}
          title={news.title}
        >
          {news.content}
          <p className="py-2 text-tertiary-gray-100">
            {formatDate(news.created_at)}
          </p>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
