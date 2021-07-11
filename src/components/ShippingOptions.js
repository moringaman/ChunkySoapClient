import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ShippingOption, AnimatedButton } from '../components/ui'
import { ButtonRow } from '../styles/layout'
import { ArrowLeft } from 'react-feather'
import { myApi } from '../helpers'
import * as fn from '../helpers/functions'

const ShippingOptions = ({dispatch, cartDispatch}) => {
    const [options, setOptions ] = useState([])
    const [ loading, setLoading ] = useState(true)
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
        try {
            const result = await myApi.send('/shippings', 'GET', undefined, 'public')
            console.log("SHIPPING ", result)
            setOptions(result)
            //TODO: If value is over 25 make standard Royal mail default
            if (fn.getCartTotal(basket.products) > 25) {
                setCurrentOption(result[2]._id)
            } else {
                setCurrentOption(result[0]._id)
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    } 

    const selectOption = (_id) => {
        console.log("CHECKED ", _id)
        setCurrentOption(_id)
    }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    options.length > 0 ? options.map((el, i) => 
                        <ShippingOption active={currentOption} selected={currentOption} checked={selectOption} option={el} key={i}/>
                    )
                    :
                    <div>
                        Loading shipping options...
                    </div>
                }
            </div>
            <ButtonRow>
                <AnimatedButton big secondary text="Back" handleClick={() => cartDispatch({type: 'PREV_STEP'})}><ArrowLeft/></AnimatedButton>
                <AnimatedButton big text="Continue" handleClick={() => cartDispatch({type: 'NEXT_STEP'})}/>
            </ButtonRow>
        </>
    )
}

export default ShippingOptions 