import React, { useState, useEffect } from 'react'
import DraggableBar from './DraggableBar'
import ChangeComponent from './ChangeComponent'
import { useFlower } from '@/hooks/use-flower'
const PackageComponent = ({ onNext, onPrev, items }) => {
  const [selectedItem, setSelectedItem] = useState({})
  const { setPackageInfo } = useFlower()
  useEffect(() => {
    if (selectedItem && selectedItem.length > 0) {
      setPackageInfo({
        package_url: selectedItem[0].url,
        product_id: selectedItem[0].product_id,
        product_price: selectedItem[0].product_price,
        product_category: selectedItem[0].product_category,
        package_name: selectedItem[0].variant_name,
      })
    } else {
      setPackageInfo(null)
    }
  }, [selectedItem])

  const handleSelectItem = (attributes) => {
    setSelectedItem(attributes)
  }
  const defaultPackage = {
    category_name: '不加購包裝',
    category_url: '/custom/custom/noAdd.png',
  }

  items = [defaultPackage, ...items]

  return (
    <>
      <div className="h-full w-full text-tertiary-black flex flex-col justify-start items-center">
        <div className="text-center min-h-[95px] py-4">
          <h1 className="text-3xl py-2">包裝</h1>
          <p className="text-tertiary-gray-100 text-sm px-4 inline-block h-auto">
            如不加購則以店家基本包裝為主。
          </p>

          {selectedItem && selectedItem.length > 0 && (
            <p>已選擇 {selectedItem[0].variant_name}</p>
          )}
        </div>
        <div className="w-full h-full relative">
          <DraggableBar
            items={items}
            onItemSelect={handleSelectItem}
            itemHeight={35}
            dragBuffer={50}
            className="w-[150px] h-[580px] mx-auto pt-2"
          />{' '}
          <ChangeComponent onNext={onNext} onPrev={onPrev} />
        </div>
      </div>
    </>
  )
}

export default PackageComponent
