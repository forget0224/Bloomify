import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'

export default function HeartButton({ isActive, onToggle }) {
  return (
    <button onClick={onToggle}>
      {isActive ? (
        <FaHeart className="text-secondary-100 absolute top-4 right-4 z-10 w-6 h-6 cursor-pointer" />
      ) : (
        <FaRegHeart className="text-secondary-100 absolute top-4 right-4 z-10 w-6 h-6 cursor-pointer" />
      )}
    </button>
  )
}
