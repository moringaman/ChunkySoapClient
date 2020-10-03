import React from 'react'
import { useParams } from 'react-router-dom'
 const ProductPage = (props) => {

    const { _id } = useParams()
    console.log("ROUTER QUERY ", _id)

    return (
        <div>Product: {_id} </div>
    )
}

export default ProductPage