import React, { useEffect, useState } from 'react'
import { ShippingOption, AnimatedButton } from '../components/ui'
import { ButtonRow } from '../styles/layout'
import { myApi } from '../helpers'

const ShippingOptions = ({dispatch, cartDispatch}) => {

    const [options, setOptions ] = useState([])
    const [currentOption, setCurrentOption ] = useState()

    useEffect(() => {
        apiCall()
    }, [])

    useEffect(() => {
         const shippingDetails = options.find(el => el._id === currentOption)
         console.log("selected shipping ", shippingDetails)
         if (shippingDetails ) {
            const shippingCost = shippingDetails.shipping_cost || 0
            dispatch({type: "SET_POSTAGE", payload: shippingCost})
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