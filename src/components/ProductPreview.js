import React from 'react'
import styled from 'styled-components'
import { Layers } from 'react-feather'
import Button from '../styles/components/button'
import AddToCart from '../components/ui/AddToCartBtn'
import AnimatedButton from '../components/ui/AnimatedButton'
import ProductFrame from '../styles/ui/productFrame'
import { Heading1, Heading2, Paragraph } from '../styles/typography'

const ProductPreview = (props) => {

    // const router = useRouter()
    const { id, product_picture_1, product_name, product_short_description, product_long_description, product_price, product_discount } = props.product
    return (
        <>
            <ProductInfo>
                <img src="/drips-dark.svg" style={{position: 'absolute', width: 500, top: 0, right: 0, opacity: 0.8, zIndex: 1}}/>
                <ProductFrame style={{marginTop: 30}}>
                    <img src={product_picture_1 && `http://localhost:1337${product_picture_1.url}`}/>
                </ProductFrame>
                <ProductText>
                    <Heading1 style={{flex: 1}}>{product_name}</Heading1>
                    <Heading2 style={{flex: 1}}>{product_short_description}</Heading2>
                    <Paragraph style={{flex: 4}}>{product_long_description}</Paragraph>
                    <InlinePrices>
                    {product_discount > 0 &&
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', opacity: 0.4}}>
                        <Heading2>Original Price. </Heading2>
                        <Heading1>&pound;{(product_price).toFixed(2)}</Heading1>
                        </div>
                    }
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                    <Heading2>{product_discount > 0 ? 'Sale Price.' : 'Price.' }</Heading2>
                    <Heading1>&pound;{(product_price - (product_price * product_discount / 100)).toFixed(2)}</Heading1>
                    </div>
                    </InlinePrices>
                    <AnimatedButton text="More info" med 
                        style={{position: 'absolute', bottom: 20, right: 230, maxWidth: 30}}
                        handleClick={() => props.viewProduct(id)}
                    >
                        <Layers/>
                    </AnimatedButton>
                    {/* <Button med onClick={() => props.viewProduct(id)}
                        style={{position: 'absolute', bottom: 20, right: 190}}
                    >
                       Info 
                    </Button> */}
                    <div style={{position: 'absolute', bottom: 20, right: 425}}>
                    <AddToCart  product={props.product} function="add"/>
                    </div>
                </ProductText>
            </ProductInfo>
        </>
    )
}

export default ProductPreview

const ProductInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const ProductText = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 220px;
    max-height: 600px;
    max-width: 550px;
    margin-right: 35px;
    margin-top: 50px;
    z-index: 2;
`

const InlinePrices = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 550px;
`