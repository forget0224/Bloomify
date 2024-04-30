import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useLoader } from '@/hooks/use-loader'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { FaShareAlt } from 'react-icons/fa'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { useAuth } from '@/hooks/use-auth'
import { useCourseFavorites } from '@/hooks/use-course-fav'
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Loader from '@/components/common/loader'
import { MyButton } from '@/components/btn/mybutton'
import Subtitle from '@/components/common/subtitle'
import CardNews from '@/components/course/card-news'
import CardTime from '@/components/course/card-time'
import ShareModal from '@/components/common/modal-share'
import CourseMap from '@/components/course/card-map'
import ImageSlider from '@/components/course/image-slider'
import CourseComment from '@/components/course/div-comment'
import CardGroup from '@/components/course/card-group'
import AverageStars from '@/components/course/star-average'
import HeartButton from '@/components/course/btn-heart'
import { useCart } from '@/context/course-cart-context'

export default function CourseDetails() {
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth
  const { close, open, isLoading } = useLoader()
  const router = useRouter()

  const { cid } = router.query
  const [courseDetails, setCourseDetails] = useState([cid])
  const [randomCourses, setRandomCourses] = useState([])
  const [averageStars, setAverageStars] = useState([])

  const { addFavoritesStatusToCourses, addFavoriteStatusToCourseDetails } =
    useCourseFavorites()

  // 點擊加入購物車/直接購買，滑動到選擇日期區塊
  const dateRef = useRef(null)
  const scrollToDates = () => {
    if (dateRef.current) {
      dateRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // 詳細介紹 Modal 變數
  const { isOpen, onOpen, onClose } = useDisclosure()

  // 分享 Modal 變數
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onOpenChange: onShareOpenChange,
  } = useDisclosure()

  const scrollContainerRef = useRef(null)

  const scroll = (offset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += offset
    }
  }

  // 假設每張卡片的寬度加上間隔約是300px
  const scrollAmount = 850 // 3張卡片的總寬度

  // FETCH 資料
  useEffect(() => {
    open() // 在 API 請求開始前，開啟 loader

    async function fetchCourseDetails() {
      if (cid) {
        // 確定有cid的存在
        try {
          const response = await fetch(
            `http://localhost:3005/api/courses/${cid}`
          )
          const data = await response.json()
          if (data.status === 'success') {
            // TODO:
            // 處理愛心icon

            // 處理全部課程數據
            setCourseDetails(data.data.course)

            // 計算並更新全部星級
            const reviews = data.data.course.reviews
            if (reviews && reviews.length > 0) {
              const totalStars = reviews.reduce(
                (acc, review) => acc + review.stars,
                0
              )
              const avgStars = (totalStars / reviews.length).toFixed(1)
              setAverageStars(parseFloat(avgStars)) // 更新平均星級狀態
              console.log(parseFloat(avgStars))
            } else {
              setAverageStars('目前沒有評價')
            }
          }
          close(1.5) // 設置一個延時來關閉 loader
        } catch (error) {
          console.error('Error fetching course details:', error)
        }
      }
    }

    async function fetchRandomCourses() {
      try {
        const response = await fetch('http://localhost:3005/api/courses/random')
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data.courses)) {
          // TODO:
          // 使用 addFavoritesStatusToCourses 來整合收藏狀態
          const updatedCourses = addFavoritesStatusToCourses(data.data.courses)
          // 處理隨機課程數據
          setRandomCourses(processCourses(updatedCourses))
        }
      } catch (error) {
        console.error('Error fetching random courses:', error)
      }
    }

    fetchCourseDetails()
    fetchRandomCourses()
  }, [cid])

  // 處理課程函數
  function processCourses(coursesArray) {
    return coursesArray.map((course) => {
      const mainImage =
        (course.images && course.images.find((image) => image.is_main)) ||
        (course.images && course.images[0])
      return {
        ...course,
        mainImage: mainImage
          ? mainImage.path
          : '/assets/course/img-deafult.jpg',
      }
    })
  }

  // 頁面內容
  const display = (
    <DefaultLayout
      // activePage={activePage}
      className="justify-center flex flex-col items-center relative"
    >
      <CenterLayout>
        {/* 麵包屑 */}
        <div className="w-full py-6 hidden md:block">
          <Breadcrumbs>
            <BreadcrumbItem href="/">首頁</BreadcrumbItem>
            <BreadcrumbItem href="/course/">合作課程</BreadcrumbItem>
            {courseDetails.category && (
              <BreadcrumbItem
                href={`/course/search?category_id=${courseDetails.category.id}`}
              >
                {courseDetails.category.name}
              </BreadcrumbItem>
            )}
            <BreadcrumbItem color="primary">
              {courseDetails.name}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        {/* 課程圖和課程資訊 */}
        <div className="flex flex-col gap-14 lg:flex-row mb-12 w-full">
          {/* 課程圖 */}
          <div className="w-full flex justify-center items-center lg:w-6/12 mb-6 md:mb-0">
            <ImageSlider images={courseDetails.images} />
          </div>
          {/* 課程資訊 */}
          <div className="w-full lg:w-6/12 flex flex-col gap-6">
            {/* 主要資訊 */}
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <p className="text-3xl font-medium">{courseDetails.name}</p>
                <div className="flex justify-between mt-2">
                  <div className="flex flex-row gap-2">
                    <AverageStars averageStars={averageStars} />
                    <span className="text-base">
                      {averageStars || 'Loading...'}
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <HeartButton
                      opacity="text-opacity-0"
                      isActive={false}
                      onToggle={() => console.log('toggle clicked')}
                    />
                    <button
                      onClick={onShareOpen}
                      className="flex flex-row items-center h-6 w-6 justify-center text-secondary-100 hover:text-[#FFAC9A]"
                    >
                      <FaShareAlt className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="line-clamp-4">{courseDetails.intro}</div>
                <p
                  className="text-tertiary-gray-100 no-underline hover:underline flex items-center mt-1 cursor-pointer"
                  onClick={onOpen}
                >
                  查看詳細
                  <BsChevronRight />
                </p>
              </div>
              <div className="flex flex-row gap-2">
                {Array.isArray(courseDetails.tags) &&
                  courseDetails.tags.map((tag) => (
                    <div key={tag.id} className="bg-primary-300 px-2">
                      {tag.name}
                    </div>
                  ))}
              </div>
            </div>
            {/* 購買卡片 */}
            <Card className="p-4">
              <CardBody className="flex flex-col gap-2">
                <p>
                  課程時長
                  <span className="ml-2">{`3`}小時</span>
                </p>
                <p>
                  課程人數
                  <span className="ml-2">
                    {courseDetails.min_capacity}~{courseDetails.max_capacity}人
                  </span>
                </p>
                <p>
                  課程定價
                  <span className="text-2xl ml-2">
                    NT${courseDetails.price}
                  </span>
                </p>
              </CardBody>
              <CardFooter className="flex gap-4">
                <MyButton
                  color="primary"
                  size="xl"
                  isOutline
                  className="w-full"
                  onClick={scrollToDates}
                >
                  加入購物車
                </MyButton>
                <MyButton
                  color="primary"
                  size="xl"
                  className="w-full"
                  onClick={scrollToDates}
                >
                  立即預約
                </MyButton>
              </CardFooter>
            </Card>
          </div>
        </div>
        {/* main 所有資訊 */}
        <div className="flex flex-col lg:flex-row w-full gap-16 relative">
          {/* 開課商家資訊 */}
          <div className="w-full lg:w-5/12 order-0 lg:order-1 h-fit">
            <CourseMap store={courseDetails.store} />
          </div>
          {/* 其他詳細資訊 */}
          <div className="flex w-full lg:w-7/12 flex-col gap-16">
            {/* 最新訊息 */}
            {courseDetails.news && courseDetails.news.length > 0 && (
              <div className="flex flex-col gap-6">
                <Subtitle text="課程最新訊息" />
                <CardNews news={courseDetails.news} />
              </div>
            )}
            {/* 上課日期 */}
            <div ref={dateRef} className="flex flex-col gap-6">
              <Subtitle text="上課日期" />
              <div className="flex flex-col gap-4">
                <CardTime
                  courseDetails={courseDetails}
                  datetimes={courseDetails.datetimes}
                />
              </div>
            </div>
            {/* 課程評價 */}
            <div className="flex flex-col gap-2 md:gap-6">
              <Subtitle text="課程評價" />
              {/* 總評分 */}
              <div className="flex flex-row gap-2">
                <span className="text-2xl">
                  {averageStars || 'Loading...'}/5
                </span>
                <AverageStars averageStars={averageStars} />
              </div>
              <div>
                <CourseComment reviews={courseDetails.reviews} />
              </div>
            </div>
            {/* 推薦課程 */}
            <div className="flex flex-col gap-5 mb-[80px]">
              <Subtitle text="推薦課程" />
              <div className="flex flex-col relative">
                <div className="cardgroup-wrapper" ref={scrollContainerRef}>
                  <CardGroup courses={randomCourses} />
                </div>
                <MyButton
                  onClick={() => scroll(-scrollAmount)}
                  color="white"
                  className="shadow-md rounded-full absolute z-20 left-0 -translate-x-1/2 transform top-1/2 -translate-y-1/2"
                  isIconOnly
                >
                  <BsChevronLeft className="w-4 h-4" />
                </MyButton>
                <MyButton
                  onClick={() => scroll(scrollAmount)}
                  color="white"
                  className="shadow-md rounded-full absolute z-20 right-0 translate-x-1/2 transform top-1/2 -translate-y-1/2"
                  isIconOnly
                >
                  <BsChevronRight className="w-4 h-4" />
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </CenterLayout>
      {/* 詳細介紹 Modal */}
      <Modal
        size="4xl"
        placement={'center'}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: '',
          backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
          closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
        }}
      >
        <ModalContent className="pb-8">
          <ModalHeader className="px-8 pt-8 text-2xl">詳細介紹</ModalHeader>
          <ModalBody className="px-8 py-0">
            {/* Modal 的內容 */}
            <p>{courseDetails.intro}</p>
            {/* 更多內容 */}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* 分享 Modal */}
      <ShareModal
        // onOpen={onShareOpen}
        isShareOpen={isShareOpen}
        onShareOpenChange={onShareOpenChange}
      />
    </DefaultLayout>
  )

  // 使用 isLoading 狀態決定是顯示 loader 還是顯示頁面內容
  return isLoading ? <Loader /> : display
}
