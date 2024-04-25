import { createContext, useContext, useEffect, useState } from 'react'

const FlowerTypeContext = createContext()

export const FlowerTypeProvider = ({ children }) => {
  const [flowerType, setFlowerType] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/api/custom/flower-type')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data.flowertype)) {
          setFlowerType(data.data.flowertype)
        }
      })
      .catch((error) => console.error('Error fetching flowertype:', error))
  }, [])

  return (
    <FlowerTypeContext.Provider value={flowerType}>
      {children}
    </FlowerTypeContext.Provider>
  )
}

export const useFlowerTypes = () => useContext(FlowerTypeContext)
