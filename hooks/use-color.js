// ColorContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const ColorContext = createContext()

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/api/share-colors')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data.colors)) {
          setColors(data.data.colors)
        }
      })
      .catch((error) => console.error('Error fetching colors:', error))
  }, [])

  return (
    <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
  )
}

export const useColors = () => useContext(ColorContext)
