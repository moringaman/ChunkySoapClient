import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import combineReducers from '../src/reducers'
import HomePage from '../src/components/HomePage';
import CheckoutPage from '../src/components/CheckoutPage'
import ProductPage from '../src/components/ProductPage';
import Basket from '../src/components/Basket';
import Navbar from '../src/components/Navbar'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Container } from '../src/styles/layout'
import './styles/global.css'
const store = createStore(combineReducers)

const stripePromise = loadStripe('pk_test_3o7rovRbtC8Fmec24VShO7pU')
 // ADD PUBLISHABLE KEY
 // sk_test_rvboOk0S3wSR1tPGYuzzcjpV

const App = () => (
  <Provider store={store}>
    {/* <Container> */}
    <Elements stripe={stripePromise}>
      <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/basket" component={Basket} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/product/:_id" component={ProductPage} />
        </Switch>
    </Elements>
    {/* </Container> */}
  </Provider>
);

export default App;
