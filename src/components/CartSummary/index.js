// Write your code here
import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const totalPrice = cartList.reduce(
            (curr, acc) => curr + acc.quantity * acc.price,
            0,
          )

          return (
            <div className="cart-summary">
              <h1 className="total-heading">
                Order Total: <span className="amount">Rs {totalPrice}/- </span>
              </h1>
              <p className="items-count">{cartList.length} items in cart</p>
              <button className="checkout-btn" type="button">
                Checkout
              </button>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
