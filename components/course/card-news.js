import React from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

export default function CardNews() {
  const defaultContent =
    '探索新知識，啟迪新思維！我們興奮地宣布，全新課程現已上線！無論您是想學習一項新技能，深入了解特定主題，還是提升個人成長，我們的課程都能滿足您的需求。從實踐操作到專家分享，我們的課程內容豐富多彩，適合各種學習風格和興趣愛好。無論您是初學者還是專家，我們都歡迎您的加入！立即探索我們的課程，啟程開啟新的學習旅程！'
  const newsTime = '2023.01.01'

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

  return (
    <Accordion
      variant="splitted"
      itemClasses={accordionStyle}
      className="custom-accordion-padding"
    >
      <AccordionItem
        key="1"
        style={{ padding: '8px 24px' }}
        aria-label="新課程上線！早鳥優惠中"
        title="新課程上線！早鳥優惠中"
      >
        {defaultContent}
        <p className="py-2 text-tertiary-gray-100">{newsTime}</p>
      </AccordionItem>
      <AccordionItem
        key="2"
        style={{ padding: '8px 24px' }}
        aria-label="新課程上線！早鳥優惠中"
        title="新課程上線！早鳥優惠中"
      >
        {defaultContent}
        <p className="py-2 text-tertiary-gray-100">{newsTime}</p>
      </AccordionItem>
      <AccordionItem
        key="3"
        style={{ padding: '8px 24px' }}
        aria-label="新課程上線！早鳥優惠中"
        title="新課程上線！早鳥優惠中"
      >
        {defaultContent}
        <p className="py-2 text-tertiary-gray-100">{newsTime}</p>
      </AccordionItem>
    </Accordion>
  )
}
