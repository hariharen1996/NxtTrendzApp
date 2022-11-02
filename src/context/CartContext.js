import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeCartItem: () => {},
  addCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
