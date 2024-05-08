import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { BsChevronRight } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/zh-cn'

export default function CalendarModal({
  event,
  isOpen,
  onClose,
  onOpenChange,
  googleCalendarUrl,
}) {
  moment.locale('zh-cn')
  console.log(event) // 檢查傳進來的值
  console.log(googleCalendarUrl)

  return (
    <>
      <Modal
        size="md"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: '',
          backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
          closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
        }}
      >
        <ModalContent className="pb-8">
          <ModalHeader className="px-8 pt-8 pb-4 text-2xl">
            {event.title}/{event.period}期
          </ModalHeader>
          <ModalBody className="flex gap-2 px-8 py-0">
            <Image
              width={300}
              height={200}
              alt="課程圖片"
              src={event.image}
              className="w-full p-2 border-1 rounded-lg"
            />
            <div>開課商家：{event.store}</div>
            <div>上課地點：{event.address}</div>
            <div>
              上課日期：{moment(event.start).format('YYYY年MM月DD日（dddd）')}
            </div>
            <div>
              上課時間：{moment(event.start).format('HH:mm')}-
              {moment(event.end).format('HH:mm')}
            </div>
            <Link
              href={`/course/${event.course_id}`}
              className="text-tertiary-gray-100 flex flex-row items-center"
            >
              查看課程頁面
              <BsChevronRight />
            </Link>
            <Link
              href={googleCalendarUrl}
              target="_blank"
              className="text-tertiary-gray-100 flex flex-row items-center"
            >
              加到Google日歷
              <BsChevronRight />
            </Link>
          </ModalBody>
          <ModalFooter className="p-0"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
