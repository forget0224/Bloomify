import React, { useState } from 'react'
import CardStyleSelector from './CardStyleSelector'
import DraggableBar from './DraggableBar'
import ChangeComponent from './ChangeComponent'

const CardComponent = ({ onNext, onPrev, items }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleSelectItem = (attributes, category_name) => {
    if (attributes && attributes.length > 0) {
      setSelectedItem({ attributes, category_name })
    }
  }

  const defaultCard = {
    category_name: '不加購卡片',
    category_url: '/custom/custom/noAdd.png',
  }

  items = [defaultCard, ...items]
  console.log(items)

  return (
    <>
      {selectedItem ? (
        <CardStyleSelector
          itemAttribute={selectedItem.attributes}
          categoryName={selectedItem.category_name}
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
          <div className="w-full h-full relative">
            <DraggableBar
              items={items}
              onItemSelect={handleSelectItem}
              itemHeight={25}
              dragBuffer={50}
              className="w-[150px] min-h-[580px] h-[770px] mx-auto pt-2"
            />
            <ChangeComponent onNext={onNext} onPrev={onPrev} />
          </div>
        </div>
      )}
    </>
  )
}

export default CardComponent
