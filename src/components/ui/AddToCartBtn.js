import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../../styles/components/button'
import AnimatedButton from '../ui/AnimatedButton'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { ShoppingCart, Trash2 } from 'react-feather'

const AddToCart = (props) => {
    
    const { basket } = useSelector(state => state.basket)

    const dispatch = useDispatch()
    const [ currentCart, setCurrentCart ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ added, setAdded ] = useState(false)
    const { _id, product_name, product_short_description, product_price, product_picture_1, product_discount } = props.product

  useEffect(() => {
    if (process.browser) {
      const cartInStorage = localStorage.getItem('soap-cart')
        if (cartInStorage) {
          setCurrentCart(JSON.parse(cartInStorage))
          dispatch({type: 'SET_INITIAL_BASKET', payload: JSON.parse(cartInStorage)})
        }
    }
  }, [])

  const renderLoader = () => {
      return (
        <Loader
            type="ThreeDots"
            color="#FFFFFF"
            height={29}
            width={29}
            timeout={30000} //3 secs
        />
      )
  }

  const checkIfInCart = (_id) => {
        //  return  currentCart.filter(item => item._id === _id)
         return  basket.products.filter(item => item._id === _id)
  }

  const removeFromCart = () => {
            const itemsInCart = checkIfInCart(_id)
        // find index of item in basket array
            const newCartArray = basket.products
          const itemIndex = newCartArray.findIndex(item => item._id === _id)
          const item = newCartArray[itemIndex]
          if(itemsInCart[0].product_qty == 1) {
              console.log("ITEM IN CART ", itemsInCart[0])
            //   newCartArray.splice(itemIndex, 1)
            const newArray = newCartArray.filter(el => el != item)
            //   console.log("NEW BASKET STATE ", newCartArray)
            // dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
            // console.log("ITEM NO IN CART ", itemsInCart.length)
            dispatch({type: 'REMOVE_FROM_BASKET', payload: item})
            console.log("NEW ARRAY ", newArray)
            localStorage.setItem('soap-cart', JSON.stringify(newArray))
          } else {
            item.product_qty--
            item.total_price = parseFloat(item.product_price * item.product_qty)
            setCurrentCart(newCartArray)
            dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
            localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
            console.log("QUANTITY UPDATED")
            // deletits quanity by 1
          }
  }

    const addToCart = () => {

        setLoading(true)
        setTimeout(() => {

       
      const adjustedPrice = parseFloat(product_price - (product_price * product_discount) / 100)

        const newProduct = {
          _id,
          product_name,
          product_description: product_short_description,
          product_picture_1: product_picture_1.url,
          product_price: adjustedPrice,
          product_qty: 1,
          total_price: adjustedPrice
        }

      if ( currentCart.length === 0 ) {
        setCurrentCart([newProduct])
          dispatch({type: 'ADD_TO_BASKET', payload: [newProduct]})
          localStorage.setItem('soap-cart', JSON.stringify([newProduct]))
        console.log("ADDED FIRST")
      } else {
          let newCartArray = basket.products
         const productInCart = checkIfInCart(_id)
        //  newCartArray.filter(item => item._id === _id)
         if (productInCart.length > 0) {
          // find index and increase quantity
          const itemIndex = newCartArray.findIndex(item => item._id === _id)
          const item = newCartArray[itemIndex]
          item.product_qty++
          item.total_price = parseFloat(item.product_price * item.product_qty)
          setCurrentCart(newCartArray)
          dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
          localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
          console.log("QUANTITY UPDATED")
         } else {
           const newCartArray = [...currentCart, newProduct]
           localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
           setCurrentCart([...currentCart, newProduct])
           dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
           console.log("ADDED NEW")
         }
      }
   setLoading(false)
   setAdded(true)
        }, 2000)
  }

    return (
        <>
        {props.function === 'add' ?

        <AnimatedButton med fixed 
            withIcon={props.icon}
            style={{maxWidth: 200}} 
            handleClick={addToCart} 
            text={!added ? 'Add to cart' : 'Add another'}
        >
            {loading &&  renderLoader() }
            {!loading && <ShoppingCart />}
        </AnimatedButton>
        : 

        <AnimatedButton med fixed 
            withIcon={props.icon}
            style={{maxWidth: 200}} 
            handleClick={removeFromCart} 
            text={'Remove'}
        >
            {loading &&  renderLoader() }
            {!loading && <Trash2/>}
        </AnimatedButton>
        }
        </>
    )
}

export default AddToCart