import { useState, useEffect } from 'react'
import { Select, SelectItem, Button } from '@nextui-org/react'
const data = [
  {
    id: 2,
    city: '台北市',
    district: '大安區',
    storeName: '哈哈哈',
    address: '台北市大安區忠孝東路一段123號',
  },
  {
    id: 1,
    city: '新北市',
    district: '板橋區',
    storeName: '店家B',
    address: '新北市板橋區文化路456巷78號',
  },
  {
    id: 3,
    city: '台中市',
    district: '西屯區',
    storeName: '花語藝',
    address: '台中市西屯區惠來路234號',
  },
  {
    id: 4,
    city: '高雄市',
    district: '前鎮區',
    storeName: '綻放花藝',
    address: '高雄市前鎮區中山東路56巷78號',
  },
  {
    id: 5,
    city: '桃園市',
    district: '中壢區',
    storeName: '翠綠花苑',
    address: '桃園市中壢區中正路890號',
  },
  {
    id: 6,
    city: '台南市',
    district: '東區',
    storeName: '花漾坊',
    address: '台南市東區崇善路12巷34號',
  },
  {
    id: 7,
    city: '桃園市',
    district: '桃園區',
    storeName: '花意濃',
    address: '桃園市桃園區光復路56號 ',
  },
  {
    id: 8,
    city: '彰化縣',
    district: '彰化市',
    storeName: '花卉匯',
    address: '彰化縣彰化市光復路56號',
  },
  {
    id: 9,
    city: '基隆市',
    district: '信義區',
    storeName: '花間藝術',
    address: '基隆市信義區中正路789號',
  },
  {
    id: 10,
    city: '新竹市',
    district: '東區',
    storeName: '花疫室',
    address: '新竹市東區光復路34巷56號',
  },
]

export default function StoreSelector({ onConfirm }) {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedStore, setSelectedStore] = useState({})

  const handleCityChange = (city) => {
    setSelectedCity(city)
    setSelectedDistrict('')
    setSelectedStore({})
  }

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district)
    setSelectedStore({})
  }

  const handleStoreChange = (storeId) => {
    const store = data.find((store) => store.id === parseInt(storeId))
    setSelectedStore(store || {})
  }

  const handleSubmit = () => {
    onConfirm(selectedStore)
  }

  return (
    <>
      <Select
        placeholder="選擇縣市"
        onChange={(e) => handleCityChange(e.target.value)}
        value={selectedCity}
        aria-label="選擇縣市"
      >
        {[...new Set(data.map((item) => item.city))].map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </Select>
      <Select
        placeholder="選擇區"
        onChange={(e) => handleDistrictChange(e.target.value)}
        value={selectedDistrict}
        aria-label="選擇區"
      >
        {[
          ...new Set(
            data
              .filter((item) => item.city === selectedCity)
              .map((item) => item.district)
          ),
        ].map((district) => (
          <SelectItem key={district} value={district}>
            {district}
          </SelectItem>
        ))}
      </Select>
      <Select
        placeholder="選擇店家"
        onChange={(e) => handleStoreChange(e.target.value)}
        value={selectedStore.storeName || ''}
        aria-label="選擇店家"
      >
        {data
          .filter(
            (store) =>
              store.city === selectedCity && store.district === selectedDistrict
          )
          .map((store) => (
            <SelectItem key={store.id} value={store.storeName}>
              {store.storeName}
            </SelectItem>
          ))}
      </Select>
      {selectedStore.address && (
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            selectedStore.address
          )}&output=embed`}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Store Location"
        ></iframe>
      )}

      <Button onClick={handleSubmit} aria-label="確認選取的店家">
        確認
      </Button>
    </>
  )
}
