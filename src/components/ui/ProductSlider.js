import React from 'react'
import { SlideGrid } from '../../styles/layout'

const ProductSlider = (props) => {
    return (
        <>
        <SlideGrid>
            {props.children}
        </SlideGrid>
        </>
    )
}

export default ProductSlider