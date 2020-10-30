import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ShippingOption, AnimatedButton } from '../components/ui'
import { ButtonRow } from '../styles/layout'
import * as fn from '../helpers/functions'

const ShippingOptions = ({dispatch, cartDispatch}) => {
    const [options, setOptions ] = useState([])
    const [currentOption, setCurrentOption ] = useState()
    const { basket } = useSelector(state => state.basket)

    useEffect(() => {
        apiCall()
    }, [])

    useEffect(() => {
         const shippingDetails = options.find(el => el._id === currentOption)
         console.log("selected shipping ", shippingDetails)
         let shippingCost = 0
         if (shippingDetails ) {
             let {shipping_cost, id } = shippingDetails
             if ((fn.getCartTotal(basket.products) > 25) && (shipping_cost < 4)) {
                 console.log("CART_TOTAL ", fn.getCartTotal(basket.products))
                shippingCost = 0
             } else {
                shippingCost = shipping_cost 
             }
            dispatch({type: "SET_POSTAGE", payload: {shipping_cost:shippingCost, id} })
            cartDispatch({type: "SET_POSTAGE", payload: shippingDetails})
            console.log("COST ", shippingCost)
         }
    }, [currentOption])

    const apiCall = async() => {
        const response = await fetch('http://localhost:1337/shippings')
        const result = await response.json()
        console.log("SHIIPING ", result)
        setOptions(result)
        //TODO: If value is over 25 make standard Royal mail default
        setCurrentOption(result[0]._id)
    } 

    const selectOption = (_id) => {
        console.log("CHECKED ", _id)
        setCurrentOption(_id)
    }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    options && options.map((el, i) => 
                        <ShippingOption active={currentOption} selected={currentOption} checked={selectOption} option={el} key={i}/>
                    )
                }
            </div>
            <ButtonRow>
                <AnimatedButton big text="Continue" handleClick={() => cartDispatch({type: 'NEXT_STEP'})}/>
            </ButtonRow>
        </>
    )
}

export default ShippingOptions 