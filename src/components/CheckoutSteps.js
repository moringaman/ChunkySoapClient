import React, {useState, useReducer, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Check, Edit3, ArrowRight } from 'react-feather'
import { WxStep, SimpleTextInput, AnimatedButton } from '../components/ui'
import { Heading2, Heading1, SubHeading1 } from '../styles/typography'
import { Divider } from '../styles/ui/basket'
import { checkoutReducer, LoginForm, EditBilling } from './'
import styled from 'styled-components'
import { auth, request, myApi } from '../helpers/'


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
    const { user } = useSelector(state => state.user)
    const [cartState, cartDispatch] = useReducer(checkoutReducer, initialState)
    const { step, authenticated, guest, postage, fields: { email, password, register } } = cartState
    const dispatch = useDispatch()

        useEffect(() => {
           const userInfo = auth.getUserInfo()
           if (userInfo ) {
               cartDispatch({type: 'LOGGED_IN'})
               const query = `?_where[user._id]=${userInfo._id}`
             apiCall(query)
           }
           console.log("USER SESSION ", userInfo)

        }, [])

        useEffect(() => {
                console.log("CART STATE: ", cartState)
                console.log("USER", user)
        }, [authenticated])

        const apiCall = async(query) => {
           const res = await myApi.send(`/customers${query}`)
           console.log("CUSTOMER INFO ", res[0])
           dispatch({type: "SET_USER_SESSION", payload: res[0] })
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
    

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("LOGGING IN USER with ", email, password)
        const body = {identifier: email, password: password};
        const requestURL = register ? 'http://localhost:1337/auth/local/register/' : 'http://localhost:1337/auth/local/';

        request(requestURL, { method: 'POST', body})
            .then((response) => {
            auth.setToken(response.jwt, body.rememberMe);
            auth.setUserInfo(response.user, body.rememberMe);
            // set user info in state
            // set authenticated in reducer
            // dispatch({type: "SET_USER_SESSION", value: {}})
            cartDispatch({type: 'LOGGED_IN'})
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
                {
                    (step === 1 && authenticated ) &&
                    <>
                        { user && 
                        <EditBilling user={user} buttonClick={buttonClick} />
                       
                         }
                    </>
                }
                <div style={{position: 'absolute', top: 380, left: 300}}>
                    { step > 1 && <AnimatedButton big handleClick={() => buttonClick('PREV_STEP')} text="PREV" ></AnimatedButton> }
                    { step < 4 && <AnimatedButton big handleClick={() => buttonClick('NEXT_STEP')} text="NEXT" ></AnimatedButton> }
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

const Frame = styled.div`
    margin-top: 130px;
    margin-left: auto;
    margin-right: auto;
    max-width: 550px;
    padding: 20px 70px;
    border: 1px solid #DBDBDB;
    border-radius: 25px;
    min-height: 320px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
const FrameHeader = styled.div`
        padding: 40px 0px;
        flex: 1;
`

const FrameBody = styled.div`
    flex: 6;
`

const FrameFooter = styled.div`
    flex: 0.5;
    height: 70px;
    ${'' /* border-top: 1px gray solid; */}
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 20px 0px;
`
const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    float: right;
    width: 100%;
`