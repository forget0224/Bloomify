import React, { createContext, useEffect, useContext } from 'react'
import useLocalStorage from '../hooks/use-localStorage'

const CartContext = createContext({
  cartItems: {},
  setCartItems: () => {},
  handleIncrement: () => {},
  handleDecrement: () => {},
  handleChange: () => {},
  deleteCartItem: () => {},
  clearCart: () => {},
  totalSubtotal: 0,
  totalCartProducts: 0,
})

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', {})

  useEffect(() => {
    if (cartItems) {
      setCartItems(cartItems)
    }
  }, [])

  useEffect(() => {
    setCartItems(cartItems)
  }, [cartItems])

  // 清空購物車
  const clearCart = () => {
    setCartItems({})
  }

  // 商品數量增加
  const handleIncrement = (itemId) => {
    const updatedItems = Object.values(cartItems).map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    )
    console.log('updatedItems', cartItems, updatedItems)
    setCartItems(updatedItems)
  }

  // 商品數量減少
  const handleDecrement = (itemId) => {
    const updatedItems = Object.values(cartItems).map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    )
    setCartItems(updatedItems)
  }

  // 更改特定商品的數量
  const handleChange = (itemId, quantity) => {
    const updatedItems = Object.values(cartItems).map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 0) } : item
    )
    console.log('handleChange', updatedItems)
    setCartItems(updatedItems)
  }

  // 刪除商品
  const deleteCartItem = (itemId) => {
    const updatedItems = Object.values(cartItems).filter(
      (item) => item.id !== itemId
    )
    setCartItems(updatedItems)
  }

  const totalCartProducts = Object.values(cartItems).length
  const totalSubtotal = Object.values(cartItems).reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleIncrement,
        handleDecrement,
        handleChange,
        deleteCartItem,
        clearCart,
        totalSubtotal,
        totalCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
