import React, { useState } from 'react'
import moment from 'moment'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Card } from '@nextui-org/react'
import Image from 'next/image'
import { BsChevronRight } from 'react-icons/bs'
import CourseReview from './modal-review'
import { useDisclosure } from '@nextui-org/react'
import Link from 'next/link'

// 這裡傳遞進來的是單堂課程
export default function CourseCard({ course, removeReviewedItem }) {
  //外層手風琴樣式
  const accordionStyle = {
    base: ['p-0', 'text-tertiary-black', 'p-4'], // 訂單明細
    content: ['p-0'], // 商品列表
    title: ['text-tertiary-black'],
    trigger: ['px-0', 'py-1'],
  }

  // 評價 Modal 變數
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  // 要傳遞給評價 Modal 的資料
  const [reviewDetails, setReviewDetails] = useState({
    name: '',
    period: '',
    id: '',
  })
  // 在打開 Modal 前設置課程評價需要的資料
  const handleReviewClick = () => {
    setReviewDetails({
      name: course.course.name,
      period: course.period,
      id: course.id,
    })
    onOpen()
  }

  return (
    <>
      <Card
        key={course.id}
        className="shadow-none border-1 border-tertiary-gray-200"
      >
        <Accordion itemClasses={accordionStyle}>
          <AccordionItem
            key={course.id}
            aria-label={`Accordion ${course.id}`}
            title={
              <div className="flex flex-row gap-2 items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.72 12.1302C19.644 12.0862 19.5606 12.044 19.4744 12.0027C19.5606 11.9615 19.644 11.9193 19.72 11.8752C20.1499 11.6308 20.5272 11.3037 20.8302 10.9129C21.1332 10.522 21.3559 10.0751 21.4855 9.59783C21.6151 9.12056 21.649 8.62237 21.5852 8.13194C21.5215 7.64152 21.3614 7.16855 21.1141 6.74026C20.8668 6.31197 20.5373 5.93682 20.1444 5.63641C19.7515 5.336 19.3032 5.11627 18.825 4.98986C18.3469 4.86346 17.8485 4.83287 17.3585 4.89987C16.8685 4.96686 16.3966 5.13012 15.97 5.38023C15.894 5.4243 15.8153 5.47398 15.7375 5.5293C15.745 5.43555 15.7497 5.3418 15.7497 5.24805C15.7497 4.25349 15.3546 3.29966 14.6513 2.5964C13.9481 1.89314 12.9942 1.49805 11.9997 1.49805C11.0051 1.49805 10.0513 1.89314 9.34802 2.5964C8.64476 3.29966 8.24967 4.25349 8.24967 5.24805C8.24967 5.33617 8.24967 5.42992 8.26185 5.5293C8.18404 5.47586 8.10529 5.4243 8.02935 5.38023C7.60271 5.13012 7.13081 4.96686 6.64082 4.89987C6.15083 4.83287 5.65243 4.86346 5.17431 4.98986C4.69618 5.11627 4.24779 5.336 3.85493 5.63641C3.46208 5.93682 3.13252 6.31197 2.88524 6.74026C2.63796 7.16855 2.47784 7.64152 2.41409 8.13194C2.35035 8.62237 2.38424 9.12056 2.51382 9.59783C2.64339 10.0751 2.8661 10.522 3.1691 10.9129C3.47211 11.3037 3.84943 11.6308 4.27935 11.8752C4.35529 11.9193 4.43873 11.9615 4.52498 12.0027C4.43873 12.044 4.35529 12.0862 4.27935 12.1302C3.84943 12.3747 3.47211 12.7017 3.1691 13.0926C2.8661 13.4834 2.64339 13.9304 2.51382 14.4076C2.38424 14.8849 2.35035 15.3831 2.41409 15.8735C2.47784 16.364 2.63796 16.8369 2.88524 17.2652C3.13252 17.6935 3.46208 18.0687 3.85493 18.3691C4.24779 18.6695 4.69618 18.8892 5.17431 19.0156C5.65243 19.142 6.15083 19.1726 6.64082 19.1056C7.13081 19.0386 7.60271 18.8754 8.02935 18.6252C8.10529 18.5812 8.18404 18.5315 8.26185 18.4762C8.25435 18.5699 8.24967 18.6637 8.24967 18.7527C8.24967 19.7473 8.64476 20.7011 9.34802 21.4044C10.0513 22.1076 11.0051 22.5027 11.9997 22.5027C12.9942 22.5027 13.9481 22.1076 14.6513 21.4044C15.3546 20.7011 15.7497 19.7473 15.7497 18.7527C15.7497 18.6646 15.745 18.5709 15.7375 18.4762C15.8153 18.5296 15.894 18.5812 15.97 18.6252C16.538 18.9543 17.1829 19.1276 17.8394 19.1277C18.1692 19.1273 18.4976 19.0838 18.8162 18.9984C19.5326 18.8063 20.176 18.4062 20.665 17.8485C21.154 17.2908 21.4666 16.6007 21.5634 15.8653C21.6601 15.1299 21.5366 14.3824 21.2085 13.7172C20.8804 13.0521 20.3624 12.4991 19.72 12.1284V12.1302ZM11.9997 14.6277C11.4805 14.6277 10.973 14.4738 10.5413 14.1853C10.1096 13.8969 9.77316 13.4869 9.57448 13.0073C9.3758 12.5276 9.32382 11.9998 9.42511 11.4906C9.52639 10.9814 9.7764 10.5137 10.1435 10.1466C10.5106 9.77947 10.9784 9.52946 11.4876 9.42817C11.9968 9.32689 12.5246 9.37887 13.0042 9.57755C13.4839 9.77623 13.8938 10.1127 14.1823 10.5444C14.4707 10.976 14.6247 11.4836 14.6247 12.0027C14.6247 12.6989 14.3481 13.3666 13.8558 13.8589C13.3635 14.3512 12.6959 14.6277 11.9997 14.6277Z"
                    fill="#68A392"
                  />
                </svg>
                <span className="line-clamp-1">
                  {`${course.course.name}/${course.period}期`}
                </span>
              </div>
            }
          >
            {/* 手風琴內容 */}
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
              <div className="flex w-full md:w-[240px] justify-start">
                <Image
                  width={200}
                  height={100}
                  alt="課程圖片"
                  src={course.course.images[0].path}
                  className="p-2 border-1 rounded-lg mt-2"
                />
              </div>
              {/* 新表格 */}
              <div className="flex flex-col w-full gap-2 md:mt-2">
                <div className="flex flex-col md:flex-row py-1 md:py-0 border-b-1 md:border-0 border-tertiary-gray-200">
                  <div>上課時間：</div>
                  {course.course.datetimes && course.course.datetimes.length > 0
                    ? `${moment(course.course.datetimes[0].date).format(
                        'YYYY/MM/DD'
                      )}, ${moment(
                        course.course.datetimes[0].start_time,
                        'HH:mm:ss'
                      ).format('HH:mm')}~${moment(
                        course.course.datetimes[0].end_time,
                        'HH:mm:ss'
                      ).format('HH:mm')}`
                    : '未設定'}
                </div>
                <div className="flex flex-col md:flex-row py-1 md:py-0 border-b-1 md:border-0 border-tertiary-gray-200">
                  <div>開課單位：</div>
                  <div>{course.course.store.store_name}</div>
                </div>
                <div className="flex flex-col md:flex-row py-1 md:py-0">
                  <div>上課地點：</div>
                  <div>{course.course.store.store_address}</div>
                </div>
                {course.course.reviews.length === 0 ? (
                  <div
                    className="flex flex-row py-1 md:py-0 items-center text-primary-100 cursor-pointer"
                    onClick={() => handleReviewClick()}
                  >
                    未評價-進行評價
                    <BsChevronRight />
                  </div>
                ) : (
                  <Link
                    href={`/course/${course.course_id}`}
                    className="flex flex-row py-1 md:py-0 items-center text-tertiary-gray-100 cursor-pointer"
                  >
                    已評價-前往查看評價
                    <BsChevronRight />
                  </Link>
                )}
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </Card>
      {/* 評價 Modal */}
      <CourseReview
        courseDetails={reviewDetails}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        removeReviewedItem={removeReviewedItem}
      />
    </>
  )
}
