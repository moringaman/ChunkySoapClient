import React, { useState } from 'react'
import styled from 'styled-components'
import * as fn from '../../helpers/functions'
import { OrderItemDetail } from './'



    const OrderListItem = ({order}) => {
        const { order_total, createdAt, _id, order_items} = order
        const { customer_firstname, customer_lastname } = order.order_customer

        const [ currentItem, setCurrentItem ] = useState(null)



        console.log("ORDER_ITEM ", order_total)
            return  <div>
                <div  style={{padding: '10px 90px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, justifyItems: 'left', borderBottom: '1px #666 solid'}}>
                        <div>
                            {fn.convertDate(createdAt)}
                        </div>
                        <div>
                             $ {order_total}
                        </div>
                        <div>
                             {customer_firstname} {customer_lastname}
                        </div>
                        <div>
                            { order.order_carrier.shipping_carrier}
                        </div>
                        <div>
                            <button onClick={() => {
                            
                              currentItem === _id ? setCurrentItem(null) : setCurrentItem(_id)

                                }}>{currentItem === null ? 'Open' : 'Close'}</button>
                        </div>
                </div>

                <div>
                    <OrderItemDetail items={order_items} id={_id} item={currentItem}/>
                </div>

            </div>
    }

    export default OrderListItem