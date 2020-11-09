import React from 'react'
import { SlideGrid } from '../../styles/layout'

const ProductSlider = ({ children , ...rest}) => {
    return (
        <>
        <SlideGrid {...rest} >
            {children}
        </SlideGrid>
        </>
    )
}

export default ProductSlider