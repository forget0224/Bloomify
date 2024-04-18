import React, { useState } from 'react'
import ColorSelector from '../common/ColorSelector'
import DraggableBar from './DraggableBar'
import ChangeComponent from './ChangeComponent'
const AccentFlowerComponent = ({ onNext, onPrev, items }) => {
  const [selectedFlower, setSelectedFlower] = useState(null)

  const handleSelectColor = (color) => {
    setSelectedFlower(null)
  }

  return (
    <>
      {selectedFlower ? (
        <ColorSelector
          itemName={selectedFlower.name}
          itemColors={selectedFlower.colors}
          onConfirm={handleSelectColor}
        />
      ) : (
        <div className="h-full w-full text-tertiary-black flex flex-col justify-start items-center ">
          <div className="text-center min-h-[95px]">
            <h1 className="text-3xl py-2">配花</h1>
            <p className="text-tertiary-gray-100 text-sm px-4 inline-block h-auto">
              花束中用來點綴和裝飾的次要花材，通常是形狀或顏色上與主花相配的花朵。
            </p>
          </div>
          <div className="w-full h-full relative">
            <DraggableBar
              items={items}
              onItemSelect={setSelectedFlower}
              itemHeight={35}
              dragBuffer={50}
              className="w-[150px] h-[580px] mx-auto pt-2"
            />
            <ChangeComponent onNext={onNext} onPrev={onPrev} />
          </div>
        </div>
      )}
    </>
  )
}

export default AccentFlowerComponent
