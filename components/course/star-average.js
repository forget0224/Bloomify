import { FaStar, FaStarHalf } from 'react-icons/fa'

export default function AverageStars({ averageStars }) {
  if (averageStars === null) {
    return <p>目前沒有評價</p>
  }

  const fullStars = Math.floor(averageStars)
  const halfStar = averageStars % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  return (
    <div className="flex flex-row items-center">
      {/* 整顆星星 */}
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={index} className="text-secondary-100 w-5 h-5" />
      ))}
      {/* 一半的星星 */}
      {halfStar > 0 && (
        <div className="star-wrapper relative">
          {/* 半顆 */}
          <FaStarHalf className="text-secondary-100 absolute w-5 h-5" />
          <div className="half-star-overlay">
            <FaStar className="text-secondary-200 w-5 h-5" />
          </div>
        </div>
      )}
      {/* 空星星 */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaStar key={`empty-${index}`} className="text-secondary-200 w-5 h-5" />
      ))}
    </div>
  )
}
