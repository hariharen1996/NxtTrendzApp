import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const existedCartItems = cartList.some(item => item.id === product.id)
    if (existedCartItems) {
      const updatedItems = cartList.map(item => {
        if (item.id === product.id) {
          const updatedCartItems = {
            id: item.id,
            brand: item.brand,
            price: item.price,
            availability: item.availability,
            description: item.description,
            imageUrl: item.imageUrl,
            totalReviews: item.totalReviews,
            title: item.title,
            quantity: item.quantity + product.quantity,
          }
          return updatedCartItems
        }
        return item
      })
      this.setState({cartList: updatedItems})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
      //   TODO: Update the code here to implement addCartItem
      console.log(cartList)
    }
  }

  incrementCartItemQuantity = incId => {
    const {cartList} = this.state
    const incQuantity = cartList.map(item => {
      if (item.id === incId) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    this.setState({cartList: incQuantity})
  }

  decrementCartItemQuantity = decId => {
    const {cartList} = this.state
    const decQuantity = cartList
      .map(item => {
        if (item.id === decId) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      .filter(item => item.quantity !== 0)
    this.setState({cartList: decQuantity})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const deleteCartItems = cartList.filter(item => item.id !== id)
    this.setState({cartList: deleteCartItems})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
