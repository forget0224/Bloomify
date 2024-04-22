import React, { useState, useEffect } from 'react'
import { Image } from '@nextui-org/react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'

export default function CourseImageSlider({ images }) {
  useEffect(() => {
    console.log(images)
  }, [images])

  // 假定 images 陣列已經有值，並且已經包含了 is_main 屬性。
  // 這裡我們尋找標記為主圖片的項目，或者預設為陣列中的第一個項目。
  const [selectedImage, setSelectedImage] = useState(
    images && Array.isArray(images)
      ? images.find((img) => img.is_main) || images[0]
      : null
  )

  // 點擊縮圖時調用的函數
  const handleMainClick = (image) => {
    setSelectedImage(image)
  }

  // 查找當前選中圖片的index
  const selectedImageIndex = images.findIndex(
    (img) => img.id === selectedImage.id
  )

  // 點擊切換下一張圖的函數
  const nextImage = () => {
    const nextIndex =
      selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0
    setSelectedImage(images[nextIndex])
  }

  // 點擊切換上一張圖的函數
  const prevImage = () => {
    const prevIndex =
      selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1
    setSelectedImage(images[prevIndex])
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="order-1 md:order-2 relative">
        <Image
          isZoomed
          width={600}
          height={400}
          alt="課程首頁banner圖"
          src={selectedImage.path}
          className="rounded-2xl w-full"
        />
        <button
          className="z-20 bg-white bg-opacity-50 hover:bg-opacity-90 text-tertiary-gray-100 hover:text-tertiary-black absolute top-1/2 transform -translate-y-1/2 left-0 w-6 h-14 flex items-center justify-center rounded-r-lg"
          onClick={prevImage}
        >
          <BsChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="z-20 bg-white bg-opacity-50 hover:bg-opacity-90 text-tertiary-gray-100 hover:text-tertiary-black absolute top-1/2 transform -translate-y-1/2 right-0 w-6 h-14 flex items-center justify-center rounded-l-lg"
          onClick={nextImage}
        >
          <BsChevronRight className="w-4 h-4 text-tertiary-black" />
        </button>
      </div>
      <div className="flex md:flex-col justify-center gap-2 order-2 md:order-1">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleMainClick(image)}
            className={`cursor-pointer rounded-2xl lg:rounded-2xl overflow-hidden box-border ${
              image.id === selectedImage.id
                ? 'border-1 border-tertiary-gray-100'
                : ''
            }`}
          >
            <Image
              isZoomed
              width={120}
              height={80}
              alt="課程首頁banner圖"
              src={image.path}
              className="rounded-lg lg:rounded-2xl cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
