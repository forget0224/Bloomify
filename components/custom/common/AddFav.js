import React, { useEffect, useState } from 'react'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { toast } from 'react-hot-toast'
import { useFlowerFavorites } from '@/hooks/use-flowerFav'

export default function AddFav({ templateId, onClick }) {
  const { isFlowerFavorited, setFlowerFavorites, flowerFavorites } =
    useFlowerFavorites()
  const [active, setActive] = useState(isFlowerFavorited(templateId))

  useEffect(() => {
    setActive(isFlowerFavorited(templateId))
  }, [templateId, flowerFavorites])

  const toggleFavorite = async (event) => {
    event.stopPropagation() // 阻止事件冒泡到父元素

    const method = active ? 'DELETE' : 'POST'
    const endpoint = `http://localhost:3005/api/custom/${
      method === 'POST' ? 'add-favorite' : 'remove-favorite'
    }/${templateId}`

    try {
      const response = await fetch(endpoint, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method,
      })

      const data = await response.json()
      if (response.ok) {
        setActive(!active)
        if (method === 'DELETE') {
          setFlowerFavorites((current) =>
            current.filter((fav) => fav.template_id !== templateId)
          )
          toast.success('已從收藏移除！')
        } else {
          setFlowerFavorites((current) => [
            ...current,
            { ...data.data, template_id: templateId },
          ])
          toast.success('已加入到收藏！')
        }
      } else {
        throw new Error(data.message || 'Failed to update favorite status')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error('更新收藏狀態失敗')
    }
  }

  return (
    <button
      onClick={(e) => {
        toggleFavorite(e)
        onClick && onClick(e)
      }}
    >
      {active ? (
        <IoIosHeart className="text-danger relative z-10 w-5 h-5 cursor-pointer" />
      ) : (
        <div className="relative">
          <IoIosHeartEmpty className="text-danger relative z-10 w-5 h-5 cursor-pointer hover:text-red-400" />
        </div>
      )}
    </button>
  )
}
