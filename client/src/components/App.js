// import logo from '../assets/logo.svg';
import '../assets/App.css';
import Header from './Header';
import Home from './Home';
import ItemDetailPage from './ItemDetailPage';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import User from './User';
import PurchaseDetail from './PurchaseDetail'
import SignUp from './SignUp'
import Login from './Login';
import Auth from './Auth';


import { 
  BrowserRouter as Router,
  Switch, 
  Route
} from "react-router-dom";

import React, { useState, useEffect } from "react";


function App() {
  //use state for displaying 
  const [showItemPage, setShowItemPage] = useState("pressOn")
  const [currentUser, setCurrentUser] = useState(null)
  const [isUserLoaded, setisUserLoaded] = useState(false)
  const [errors, setErrors] = useState([]);

  // keep track of the cartItem instances
  const [cartItemInstances, setCartItemInstances] = useState([])


  //fetch user for testing. delete when login function is setup 
  useEffect(() => {
    async function fetchUser(){
        const res = await fetch(`/users/1`)
        if (res.ok) {
            const user =  await res.json()
            setCurrentUser(user)
            setCartItemInstances(user.in_cart_item_instances)
            setisUserLoaded(true)
        }
    }
    fetchUser()
  },[])

  if (!isUserLoaded) return <h2>Loading...</h2>;

  const onAddToCartClick = (e, quantity, item) => {
    e.preventDefault();
    // console.log(shoppingCartDisplayItemList, item)
    let itemAlreadyInCart = cartItemInstances.find(i=> i.item_type === item.item_type && i.item_id===item.id) //=>item instance or false value
    //is this item alreay in cart? yes - PATCH, no - POST
    if (itemAlreadyInCart) {
      console.log( itemAlreadyInCart )
      // PATCH
      let totalQuantity = itemAlreadyInCart.in_cart_quantity + quantity
      console.log(totalQuantity)
      async function updateCartItem() {
        const res = await fetch(`/cart_items/${itemAlreadyInCart.id}`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({in_cart_quantity: totalQuantity })
        });
        if (res.ok) {
          const itemInCartUpdated = await res.json();
          console.log("dataBackFromPatch",itemInCartUpdated)
          //update the state
          let deletedOldInstance = cartItemInstances.filter(i=> i !== itemAlreadyInCart)
          setCartItemInstances([...deletedOldInstance, itemInCartUpdated])
        } else {
          const error = await res.json()
          setErrors(error.message)
        }
      }
      updateCartItem();
    }  else {
      //POST
      //extract the info needed to pass to the backend
      let addedItem = {
        shopping_cart_id: currentUser.shopping_cart.id, 
        item_id: item.id,
        item_type:item.item_type,
        in_cart_quantity: quantity
      }
      //make a POST request
      async function createCartItem() {
        const res = await fetch(`/cart_items`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addedItem),
        })
        if (res.ok) {
          let addedToCartItem = await res.json();
          //update the state
          console.log(addedToCartItem)
          setCartItemInstances([...cartItemInstances, addedToCartItem])
        } else {
          const error = await res.json()
          setErrors(error.message)
        }
      };
      createCartItem();
    };
  }


console.log(cartItemInstances)

  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home showItemPage={showItemPage} setShowItemPage={setShowItemPage} onAddToCartClick={onAddToCartClick}/>
          </Route>

          {/* <Route path="/signup">
            <SignUp />
          </Route> */}

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/shoppingcart" >
            <ShoppingCart currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          </Route>

          <Route path="/checkout">
            <Checkout/>
          </Route>

          <Route path="/user">
            <User />
          </Route>

          <Route path="/items/:type/:id">
            <ItemDetailPage showItemPage={showItemPage} 
                            onAddToCartClick={onAddToCartClick}
                            />
          </Route>

          <Route path="/purchasedetail">
            <PurchaseDetail />
          </Route>
           <Route exact path="/signup">
               <Auth />
           </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
