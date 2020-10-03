import React, { createContext } from 'react'
import { useSelector } from 'react-redux'


export const BasketContext = createContext({});

export const BasketContextProvider = ({children}) => {
const basket = useSelector(state => state.basket);
console.log("BASKET INCONTXCT ", basket)
    return(
        <BasketContext.Provider value={basket}>
            { children }
        </BasketContext.Provider>
    )
}

export const withBasketContext = ChildComponent => props => (

    <BasketContext.Consumer>
      {
        context => <ChildComponent {...props} basket={context}  />
      }
    </BasketContext.Consumer>
  );