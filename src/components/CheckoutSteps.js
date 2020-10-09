import React, {useState, useReducer, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { WxStep, SimpleTextInput, AnimatedButton } from '../components/ui'
import { Heading2 } from '../styles/typography'
import { checkoutReducer, LoginForm } from './'
import styled from 'styled-components'


    const steps = [
        {no: 1, label: 'Account'},   
        {no: 2, label: 'Shipping'},   
        {no: 3, label: 'Payment'},   
        {no: 4, label: 'Success'},   
    ]


    const CheckoutSteps = () => {

    const initialState = {
        step: 1,
        authenticated: false,
        guest: true,
        loading: false,
        postage: 'standard',
        fields: {}
    }

    const [cartState, cartDispatch] = useReducer(checkoutReducer, initialState)
    const { step, authenticated, guest, postage, fields: { email, password } } = cartState

        useEffect(() => {
                console.log("CART STATE ", cartState)
        }, [cartState])

    const handleChange = (e) => {
        console.log("EVENT ", e.target.value, e.target.name)
        cartDispatch({type: 'UPDATE_FIELD', fieldName: e.target.name, fieldValue: e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("LOGGING IN USER with ", email, password)

    }

    
    const buttonClick = (action) => {
            cartDispatch({type: action})
    }   
        return (
            <>
                <Steps>
                    {
                        steps.map(el => 
                        <WxStep label={el.label} step={step} number={el.no} key={el.no}/>
                        )
                    }
                </Steps>
                { (step === 1 && !authenticated) &&
                    <>
                        <LoginForm handleChange={handleChange} handleLogin={handleLogin} />
                    </>
                }
                <div style={{position: 'absolute', top: 1250, left: 300}}>
                    { step > 1 && <AnimatedButton big handleClick={() => buttonClick('PREV_STEP')} text="PREV" /> }
                    { step < 4 && <AnimatedButton big handleClick={() => buttonClick('NEXT_STEP')} text="NEXT" /> }
                </div>
            </>
        )
    }

   export default CheckoutSteps

const Steps = styled.div`
  ${'' /* position: absolute; */}
   min-width: 750px;
   margin-top: 10px;
   margin-right: auto;
   margin-left: auto;
   text-align: center;
   transform: translateX(80px);
`