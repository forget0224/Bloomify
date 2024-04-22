// src/contexts/StoreContext.js
import { createContext, useContext, useState, useEffect } from 'react'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [storeData, setStoreData] = useState([])
  useEffect(() => {
    fetch('http://localhost:3005/api/share-stores')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data.stores)) {
          setStoreData(data.data.stores)
        }
      })
      .catch((error) => console.error('Error fetching occasions:', error))
  }, [])
  return (
    <StoreContext.Provider value={storeData}>{children}</StoreContext.Provider>
  )
}
export const useStore = () => useContext(StoreContext)
