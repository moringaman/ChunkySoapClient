import React, {useState, useReducer, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Check, Edit3, ArrowRight } from 'react-feather'
import { WxStep, SimpleTextInput, AnimatedButton , ShippingOption} from '../components/ui'
import { Heading2, Heading1, SubHeading1 } from '../styles/typography'
import { Divider } from '../styles/ui/basket'
import { checkoutReducer, LoginForm, EditBilling, ShippingOptions } from './'
import styled from 'styled-components'
import { auth, request, myApi, strapi } from '../helpers/'
import { FrameHeader , Frame, FrameBody} from '../styles/layout'
import * as fn from '../helpers/functions'


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
        guest: false,
        loading: false,
        postage: 'standard',
        fields: {
            register: false,
            identifier: '',
            password: '',
            username: ''
        }
    }
    const { user } = useSelector(state => state.user)
    const [cartState, cartDispatch] = useReducer(checkoutReducer, initialState)
    const { step, authenticated, guest, postage, loading, fields: { email, password, register, username } } = cartState
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
        console.log("TARGET ", checked)
        console.log("EVENT ", value, name)
        if (type === 'checkbox') {
            cartDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: checked })
            return
        }
            cartDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: value})
    }

    // const createCustomer = async(_id) => {
    //     const customer = {
    //         customer_title: "",
    //         customer_firstname: "",
    //         customer_lastname: "",
    //         customer_address1: "",
    //         customer_address2: "",
    //         customer_town: "",
    //         customer_postcode: "",
    //         customer_created: new Date(),
    //         user: _id
    //     }
    //     const res = await myApi.send('http://localhost:1337/customer', 'POST', customer)
    //     dispatch({type: "SET_USER_SESSION", payload: res})
    // }
    
    const handleStrapiLogin = async(e) => {
        e.preventDefault()
        cartDispatch({type: 'LOGGING_IN'})
        if(register === true) {
            console.log("REGISTERING NEW USER")
        const body = {email: email, password: password, username: username};
           await strapi.register(body, dispatch)
            cartDispatch({type: 'LOGGED_IN'})

        } else {
            console.log("LOGGING IN USER with ", email, password)
            await strapi.login(body, dispatch)
            const body = {identifier: email, password: password, username: username};
            cartDispatch({type: 'LOGGED_IN'})
        }
    }

    // const handleLogin = (e) => {
    //     e.preventDefault()
    //     console.log("LOGGING IN USER with ", email, password)
    //     const body = {identifier: email, password: password, username: username};
    //     const requestURL = register ? 'http://localhost:1337/auth/local/register/' : 'http://localhost:1337/auth/local/';

    //     request(requestURL, { method: 'POST', body})
    //         .then((response) => {
    //         auth.setToken(response.jwt, body.rememberMe);
    //         auth.setUserInfo(response.user, body.rememberMe);
    //         // set user info in state
    //         // Create new customer associated with response users id 
    //         cartDispatch({type: 'LOGGED_IN'})
    //             if (register === true) {
    //                 createCustomer(response.user.id)
    //             } else {
    //                 cartDispatch({type: 'LOGGED_IN'})
    //                 dispatch({type: "SET_USER_SESSION", payload: response})
    //             }
    //         }).catch((err) => {
    //         console.log(err);
    //         });
    // }

    
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
                        <LoginForm 
                            handleChange={handleChange}
                            handleLogin={handleStrapiLogin} 
                            dispatch={cartDispatch} 
                            data={cartState.fields}
                            loading={cartState.loading}
                            />
                    </>
                }
                {
                    (step === 1 && authenticated ) &&
                    <>
                        { user && 
                        <EditBilling user={user} buttonClick={buttonClick} />
                       
                         }
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
                            </FrameHeader>
                            <FrameBody>
                                <ShippingOptions dispatch={cartDispatch}/>
                            </FrameBody>
                        </Frame>
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

// const Frame = styled.div`
//     margin-top: 130px;
//     margin-left: auto;
//     margin-right: auto;
//     max-width: 550px;
//     padding: 20px 70px;
//     border: 1px solid #DBDBDB;
//     border-radius: 25px;
//     min-height: 320px;
//     display: flex;
//     justify-content: space-between;
//     flex-direction: column;
// `
// const FrameHeader = styled.div`
//         padding: 40px 0px;
//         flex: 1;
// `

// const FrameBody = styled.div`
//     flex: 6;
// `

// const FrameFooter = styled.div`
//     flex: 0.5;
//     height: 70px;
//     ${'' /* border-top: 1px gray solid; */}
//     display: flex;
//     justify-content: space-between;
//     margin-top: 30px;
//     padding: 20px 0px;
// `
// const ButtonRow = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: flex-end;
//     float: right;
//     width: 100%;
// `