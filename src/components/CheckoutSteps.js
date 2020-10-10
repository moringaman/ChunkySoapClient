import React, {useState, useReducer, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WxStep, SimpleTextInput, AnimatedButton } from '../components/ui'
import { Heading2 } from '../styles/typography'
import { checkoutReducer, LoginForm } from './'
import styled from 'styled-components'
import { auth, request } from '../helpers/'


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
        fields: {
            register: false,
            identifier: '',
            password: '',
            username: ''
        }
    }
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [cartState, cartDispatch] = useReducer(checkoutReducer, initialState)
    const { step, authenticated, guest, postage, fields: { email, password, register } } = cartState

        useEffect(() => {
                console.log("CART STATE ", cartState)
                console.log("USER", user)
        }, [user])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        console.log("TARGET ", checked)
        console.log("EVENT ", value, name)
        if (type === 'checkbox') {
            cartDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: checked })
            return
        }
        cartDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: value})
    }
    

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("LOGGING IN USER with ", email, password)
        const body = {identifier: email, password: password};
        const requestURL = register ? 'http://localhost:1337/auth/local' : 'http://localhost:1337/auth/local/register';

        request(requestURL, { method: 'POST', body})
            .then((response) => {
            auth.setToken(response.jwt, body.rememberMe);
            auth.setUserInfo(response.user, body.rememberMe);
            // set user info in state
            // set authenticated in reducer
            dispatch({type: "SET_USER_SESSION", value: response.user})
            }).catch((err) => {
            console.log(err);
            });
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
                        <LoginForm handleChange={handleChange} handleLogin={handleLogin} data={cartState.fields}/>
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