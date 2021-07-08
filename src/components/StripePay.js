import React, {useEffect, useState} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AnimatedButton } from '../components/ui'
import { SubHeading1, Paragraph } from '../styles/typography'
import { Frame, FrameHeader, FrameBody, FrameFooter, ButtonRow } from '../styles/layout'
import * as vars from '../styles/variables'
import * as fn from '../helpers/functions'
import { myApi } from '../helpers/'

const StripePay = ({cartDispatch}) => {
    const { basket } = useSelector(state => state.basket)
    const { user } = useSelector(state => state.user)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ cartTotal, setCartTotal ] = useState(0.00)
    const [ orderId, setOrderId ] = useState(null)
    const elements = useElements()
    const stripe = useStripe()

    const { customer_title, customer_firstname, customer_lastname, customer_email, customer_address1, customer_address2, customer_postcode, customer_town } = user
    const { postage, products, carrierId } = basket

    useEffect(() => {
        console.log('PAYMENT BASKET', basket, "USER", user)
        const totalToPay = fn.getCartTotal(products, postage)
        setCartTotal(totalToPay.toFixed(2))
    }, [basket])

     useEffect(() => {
        cartTotal > 0 && createOrder()
     },[cartTotal])

    const createOrder = async(completed=false) => {
        // create new temporary order before payment created to confirm
        // TODO: Only do this if cart in local storage
        if (orderId) return
        const newOrder = {
            order_customer: user._id,
            order_total: cartTotal,
            order_date: new Date(),
            order_dispatched: false,
            order_confirmed: completed,
            order_items: basket,
            order_postage: postage,
            order_carrier: carrierId
        }
        try {
            const { id } = await myApi.send('/orders', 'POST', newOrder)
            setOrderId(id)
        } catch (err) {
            console.log("ERROR CREATING ORDER ", err)
        }
        console.log("ORDER OBJECT ", newOrder)
    }

    const errorHandle = (response) => {
        console.log("ERROR HANDLING ", response)
    }

    const cardElementOptions = {
        style: {
            base:{
                fontSize: '24px',
                color: vars.palette.primaryColor,
                "::placeholder": {
                    color: vars.palette.colorGray4
                }
            },
            invalid: {},
            complete: {}
        },
        hidePostalCode: true
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        console.log("Submitting ", e)
        setIsLoading(true)
        // put billing details in to an object
        const billingDetails = {
            name: `${customer_title} ${customer_firstname} ${customer_lastname}`,
            email: customer_email,
            address : {
                city:customer_town,
                line1: customer_address1,
                state: customer_town,
                postal_code: customer_postcode
            }
        }


    let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        };

        const result = await fetch(`/api/payment_intents/?amount=${(cartTotal*100).toFixed(0)}`, requestOptions)
        const clientSecret = await result.text()
        console.log("STRIPE ENDPOINT ", clientSecret) // error handle
        // setErrorMessage(errorHandle(clientSecret))
        // need reference to card element
        const cardElement = elements.getElement(CardElement)
        // need stripejs
        // create a payment object
        try {
            const paymentMethodRequest = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            })

            if (paymentMethodRequest.hasOwnProperty('error')) {
                const { message } = paymentMethodRequest.error || ''
                console.log("PAYMENT METHOD REQUEST ", message)
                // errorHandle(errorMessage)
                setIsLoading(false)
                message && setErrorMessage(message)
                return
            }

            const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodRequest.paymentMethod.id,
            })
            
                console.log(confirmedCardPayment)
                setIsLoading(false)
                //  Mark order as completed in database
                const data = {
                    order_confirmed: true
                }
                await myApi.send(`/orders/${orderId}`, 'PUT', data)
                // Remove cart from local storage
                // Payment completed step redirect to success step
                cartDispatch({type: "CHECKOUT_SUCCESS"})
        } catch (err) {
            console.log("PAYMENT REQ ERR ", err)
                setIsLoading(false)
            return
        }
    }

     return (
         <Frame>
            <form onSubmit={(e) => handleFormSubmit(e)}>
            <FrameHeader>
                <SubHeading1>
                    Secure Payment
                </SubHeading1>
            </FrameHeader>
            <FrameBody>
                <CardElementWrapper>
                    <CardElement withUpdate={(e) => console.log(e.value)} options={cardElementOptions} />
                </CardElementWrapper>
                <Paragraph danger>
                    { errorMessage && errorMessage }
                </Paragraph>
                <img src='./stripe-payment.png' style={{width: '60%'}}/>
            </FrameBody>
            <FrameFooter>
                <ButtonRow>
                    <AnimatedButton secondary big type="button" big text='Back' handleClick={() => cartDispatch({type: 'PREV_STEP'})}></AnimatedButton>
                    <AnimatedButton loading={isLoading} type="submit" big text={"Pay " + "\u00A3" + cartTotal} ></AnimatedButton>
                </ButtonRow>
            </FrameFooter>
            </form>
         </Frame>
     )
}

export default StripePay

const CardElementWrapper = styled.div`
    width: 100%;
    padding: 15px;
    border-radius: 15px;
    ${'' /* height: 60px; */}
    border: 2px ${vars.palette.primaryColor} solid;
    ${'' /* box-shadow: 4px 4px 6px  rgba(0,0,0, 0.1); */}
`