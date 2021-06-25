import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import { SubHeading1, Paragraph } from '../../styles/typography'

const ShippingOption = ({option, checked, selected, ...rest}) => {
    
   const handleSelection = (_id) => {
       console.log("touched", _id)
       checked(_id)
   }
    return (
       <Label htmlFor={option.id} selected={selected === option.id}>
       <Option
        type='radio'
        name='delivery'
        id={option.id}
        value={option.id}
        onChange={() => handleSelection(option.id)}
       />
       <CarrierOption>
            <img 
                src={option.shipping_image.url}
                style={{maxHeight: 60, maxWidth: 120, marginRight: 20}}
            />
            <Paragraph>
                {option.shipping_carrier} - {option.shipping_description}<br />
                Price:  &pound; {option.shipping_cost.toFixed(2)}
            </Paragraph>
       </CarrierOption>
       </Label>
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
    height: 80px;
    padding: 20px 40px;
    border: 3px #F7F2F2 solid;
    border-radius: 10px;
    margin: 20px 0px 0px 0px;
    cursor: pointer;
    ${props => props.selected && css`
        border: 3px #79CBB7 solid;
    `}
`
const CarrierOption = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-20px);
`
