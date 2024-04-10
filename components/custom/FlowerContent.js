import { useState } from 'react'
import SwiperCarousel from './SwiperCarousel'
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react'
import ColorSelector from './ColorSelector'
const productList2022 = [
  {
    id: 202201,
    src: '/custom/custom/flowers/03063469700328e035c37f615e1f3d7d.jpg',
    name: '玫瑰花束',
    store: '店家名稱',
    price: '780',
    discount: '',
    colors: [
      'red',
      'yellow',
      'blue',
      'orange',
      'green',
      'purple',
      'brown',
      'pink',
      'black',
      'white',
      'gary',
      'other',
    ],
  },

  {
    id: 202202,
    src: '/custom/custom/flowers/0c19e718edd2ba4ed62b185ba0d958c8.jpg',
    name: '百合花束',
    store: '店家名稱',
    price: '1320',
    discount: '150',
    colors: ['pink', 'black', 'red'],
  },
  {
    id: 202203,
    src: '/custom/custom/flowers/5925d3602969b5e1a4e547075168af80.jpg',
    name: '鬱金香花束',
    store: '店家名稱',
    price: '700',
    discount: '100',
    colors: ['pink', 'yellow'],
  },
  {
    id: 202204,
    src: '/custom/custom/flowers/a04a3b0f8d30f22ca8302eecfcfb9a28.jpg',
    name: '薰衣草花束',
    store: '店家名稱',
    price: '200',
    discount: '',
    colors: ['pink', 'black', 'red', 'purple', 'white'],
  },
  {
    id: 202205,
    src: '/custom/custom/flowers/cfbf57db29b572fec135cf7f75532d88.jpg',
    name: '小雛菊花束',
    store: '店家名稱',
    price: '350',
    discount: '',
    colors: ['pink', 'yellow', 'red', 'purple', 'white', 'green'],
  },
  {
    id: 202206,
    src: '/custom/custom/flowers/03063469700328e035c37f615e1f3d7d.jpg',
    name: '玫瑰花束',
    store: '店家名稱',
    price: '780',
    discount: '',
    colors: [
      'red',
      'yellow',
      'blue',
      'orange',
      'green',
      'purple',
      'brown',
      'pink',
      'black',
      'white',
      'gary',
      'other',
    ],
  },

  {
    id: 202207,
    src: '/custom/custom/flowers/0c19e718edd2ba4ed62b185ba0d958c8.jpg',
    name: '百合花束',
    store: '店家名稱',
    price: '1320',
    discount: '150',
    colors: ['pink', 'black', 'red'],
  },
  {
    id: 202208,
    src: '/custom/custom/flowers/5925d3602969b5e1a4e547075168af80.jpg',
    name: '鬱金香花束',
    store: '店家名稱',
    price: '700',
    discount: '100',
    colors: ['pink', 'yellow'],
  },
]
const productList01 = [
  {
    id: 3,
    src: '/custom/custom/flowers/5925d3602969b5e1a4e547075168af80.jpg',
    name: '鬱金香花束',
    store: '店家名稱',
    price: '700',
    discount: '100',
    colors: ['pink', 'yellow'],
  },
  {
    id: 4,
    src: '/custom/custom/flowers/a04a3b0f8d30f22ca8302eecfcfb9a28.jpg',
    name: '薰衣草花束',
    store: '店家名稱',
    price: '200',
    discount: '',
    colors: ['pink', 'black', 'red', 'purple', 'white'],
  },
  {
    id: 5,
    src: '/custom/custom/flowers/cfbf57db29b572fec135cf7f75532d88.jpg',
    name: '小雛菊花束',
    store: '店家名稱',
    price: '350',
    discount: '',
    colors: ['pink', 'yellow', 'red', 'purple', 'white', 'green'],
  },
  {
    id: 6,
    src: '/custom/custom/flowers/03063469700328e035c37f615e1f3d7d.jpg',
    name: '玫瑰花束',
    store: '店家名稱',
    price: '780',
    discount: '',
    colors: [
      'red',
      'yellow',
      'blue',
      'orange',
      'green',
      'purple',
      'brown',
      'pink',
      'black',
      'white',
      'gary',
      'other',
    ],
  },

  {
    id: 7,
    src: '/custom/custom/flowers/0c19e718edd2ba4ed62b185ba0d958c8.jpg',
    name: '百合花束',
    store: '店家名稱',
    price: '1320',
    discount: '150',
    colors: ['pink', 'black', 'red'],
  },
  {
    id: 8,
    src: '/custom/custom/flowers/5925d3602969b5e1a4e547075168af80.jpg',
    name: '鬱金香花束',
    store: '店家名稱',
    price: '700',
    discount: '100',
    colors: ['pink', 'yellow'],
  },
]
export default function FlowerContent() {
  const [selected, setSelected] = useState('photos')
  const [selectedFlower, setSelectedFlower] = useState(null)
  const handleSelectColor = (color) => {
    console.log(`選擇的顏色是: ${color}`)
    setSelectedFlower(null) // 返回到花朵選擇
  }
  return (
    // <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
    //   <div className="text-tertiary-gray-100 w-60 text-center py-4">
    //     <p className="text-xs">
    //       花束中的主要花材，通常是最大、最鮮豔的花朵，用來突顯整束花的主題和風格。
    //     </p>
    //   </div>
    //   <SwiperCarousel />
    // </div>
    <>
      {selectedFlower ? (
        <ColorSelector
          itemName={selectedFlower.name}
          itemColors={selectedFlower.colors}
          onConfirm={handleSelectColor}
        />
      ) : (
        <div className="flex w-full flex-col items-center py-2">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="mainFlower" title="主花" className="justify-center">
              <Card>
                <CardBody>
                  <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
                    <div className="text-tertiary-gray-100 w-60 text-center py-4">
                      <p className="text-xs">
                        花束中的主要花材，通常是最大、最鮮豔的花朵，用來突顯整束花的主題和風格。
                      </p>
                    </div>
                    <SwiperCarousel
                      productList={productList2022}
                      setSelectedFlower={setSelectedFlower}
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="accentFlower" title="配花">
              <Card>
                <CardBody>
                  <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
                    <div className="text-tertiary-gray-100 w-60 text-center py-4">
                      <p className="text-xs">
                        花束中用來點綴和裝飾的次要花材，通常是形狀或顏色上與主花相配的花朵。
                      </p>
                    </div>
                    <SwiperCarousel
                      productList={productList01}
                      setSelectedFlower={setSelectedFlower}
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
