import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Section } from '../styles/layout'
import { OrderListItem } from '../components/admin'
import { myApi } from '../helpers'
import * as fn from '../helpers/functions'

const AdminPage = () => {

    const orders = useSelector((state) => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        callApi()
    }, [])

    useEffect(() => {
        console.log('ADMIN STATE ', orders)
    }, [orders])

    const convertDate = (date) => {
        console.log("ADMIN DATE ", new Date(date).toString())
        return new Date(date).toString()
    }


    const renderOrderList = (data) => {
            return data.length > 0 && data.map((order, i ) => (
                     <OrderListItem order={order} key={i} />
                ))
            
    }

    const callApi = async() => {
        const orders = await myApi.send('/orders', 'GET', undefined, 'public')
        console.log('ADMIN PAGE ', orders)
        dispatch({ type: 'GET_ORDERS', payload: orders})
    }
    return (
        <Section light>
        <h1>Orders</h1>
        <div style={{display: 'flex', justifyContent: 'space-around', alignContent: 'right', marginBottom: 20}}>
            <div>
                    Date
            </div>
            <div>Amount</div>
            <div>Customer</div>
            <div>Shipping</div>
        </div>
            {
                orders && renderOrderList(orders)
            }
        </Section>
    )
}

export default AdminPage