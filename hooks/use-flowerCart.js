import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FlowerCartContext = createContext()

// 初始購物車狀態
const initialState = {
  bouquet_name: '',
  image_url: '',
  store_id: '',
  store_name: '',
  store_address: '',
  products: [],
  card: {
    product_id: '',
    content: '',
    card_url: '',
  },
  package: {
    product_id: '',
    package_name: '',
    package_url: '',
  },
}

// reducer 函數來處理狀態更新
function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_BOUQUET_INFO':
      return {
        ...state,
        bouquet_name: action.payload.template_name || '客製化花束',
        image_url: action.payload.image_url,
        store_id: action.payload.store_id,
        store_name: action.payload.store_name,
        store_address: action.payload.store_address,
      }
    case 'ADD_PRODUCTS':
      return {
        ...state,
        products: [...state.products, ...action.payload],
      }
    case 'SET_CARD':
      return {
        ...state,
        card: { ...action.payload },
      }
    case 'SET_PACKAGE':
      return {
        ...state,
        package: { ...action.payload },
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const FlowerCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('flowerCartState')
      return savedData ? JSON.parse(savedData) : initialState
    }
    return initialState
  })

  // 监听 state 变化并更新 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('flowerCartState', JSON.stringify(state))
    }
  }, [state])

  // useEffect(() => {
  //   localStorage.setItem('flowerCartState', JSON.stringify(state))
  // }, [state])

  return (
    <FlowerCartContext.Provider value={{ state, dispatch }}>
      {children}
    </FlowerCartContext.Provider>
  )
}

export const useFlowerCart = () => {
  const context = useContext(FlowerCartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
