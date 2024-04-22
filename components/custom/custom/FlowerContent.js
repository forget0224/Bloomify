import { useState } from 'react'
import SwiperCarousel from './SwiperCarousel'
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react'
import ColorSelector from '../common/ColorSelector'

export default function FlowerContent({ mainItems, accentItems }) {
  const [selected, setSelected] = useState('mainFlower')
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
        <div className="flex flex-col items-center py-2 ">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="mainFlower" title="主花" className="justify-center">
              <Card>
                <CardBody>
                  <div className="text-tertiary-black w-screen  h-full flex flex-col  items-center">
                    <div className="text-tertiary-gray-100 w-60 text-center py-4">
                      <p className="text-xs">
                        花束中的主要花材，通常是最大、最鮮豔的花朵，用來突顯整束花的主題和風格。
                      </p>
                    </div>
                    <SwiperCarousel
                      items={mainItems}
                      onItemSelect={handleSelectItem}
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="accentFlower" title="配花">
              <Card>
                <CardBody>
                  <div className="text-tertiary-black w-screen  h-full flex flex-col justify-center items-center">
                    <div className="text-tertiary-gray-100 w-60 text-center py-4">
                      <p className="text-xs">
                        花束中用來點綴和裝飾的次要花材，通常是形狀或顏色上與主花相配的花朵。
                      </p>
                    </div>
                    <SwiperCarousel
                      items={accentItems}
                      onItemSelect={handleSelectItem}
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  )
}
