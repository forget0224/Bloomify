import { useState, useEffect } from 'react'
import { Select, SelectItem, Button } from '@nextui-org/react'
import { useStore } from '@/hooks/use-store'

export default function StoreSelector({ onConfirm }) {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedStore, setSelectedStore] = useState({})
  const storeData = useStore()
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
    const store = storeData.find(
      (store) => store.store_id === parseInt(storeId)
    )
    setSelectedStore(store || {})
  }

  const handleSubmit = () => {
    console.log(selectedStore)
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
        {[...new Set(storeData.map((item) => item.city))].map((city) => (
          <SelectItem key={city} value={city} textValue={city}>
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
            storeData
              .filter((item) => item.city === selectedCity)
              .map((item) => item.district)
          ),
        ].map((district) => (
          <SelectItem key={district} value={district} textValue={district}>
            {district}
          </SelectItem>
        ))}
      </Select>
      <Select
        placeholder="選擇店家"
        onChange={(e) => handleStoreChange(e.target.value)}
        value={selectedStore.store_name || ''}
        aria-label="選擇店家"
      >
        {storeData
          .filter(
            (store) =>
              store.city === selectedCity && store.district === selectedDistrict
          )
          .map((store) => (
            <SelectItem
              key={store.store_id}
              value={store.store_name}
              textValue={store.store_name}
            >
              {store.store_name}
            </SelectItem>
          ))}
      </Select>
      {selectedStore.store_address && (
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            selectedStore.store_address
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
