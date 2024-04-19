import React, { createContext, useContext, useState } from 'react'

const FlowerContext = createContext()

export const useFlower = () => useContext(FlowerContext)

export const FlowerProvider = ({ children }) => {
  const [imageInfo, setImageInfo] = useState({ url: '', color: '', name: '' })

  return (
    <FlowerContext.Provider value={{ imageInfo, setImageInfo }}>
      {children}
    </FlowerContext.Provider>
  )
}
