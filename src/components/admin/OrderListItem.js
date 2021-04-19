import React, { useState } from 'react'
import styled from 'styled-components'
import * as fn from '../../helpers/functions'
import { OrderItemDetail } from './'
import * as vars from '../../styles/variables'
import { MoreHorizontal, ChevronUp } from 'react-feather'


const OrderListItem = ({ order }) => {
    const { order_total, createdAt, _id, order_items } = order
    const { customer_firstname, customer_lastname } = order.order_customer

    const [currentItem, setCurrentItem] = useState(null)



    console.log("ORDER_ITEM ", order_total)
    return <div>
        <div style={{ padding: '5px 90px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1px", justifyItems: 'left', borderBottom: `2px solid ${vars.palette.colorGray10}` }}>
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
                {order.order_carrier.shipping_carrier}
            </div>
            <div>
                <button secondary sml onClick={() => {
                    currentItem === _id ? setCurrentItem(null) : setCurrentItem(_id)
                }}>{currentItem === null ? <MoreHorizontal /> : <ChevronUp />}</button>
            </div>
        </div>

        <div>
            <OrderItemDetail items={order_items} id={_id} item={currentItem} />
        </div>

    </div>
}

export default OrderListItem