// RoleContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/api/share-roles')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data.roles)) {
          setRoles(data.data.roles)
        }
      })
      .catch((error) => console.error('Error fetching roles:', error))
  }, [])

  return <RoleContext.Provider value={roles}>{children}</RoleContext.Provider>
}

export const useRoles = () => useContext(RoleContext)
