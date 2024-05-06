import { useState, useEffect } from 'react'
import SwiperCarousel from './SwiperCarousel'
import { useFlower } from '@/hooks/use-flower'
export default function PackageContent({ items }) {
  const [selectedItem, setSelectedItem] = useState(null)
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
      <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center py-2">
        <div className="text-tertiary-gray-100 w-60 text-center py-4 h-[52px]">
          <p className="text-xs">如不加購則以店家基本包裝為主。</p>
          {selectedItem && selectedItem.length > 0 && (
            <p className="text-sm text-tertiary-black">
              已選擇 {selectedItem[0].variant_name}
            </p>
          )}
        </div>
        <SwiperCarousel items={items} onItemSelect={handleSelectItem} />
      </div>
    </>
  )
}
