import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import combineReducers from '../src/reducers'
import { HomePage, CheckoutPage, ProductPage, CategoriesPage, AdminPage, SearchResults, AuthPage, InvoicePage} from './containers'
import Basket from '../src/components/Basket';
import PrivateRoute from './components/PrivateRoute'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { WithNavbar, WithHero } from '../src/components/layout'
import { Container } from '../src/styles/layout'
import './styles/global.css'
const store = createStore(combineReducers)

const stripePromise = loadStripe('pk_test_3o7rovRbtC8Fmec24VShO7pU')
 // ADD PUBLISHABLE KEY
 // sk_test_rvboOk0S3wSR1tPGYuzzcjpV

const App = () => (
  <Provider store={store}>
    <Elements stripe={stripePromise}>
        <Switch>
          <WithNavbar color="light">
            <Route exact path="/" component={HomePage} />
            <Route path="/search-results" component={SearchResults} />
            <Route path="/basket" component={Basket} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/product/:_id" exact component={ProductPage} />
            <Route path="/category/:_id" component={CategoriesPage} />
            <Route path="/authenticate" component={AuthPage} />
            <PrivateRoute path="/admin" store component={AdminPage} />
            <PrivateRoute path="/admin/invoices/:_id" component={InvoicePage} />
          </WithNavbar>
        </Switch>
    </Elements>
  </Provider>
);

export default App;
