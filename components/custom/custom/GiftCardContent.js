import { useState } from 'react'
import SwiperCarousel from './SwiperCarousel'
import ColorSelector from '../common/ColorSelector'

export default function GiftCardContent({ items }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const handleSelectItem = (attributes, categoryName) => {
    setSelectedItem({ attributes, categoryName })
  }

  return (
    <>
      {selectedItem ? (
        <ColorSelector
          itemAttribute={selectedItem.attributes}
          categoryName={selectedItem.categoryName}
          onConfirm={() => setSelectedItem(null)}
        />
      ) : (
        <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
          <div className="text-tertiary-gray-100 w-60 text-center py-4">
            <p className="text-xs">
              花束中的葉子或綠色植物部分，用來填補和增加整束花的層次感和豐富度。
            </p>
          </div>
          <SwiperCarousel items={items} onItemSelect={handleSelectItem} />
        </div>
      )}
    </>
  )
}
