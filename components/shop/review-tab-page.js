import React, { useState } from 'react'
import { Card, CardBody, Pagination } from '@nextui-org/react'
import moment from 'moment'

const limit = 3

const ReviewTabPage = ({ reviews, renderStars }) => {
  const [currentPage, setCurrentPage] = useState(1)
  // 計算評論總頁數
  const pageCount = Math.ceil(reviews.length / limit)
  // 計算當前頁面的評論
  const startIndex = (currentPage - 1) * limit // 是在計算評論的筆數。當currentPage是1，那麼(currentPage - 1)就會是0，筆數就會從數組的第0筆開始取
  const currentReviews = reviews.slice(startIndex, startIndex + limit) // 如果currentPage是1，且limit是3，那currentReviews會包含索引0、1、2的評論
  // 分頁變化處理的函數
  const handlePageChange = (newPage) => {
    console.log(newPage)
    // newPage是當前選中的頁碼
    setCurrentPage(newPage)
  }

  return (
    <>
      <Card>
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <CardBody key={index} className="space-y-2 p-6">
              <div className="flex space-x-2 items-center">
                <p className="text-xl">{review.member.name}</p>
                <p className="text-tertiary-gray-100">
                  {moment(review.created_at).format('YYYY-MM-DD HH:mm')}
                </p>
              </div>
              <div className="flex flex-row items-center text-secondary-100">
                {renderStars(review.star.numbers)}
              </div>
              <div>{review.comment}</div>
            </CardBody>
          ))
        ) : (
          <CardBody>
            <div>尚未有評價</div>
          </CardBody>
        )}
      </Card>
      <div className="mt-6 flex justify-center">
        <Pagination
          total={pageCount}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default ReviewTabPage
