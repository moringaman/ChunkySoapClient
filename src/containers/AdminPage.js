import React, { useEffect, useState, useReducer } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Section } from '../styles/layout'
import { OrderListItem } from '../components/admin'
import { myApi } from '../helpers'
import * as fn from '../helpers/functions'
import  WxButton from '../styles/components/button'

const AdminPage = () => {

    const orders = useSelector((state) => state.orders.orders)

    const initialState = {
        numberPerPage: 6,
        pageCount: 1,
        currentData: [] 
    }

    const paginationReducer = (state=initialState, action) => {
        console.log("PAGE REDUCER ", action.payload)
        switch(action.type) {
            case 'GET_DATA':
                return {
                    ...state,
                    currentData: action.payload
                }
            case 'PREV_PAGE':
                return {
                    ...state,
                    pageCount: state.pageCount - 1
                }
            case 'NEXT_PAGE':
                return {
                    ...state,
                    pageCount: state.pageCount + 1
                }
            case 'SET_PAGE':
                return {
                    ...state,
                    pageCount: action.payload
                }
                default:
                return state
        }
    }
    const [ paginationState, paginationDispatch] = useReducer(paginationReducer, initialState)


    const dispatch = useDispatch()

    useEffect(() => {
        callApi()
    }, [])

    useEffect(() => {
        if (orders.length > 0) {
            const paginatedOrders = orders.slice((paginationState.pageCount - 1) * paginationState.numberPerPage, paginationState.pageCount * paginationState.numberPerPage)
            console.log("Mounted paginated ", paginatedOrders)
            paginationDispatch({type: 'GET_DATA', payload: paginatedOrders})
            console.log("MOUNTED state ", paginationState)
        }
        console.log("Mounted: ", orders, paginationState)
    }, [orders, paginationState.pageCount])


    const renderOrderList = (data) => {
        return data.length > 0 && data.sort((a,b) => a.createdAt - b.createdAt).map((order, i) => (
            <OrderListItem order={order} key={i} />
        ))
    }

    const renderButtons = (data) => {
        const { pageCount } = paginationState
        const numberOfPages = Math.round(data.length / paginationState.numberPerPage) + 1
        return (
            <>
           { paginationState.pageCount > 1 && <WxButton secondary onClick={() => paginationDispatch({type: 'PREV_PAGE'})}>PREV</WxButton>}
            {  numberOfPages > 0 && new Array(numberOfPages).fill().map((a, index) => 
                pageCount === index+1 ? <WxButton primary sml onClick={() => { paginationDispatch({type: 'SET_PAGE', payload: index+1})}}>{index+1}</WxButton>
                :<WxButton sml onClick={() => { paginationDispatch({type: 'SET_PAGE', payload: index+1})}}>{index+1}</WxButton>
             )}
           { paginationState.pageCount < numberOfPages && <WxButton secondary="true" onClick={() => paginationDispatch({type: 'NEXT_PAGE'})}>NEXT</WxButton>}
            </>
        )
    }

    const callApi = async () => {
        const orders = await myApi.send('/orders', 'GET', undefined, 'public')
        dispatch({ type: 'GET_ORDERS', payload: orders })
    }
    return (
        <Section light>
            <h1>Orders</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'right', marginBottom: 20 }}>
                <div>
                    Date
            </div>
                <div>Amount</div>
                <div>Customer</div>
                <div>Shipping</div>
                <div></div>
            </div>
            {
                paginationState.currentData.length > 0 && renderOrderList(paginationState.currentData)
            }
            <div style={{display: 'flex'}}>
                {
                    orders.length > 0 && renderButtons(orders)
                }
            </div>
        </Section>
    )
}

export default AdminPage