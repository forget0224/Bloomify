import React, { useEffect, useState } from 'react'
import CoursePagination from './pagination'
import { Button } from '@nextui-org/react'
import { FaStar } from 'react-icons/fa'

export default function CourseComment({ reviews }) {
  const [selectedStar, setSelectedStar] = useState(null) // 儲存當前選中的星級篩選條件；null初始值，表示顯示全部評價
  const [filteredReviews, setFilteredReviews] = useState(reviews || []) // 用來儲存篩選後的評價；初始值為傳入的reviews

  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 3 // 每頁顯示的評價數量

  // 根據selectedStar的值來更新filteredReviews
  useEffect(() => {
    setFilteredReviews(
      selectedStar === null
        ? reviews
        : reviews.filter((review) => review.stars === selectedStar)
    )
    setCurrentPage(1) // 當篩選條件變化時重置到第一頁
  }, [selectedStar, reviews]) // 依賴 selectedStar 和 reviews

  // 綁定篩選按鈕。當用戶點擊某個星級按鈕時，filterReviewByStars函數被觸發
  const filterReviewsByStars = (stars) => {
    setSelectedStar(stars) // 更新SelectedStars的數值(null或是1~5)
  }

  // 計算不同星級的評價數量
  const starsCount = (star) => {
    return reviews.filter((review) => review.stars === star).length
  }

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage) // 計算總頁數

  // 處理頁碼變化的邏輯，當選擇新頁碼時，設定當前頁數
  const handlePageChange = (newPage) => {
    console.log('New page:', newPage) // 確認接收到的是頁碼數字
    if (typeof newPage === 'number') {
      setCurrentPage(newPage)
    } else {
      console.error('New page is not a number:', newPage)
    }
  }

  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  )

  // 處理日期格式
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('zh-TW', options)
  }

  return (
    <>
      {/* 印出篩選按鈕 */}
      <div className="flex flex-row gap-2 overflow-x-auto items-center py-2 md:py-0">
        <Button
          onClick={() => filterReviewsByStars(null)}
          color={selectedStar === null ? 'primary' : 'white'}
          variant={selectedStar === null ? 'solid' : 'bordered'}
        >
          全部({reviews.length})
        </Button>
        {[5, 4, 3, 2, 1].map((star) => (
          <Button
            key={star}
            onClick={() => filterReviewsByStars(star)}
            color={selectedStar === star ? 'primary' : 'white'}
            variant={selectedStar === star ? 'solid' : 'bordered'}
          >
            {star}星({starsCount(star)})
          </Button>
        ))}
      </div>

      {/* 印出評價與星星們 */}
      {/* 檢查有沒有資料，若沒有，印出目前沒有 x 星資料 */}
      {currentReviews.length > 0 ? (
        <>
          {currentReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-2 py-4 border-b-1 border-b-tertiary-gray-200"
            >
              <p>
                {review.member.name}
                <span className="ml-2 text-tertiary-gray-100">
                  {formatDate(review.created_at)}
                </span>
              </p>
              <div className="flex flex-row items-center text-secondary-100">
                {/* 印出星星的邏輯 */}
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < review.stars
                        ? 'text-secondary-100'
                        : 'text-secondary-200'
                    }
                  />
                ))}
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="text-left py-4">
            <p>目前没有{selectedStar || '任何'}星资料</p>
          </div>
        </>
      )}

      {/* 分頁 */}
      {filteredReviews.length > 0 && (
        <div className="mt-4">
          <CoursePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  )
}
