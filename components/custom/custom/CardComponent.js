import React, { useState } from 'react'
import CardStyleSelector from './CardStyleSelector'
import DraggableBar from './DraggableBar'
import ChangeComponent from './ChangeComponent'
import { useCard } from '@/hooks/use-card'
const CardComponent = ({ onNext, onPrev, items }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleSelectItem = (attributes, categoryName) => {
    if (attributes && attributes.length > 0) {
      setSelectedItem({ attributes, categoryName })
    }
  }

  const defaultCard = {
    category_name: '不加購卡片',
    category_url: '/custom/custom/noAdd.png',
  }

  items = [defaultCard, ...items]

  return (
    <>
      {selectedItem ? (
        <CardStyleSelector
          itemAttribute={selectedItem.attributes}
          categoryName={selectedItem.categoryName}
          onConfirm={() => {
            setSelectedItem(null)
          }}
        />
      ) : (
        <div className="h-full w-full text-tertiary-black flex flex-col justify-start items-center">
          <div className="text-center min-h-[95px]">
            <h1 className="text-3xl py-2">卡片</h1>
            <p className="text-tertiary-gray-100 text-sm px-4 inline-block h-auto">
              請選擇您喜歡的卡片樣式
            </p>
          </div>
          <DraggableBar
            items={items}
            onItemSelect={handleSelectItem}
            itemHeight={35}
            dragBuffer={50}
            className="w-[150px] h-[580px] mx-auto pt-2"
          />
          <ChangeComponent onNext={onNext} onPrev={onPrev} />
        </div>
      )}
    </>
  )
}

export default CardComponent
