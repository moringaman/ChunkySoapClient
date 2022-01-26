import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {reactRename} from 'react-rename'
import styled from 'styled-components'
import Button from '../../styles/components/button'
import AnimatedButton from '../ui/AnimatedButton'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { ShoppingCart, Trash2 } from 'react-feather'

const loadingCircle = reactRename(loading,'loadingCircle')

const AddToCart = props  => {
    
    const { basket } = useSelector(state => state.basket)

    const dispatch = useDispatch()
    const [ currentCart, setCurrentCart ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ added, setAdded ] = useState(false)
    const { _id, product_name, product_short_description, product_price, product_picture_1, product_discount } = props.product
    const { quantity = 1} = props
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
            const newArray = newCartArray.filter(el => el != item)
            dispatch({type: 'REMOVE_FROM_BASKET', payload: item})
            localStorage.setItem('soap-cart', JSON.stringify(newArray))
          } else {
            item.product_qty--
            item.total_price = parseFloat(item.product_price * item.product_qty)
            setCurrentCart(newCartArray)
            dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
            localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
          }
  }

    const addToCart = () => {

        setLoading(true)
        setTimeout(() => {
        console.log(quantity)
       
      const adjustedPrice = parseFloat(product_price - (product_price * product_discount) / 100)

        const newProduct = {
          _id,
          product_name,
          product_description: product_short_description,
          product_picture_1: product_picture_1.url,
          product_price: adjustedPrice,
          product_qty: quantity,
          total_price: adjustedPrice
        }

      if ( currentCart.length === 0 ) {
        setCurrentCart([newProduct])
          dispatch({type: 'ADD_TO_BASKET', payload: [newProduct]})
          localStorage.setItem('soap-cart', JSON.stringify([newProduct]))
      } else {
          let newCartArray = basket.products
         const productInCart = checkIfInCart(_id)
         if (productInCart.length > 0) {
            const itemIndex = newCartArray.findIndex(item => item._id === _id)
            const item = newCartArray[itemIndex]
            item.product_qty += quantity 
            item.total_price = parseFloat(item.product_price * item.product_qty)
            setCurrentCart(newCartArray)
            dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
            localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
         } else {
            const newCartArray = [...currentCart, newProduct]
            localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
            setCurrentCart([...currentCart, newProduct])
            dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
         }
      }
   setLoading(false)
   setAdded(true)
        }, 1000)
  }

    return (
        <>
        {(props.function === 'add' && !props.icon) && 

        <AnimatedButton primary med fixed 
            withIcon={props.icon}
            style={{maxWidth: 200}} 
            handleClick={addToCart} 
            text={!added ? 'Add to cart' : 'Add more'}
        >
            {loading &&  renderLoader() }
            {!loading && <ShoppingCart />}
        </AnimatedButton>
        }
        { (!props.icon && !props.function === 'add') &&
        <AnimatedButton primary med fixed 
            withIcon={props.icon}
            style={{maxWidth: 200}} 
            handleClick={removeFromCart} 
            text={'Remove'}
        >
            {loading &&  renderLoader() }
            {!loading && <Trash2/>}
        </AnimatedButton>
        }
        {props.icon && props.function === 'add' ?
          <IconButton handleClick onClick={() => addToCart()}>
            {loading === false ? props.children : <UseAnimations animation={loadingCircle} strokeColor="green" size={28}/>}
          </IconButton>
          :
          <IconButton onClick={() => removeFromCart()}>
            {loading === false ? props.children : <UseAnimations animation={loadingCircle} strokeColor="green" />}
          </IconButton>
        }
        </>
    )
}

export default AddToCart

const IconButton = styled.div`
  cursor: pointer;
`