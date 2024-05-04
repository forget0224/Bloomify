import React, { createContext, useContext, useState } from 'react'

const CardContext = createContext()

export const useCard = () => useContext(CardContext)

export const CardProvider = ({ children }) => {
  const [previewStyle, setPreviewStyle] = useState(null)
  const [confirmedStyle, setConfirmedStyle] = useState(null)

  return (
    <CardContext.Provider
      value={{
        previewStyle,
        setPreviewStyle,
        confirmedStyle,
        setConfirmedStyle,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}
