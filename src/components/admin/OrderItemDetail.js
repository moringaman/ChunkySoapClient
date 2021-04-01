import React, { useEffect, useState } from 'react'

const OrderItemDetail = (props) => {


    const { products } = props.items
    const { item, id } = props
    console.log("ORDER DEETS ", products)
    const renderItems = () => {
        return (
            <>
            { 
            products && products.map((item, i) => (
                <div style={{display: 'flex', justifyContent: 'space-between', flexBasis: 1, flexGrow: 1}} key={item._id}>
                    <div style={{border: '1px red solid', width: '100%'}} >
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