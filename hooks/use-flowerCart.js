import React, { createContext, useContext, useReducer, useEffect } from 'react'
const FlowerCartContext = createContext()
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
    product_category: '',
    product_price: 0,
    name: '',
  },
  package: {
    product_id: '',
    package_name: '',
    package_url: '',
    product_category: '',
    product_price: 0,
    name: '',
  },
}

// reducer 函數來處理狀態更新
function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_BOUQUET_INFO':
      return {
        ...state,
        bouquet_name: action.payload.template_name || '客製化花束', // 如果沒有新值，保持舊值
        image_url: action.payload.image_url || state.image_url, // 如果沒有新值，保持舊值
        store_id: action.payload.store_id || state.store_id, // 如果沒有新值，保持舊值
        store_name: action.payload.store_name || state.store_name, // 如果沒有新值，保持舊值
        store_address: action.payload.store_address || state.store_address, // 如果沒有新值，保持舊
      }
    case 'ADD_PRODUCTS':
      return {
        ...state,
        products: [...state.products, ...action.payload],
      }
    case 'CLEAR_PRODUCTS':
      return {
        ...state,
        products: initialState.products,
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
    case 'CLEAR_CARD':
      return {
        ...state,
        card: initialState.card,
      }

    case 'CLEAR_PACKAGE':
      return {
        ...state,
        package: initialState.package,
      }

    case 'CLEAR_PRODUCTS_AND_BOUQUET':
      return {
        ...state,
        products: [],
        bouquet_name: '',
        image_url: '',
        store_id: '',
        store_name: '',
        store_address: '',
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const FlowerCartProvider = ({ children }) => {
  const initializer = () => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('flowerCartState')
      return savedData ? JSON.parse(savedData) : initialState
    }
    return initialState
  }

  const [state, dispatch] = useReducer(cartReducer, initialState, initializer)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('flowerCartState', JSON.stringify(state))
    }
  }, [state])

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
