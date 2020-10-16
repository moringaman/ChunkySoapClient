import React, { useEffect, useState } from 'react'
import { ShippingOption } from '../components/ui'
import { myApi } from '../helpers'

const ShippingOptions = ({dispatch}) => {

    const [options, setOptions ] = useState([])
    const [currentOption, setCurrentOption ] = useState()

    useEffect(() => {
        apiCall()
    }, [])

    useEffect(() => {
         const shippingDetails = options.find(el => el._id === currentOption)
         console.log("selected shipping ", shippingDetails)
    }, [currentOption])

    const apiCall = async() => {
        const response = await fetch('http://localhost:1337/shippings')
        const result = await response.json()
        console.log("SHIIPING ", result)
        setOptions(result)
        setCurrentOption(result[0]._id)
    } 

    const selectOption = (_id) => {
        console.log("CHECKED ", _id)
        setCurrentOption(_id)
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
        {
            options && options.map((el, i) => 
                <ShippingOption active={currentOption} selected={currentOption} checked={selectOption} option={el} key={i}/>
            )
        }
        </div>
    )
}

export default ShippingOptions 