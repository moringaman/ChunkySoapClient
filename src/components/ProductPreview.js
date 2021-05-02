import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Layers } from 'react-feather'
import { LinkButton } from '../styles/ui'
import AddToCart from '../components/ui/AddToCartBtn'
import AnimatedButton from '../components/ui/AnimatedButton'
import ProductFrame from '../styles/ui/productFrame'
import { ButtonRow } from '../styles/layout'
import { Heading1, Heading2, Heading3, Paragraph } from '../styles/typography'
import * as fn from '../helpers/functions'

const ProductPreview = (props) => {

    const history = useHistory()

    const { basket } = useSelector(state => state.basket)

    useEffect(() => {
        console.log("PREVEW BASKET", basket.products)
    }, [basket])
    // const router = useRouter()
    const { id, product_picture_1, product_name, product_short_description, product_long_description, product_price, product_discount } = props.product
    return (
        <>
            <ProductInfo>
                <img src="/drips-dark.svg" style={{position: 'absolute', width: 500, top: 0, right: 0, opacity: 0.8, zIndex: 1}}/>
                <ProductFrame style={{marginTop: 30}}>
                    <img src={product_picture_1 && `${process.env.RAZZLE_API_URI}${product_picture_1.url}`}/>
                </ProductFrame>
                <ProductText>
                    <Heading1 style={{flex: 1}}>{product_name}</Heading1>
                    <Heading3 style={{flex: 1}}>{product_short_description}</Heading3>
                    <Paragraph style={{flex: 4}}>{fn.createExcerpt(product_long_description, 100)}
                    <LinkButton onClick={() => props.viewProduct(id)}> More info</LinkButton>
                    </Paragraph>
                    <InlinePrices>
                    {product_discount > 0 &&
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', opacity: 0.4}}>
                        <Heading3>Original Price. </Heading3>
                        <Heading1>&pound;{(product_price).toFixed(2)}</Heading1>
                        </div>
                    }
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                    <Heading3>{product_discount > 0 ? 'Sale Price.' : 'Price.' }</Heading3>
                    <Heading1>&pound;{(product_price - (product_price * product_discount / 100)).toFixed(2)}</Heading1>
                    </div>
                    </InlinePrices>
                    <ButtonRow >
                        <AddToCart  product={props.product} function="add"/>
                        {  basket.products.length > 0  &&
                            <AnimatedButton tertiary fixed text="View Basket" med 
                                handleClick={() => history.push('/basket')}
                            >
                                <Layers/>
                            </AnimatedButton>
                        }
                        <AnimatedButton text="More info" med 
                            handleClick={() => props.viewProduct(id)}
                        >
                            <Layers/>
                        </AnimatedButton>
                    </ButtonRow>
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
    min-height: 400px;
`
const ProductText = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 220px;
    max-height: 600px;>
    max-width: 550px;
    margin: 0px 25px 0px 40px;
    margin-top: 50px;
    z-index: 2;
`

const InlinePrices = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 600px;
`