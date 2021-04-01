import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'react-feather'

const OrderItemDetail = (props) => {


    const { products } = props.items
    const { item, id } = props
    console.log("ORDER DEETS ", props)
    const renderItems = () => {
        return (
            <>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid black'}}>
                <div style={{width: '100%'}}>
                    Product
                </div>
                <div style={{width: '100%'}}>
                    Price
                </div>
                <div style={{width: '100%'}}>
                   Quantity 
                </div>
                <div style={{width: '100%'}}>
                   Total Price
                </div>
            </div>
            { 
            products && products.map((item, i) => (
                <div style={{display: 'flex', justifyContent: 'space-between', flexBasis: 1, flexGrow: 1}} key={item._id}>
                    <div style={{width: '100%'}} >
                        {item.product_name}
                    </div>
                    <div style={{width: '100%'}}>
                        ${item.product_price}
                    </div>
                    <div style={{width: '100%'}}>
                        {item.product_qty}
                    </div>
                    <div style={{width: '100%'}}>
                        ${item.total_price.toFixed(2)}
                    </div>
                    </div>
            ))
            }
            <div style={{display: 'flex', flexDirection: 'row', borderTop: '1px solid black', margin: '10px 0px', justifyContent: 'space-around', padding: '10px 0px', alignItems: 'center'}} >
                <div style={{width: '100%'}}></div>
                <div style={{width: '100%'}}></div>
                <div style={{width: '100%'}}></div>
                <div style={{width: '100%', }}><Link to={`/admin/invoice?=${id}`}>
                View Invoice: <FileText />
                </Link>
                </div>
            </div>
            </>
        )
    }

    return (
        <div style={{marginBotton: '50', padding: '10px 90px', transition: 'all 0.3s ease-in'}} className={ item === id ? 'visible' : 'hidden'}>
        {
         renderItems()
        }
        </div>
    )
}

export default OrderItemDetail