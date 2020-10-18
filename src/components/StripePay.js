import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Frame } from '../styles/layout'

const StripePay = ({cartDispatch}) => {
    const { basket } = useSelector(state => state.basket)
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        console.log('PAYMENT BASKET', basket, "USER", user)
    }, [basket])

    const createOrder = (completed) => {
        // create new temporary order before payment created to confirm
    }

     return (
         <Frame>
         Stripe Payments
         </Frame>
     )
}

export default StripePay