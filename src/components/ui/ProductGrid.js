import React from 'react'
import ProductFrame from '../../styles/ui/productFrame'

const ProductGrid = (props) => {
    return (
        <>
            <ProductFrame>
                {props.children}
            </ProductFrame>
        </>
    )
}

export default ProductGrid