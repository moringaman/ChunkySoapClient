import React, {useReducer, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WxStep} from '../components/ui'
import { SubHeading1 } from '../styles/typography'
import { checkoutReducer, LoginForm, EditBilling, ShippingOptions, StripePay, CheckoutSuccess } from './'
import styled from 'styled-components'
import { auth, myApi, strapi } from '../helpers/'
import { FrameHeader , Frame, FrameBody, Divider} from '../styles/layout'
import * as fn from '../helpers/functions'


    const steps = [
        {no: 1, label: 'Account'},   
        {no: 2, label: 'Shipping'},   
        {no: 3, label: 'Payment'},   
        {no: 4, label: 'Success'},   
    ]


    const CheckoutSteps = () => {

    const initialState = {
        step: 2,
        authenticated: false,
        guest: null,
        loading: false,
        errorMsg: '',
        postage: {},
        fields: {
            register: false,
            identifier: '',
            password: '',
            password_confirmation: '',
            username: ''
        },
    }
    const { user } = useSelector(state => state.user)
    const [cartState, cartDispatch] = useReducer(checkoutReducer, initialState)
    const { step, authenticated, guest, postage, loading, fields: { email, password, register, username, password_confirmation } } = cartState
    const dispatch = useDispatch()

        useEffect(() => {
           const userInfo = auth.getUserInfo()
           if (!fn.isEmpty(userInfo) ) {
               cartDispatch({type: 'LOGGED_IN'})
               const query = `?_where[user._id]=${userInfo._id}`
             apiCall(query)
           }
           console.log("USER SESSION ", userInfo)

        }, [,authenticated])

        useEffect(() => {
            console.log("CART DATA IS ", cartState, user)
        }, [cartState])

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [step, guest, authenticated, loading]);

        const apiCall = async(query) => {
            try {
                const res = await myApi.send(`/customers${query}`)
                console.log("CUSTOMER INFO ", res[0])
                dispatch({type: "SET_USER_SESSION", payload: res[0] })
            } catch (err) {
                console.log(err)
            }
        }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            cartDispatch({type: 'CLEAR_FIELDS'})
            cartDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: checked })
            return
        }
            cartDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: value})
    }

    
    const handleStrapiLogin = async(e) => {
        e.preventDefault()
        cartDispatch({type: 'LOGGING_IN'})
        if(register === true) {
            if(password !== password_confirmation) {
                console.log("PASSWORDS MUST MATCH ")
                return
            }
            console.log("REGISTERING NEW USER")
        const body = {email: email, password: password, username: username};
            try {
                await strapi.register(body, dispatch)
                cartDispatch({type: 'LOGGED_IN'})
            }catch(err) {
                console.log(err)
                cartDispatch({type: 'LOGIN_FAIL', payload: err})
            }

        } else {
            console.log("LOGGING IN USER with ", email, password)
            const body = {identifier: email, password: password, username: username};
            try {
               const response = await strapi.login(body, dispatch)
               if (response.status === 400 ) {
                cartDispatch({type: 'LOGIN_FAIL', payload: response.message})
               } else {
                cartDispatch({type: 'LOGGED_IN'})
               }
                console.log('LOGIN RESPONSE ', response)
            } catch (err) {
                console.log('LOGIN ERROR ', err)
                cartDispatch({type: 'LOGIN_FAIL', payload: err})
            }
        }
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
                { (step === 1 && !authenticated && guest === null) &&
                    <>
                        <LoginForm 
                            handleChange={handleChange}
                            handleLogin={handleStrapiLogin} 
                            dispatch={cartDispatch} 
                            data={cartState.fields}
                            loading={cartState.loading ? 1 : undefined}
                            />
                    </>
                }
                {
                    (step === 1 && authenticated || step === 1 && guest === true) &&
                    <>
                        <EditBilling user={user} cartState={cartState} buttonClick={buttonClick} cartDispatch={cartDispatch} />
                    </>
                }
                {
                    step === 2 && 
                    (
                        <Frame>
                            <FrameHeader>
                                <SubHeading1>
                                    Choose a Shipping Option
                                </SubHeading1>
                                <Divider mb='10px'/>
                            </FrameHeader>
                            <FrameBody>
                                <ShippingOptions dispatch={dispatch} cartDispatch={cartDispatch} />
                            </FrameBody>
                        </Frame>
                    )
                }
                {
                    step === 3 && (
                        <>
                        <StripePay cartDispatch={cartDispatch} />
                        </>
                    )
                }
                {
                    step === 4 && (
                        <>
                            <CheckoutSuccess cartState={cartState} />
                        </>
                    )
                }
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
