import React, { useState } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { BsStar } from 'react-icons/bs'
import { MyButton } from '@/components/btn/mybutton'
import { toast } from 'react-hot-toast'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from '@nextui-org/react'

export default function CourseReview({
  courseDetails,
  isOpen,
  onOpenChange,
  removeReviewedItem,
  onClose,
}) {
  // const { onOpen, onClose } = useDisclosure()

  const [comment, setComment] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [stars, setStars] = useState(0)

  const [starsError, setStarsError] = useState('')
  const [commentError, setCommentError] = useState('')

  const [hoveredStar, setHoveredStar] = useState(0)
  const handleMouseOver = (index) => {
    setHoveredStar(index + 1)
  }
  const handleMouseLeave = () => {
    setHoveredStar(0)
  }

  const handleClick = (index) => {
    setStars(index + 1)
  }

  const handleTextChange = (e) => {
    const text = e.target.value
    setComment(text)
    setCharCount(text.length)
  }

  const submitReview = async () => {
    setStarsError('')
    setCommentError('')

    let valid = true
    if (stars === 0) {
      setStarsError('請點選星級')
      valid = false // 標記為無效
    }
    if (comment.trim() === '') {
      setCommentError('請填寫評論')
      valid = false // 標記為無效
    }
    if (!valid) {
      return // 不提交
    }

    const requestBody = {
      courseId: courseDetails.id, // Make sure you have course ID
      stars: stars, // Rating stars
      comment: comment, // User comment
    }

    try {
      const response = await fetch(
        `http://localhost:3005/api/course-reviews/add/${courseDetails.id}`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(requestBody),
        }
      )
      const data = await response.json()
      if (response.ok) {
        console.log('Review submitted successfully:', data)
        onClose() // 關閉 Modal
        removeReviewedItem(courseDetails.id)
        // 顯示成功提示
        toast.success(`成功新增此${courseDetails.id}課程的評價`)
        setTimeout(() => {
          location.reload() // 頁面刷新
        }, 1000)
      } else {
        console.error('Failed to submit review:', data.message)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      // 顯示錯誤提示
      toast.error(error.message || `無法新增此課程的評價`)
    }
  }

  return (
    <>
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={() => onOpenChange(false)}
        // onOpenChange={onOpenChange}
        classNames={{
          base: '',
          backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
          closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
        }}
      >
        <ModalContent className="pb-8">
          {(onClose) => (
            <>
              <ModalHeader className="px-8 pt-8 text-2xl">商品評價</ModalHeader>
              <ModalBody className="px-8 py-0">
                <p>課程名稱：{courseDetails.name}</p>
                {/* <p>訂單編號：C2024010901234567</p> */}
                <div className="">
                  <p>評分：</p>
                  <div className="flex items-center space-x-1.5">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`focus:outline-none cursor-pointer ${
                          stars > index || hoveredStar > index
                            ? 'is-selected'
                            : ''
                        }`}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                      >
                        {stars > index || hoveredStar > index ? (
                          <BsFillStarFill className="text-secondary-100" />
                        ) : (
                          <BsFillStarFill className="text-secondary-200" />
                        )}
                      </div>
                    ))}
                    <input
                      type="hidden"
                      id="user-selected-star"
                      value={stars}
                    />
                    <p>{stars === 0 ? '未評分' : `已評 ${stars} 顆星`}</p>
                  </div>
                  {starsError && (
                    <div className="text-danger text-sm">{starsError}</div>
                  )}
                </div>
                <div>
                  <p>評論：</p>
                  <Textarea
                    placeholder="請輸入您的評論"
                    classNames={{
                      base: 'mt-2 mb-1 text-tertiary-black',
                      input: 'text-base',
                    }}
                    onChange={handleTextChange}
                    value={comment}
                    maxLength={500}
                  ></Textarea>
                  <div className="text-end text-sm flex flex-row justify-between">
                    {commentError && (
                      <div className="text-danger text-sm">{commentError}</div>
                    )}
                    <div className="flex-1 text-right">{`${charCount}/500`}</div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="pb-0 px-8">
                <MyButton
                  // onPress={onClose}
                  onPress={submitReview}
                  color="primary"
                  size="xl"
                  className="flex-grow"
                >
                  提交評價
                </MyButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
