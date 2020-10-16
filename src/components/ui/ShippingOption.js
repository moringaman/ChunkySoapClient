import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import { SubHeading1 } from '../../styles/typography'

const ShippingOption = ({option, checked, selected, ...rest}) => {
    
   const handleSelection = (_id) => {
       console.log("touched", _id)
       checked(_id)
   }
    return (
            <>
       <Label htmlFor={option.id} selected={selected === option.id}>
       <Option
        type='radio'
        name='delivery'
        id={option.id}
        value={option.id}
        onChange={() => handleSelection(option.id)}
       />
       {option.shipping_carrier}<br/>
        {option.shipping_description}
       </Label>
    </>
    )
}

export default ShippingOption

const Option = styled.input`
     opacity: 0;
     position: fixed;
     width: 0;
`

const Label = styled.label`
    width: 550px;
    height: 40px;
    padding: 30px;
    border: 3px #F7F2F2 solid;
    border-radius: 10px;
    margin: 10px 0px 0px 0px;
    ${props => props.selected && css`
        border: 3px #79CBB7 solid;
    `}
`

