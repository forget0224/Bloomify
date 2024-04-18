// OccContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const OccContext = createContext()

export const OccProvider = ({ children }) => {
  const [occs, setOccs] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/api/share-occs')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data.occs)) {
          setOccs(data.data.occs)
        }
      })
      .catch((error) => console.error('Error fetching occasions:', error))
  }, [])

  return <OccContext.Provider value={occs}>{children}</OccContext.Provider>
}

export const useOccs = () => useContext(OccContext)
