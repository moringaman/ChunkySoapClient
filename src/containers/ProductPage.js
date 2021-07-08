import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {  MinusCircle, PlusCircle, CreditCard, ArrowLeft } from 'react-feather'
import { Heading1, Heading2, Heading3, Paragraph } from '../styles/typography'
import { Container, Section, Wrapper, ButtonRow} from '../styles/layout'
import { myApi } from '../helpers'
import ProductFrame from '../styles/ui/productFrame'
import AddToCart from '../components/ui/AddToCartBtn'
import AnimatedButton from '../components/ui/AnimatedButton'

 const ProductPage = (props) => {

    const { _id } = useParams()
    const  { currentProduct } =  useSelector(({ currentProduct:{ currentProduct} }) => ({ currentProduct}))
    const [ quantity, setQuantity ] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        apiCall()
    }, [_id])

    const apiCall = async() => {
        const res = await myApi.send(`/products?id=${_id}`, 'GET', undefined, 'public')
        console.log('Product page ', res)
        dispatch({type: 'FETCH_PRODUCT', payload: res[0]})
    }

    const decreaseQuantity = useCallback(() => {
         const newQuantity = quantity >= 2 ? quantity - 1 : quantity
         console.log(newQuantity)
         setQuantity(newQuantity)
    })

    const increaseQuantity = useCallback(() => {
        console.log("triggered")
        const newQuantity = quantity < 100 ? quantity + 1 : quantity
         console.log(newQuantity)
        setQuantity(newQuantity)
    })

    const { product_name, product_short_description, product_picture_1, product_long_description, product_price, product_discount } = currentProduct
    // const { formats: {thumbnail} } = product_picture_1
    return (
        <>
            <img src="/drips-dark.svg" style={{ position: 'absolute', right: 0, top: 70, width: 500, zIndex: 1 }}/>
        <Container>
            <Wrapper>
                <Section light height={1050} >
                    {
                        currentProduct &&
                        <>
                            <div style={{padding: '30px 0px 100px 0px', maxWidth: 800, zIndex: 1000, position: 'relative'}}>
                                <Heading1>{product_name}</Heading1>
                                <Heading2 light>{product_short_description}</Heading2>
                            </div>
                            <div style={{display: 'flex', flexDirection: "columm", paddingLeft: '200' , width: '100%', height: 700, zIndex: 2000, position: 'relative'}}>
                                <div id="leftside" style={{flex: 2, paddingLeft: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'right'}}>
                                    <ProductFrame >
                                        <img src={product_picture_1 && `${product_picture_1.formats.thumbnail.url}`} />
                                    </ProductFrame>
                                        <div style={{flex: 1, marginTop: 50}}>
                                            {product_discount > 0 &&
                                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', opacity: 0.4, justifyContent: 'flex-end'}}>
                                                <Heading3>Original Price. </Heading3>
                                                <Heading1> &pound;{(product_price).toFixed(2)}</Heading1>
                                                </div>
                                            }
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-end'}}>
                                            <Heading3>{product_discount > 0 ? 'Sale Price.' : 'Price.' }</Heading3>
                                            <Heading1> &pound;{(product_price - (product_price * product_discount / 100)).toFixed(2)}</Heading1>
                                            </div>
                                        </div>
                                        <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: "100%", margin: '10px 0px'}}>
                                            <Paragraph>Quantity</Paragraph>
                                          <SimpleButton onClick={() => decreaseQuantity()}>
                                              <MinusCircle color="pink" size={34}/>
                                          </SimpleButton> {quantity}
                                          <SimpleButton onClick={() => increaseQuantity()} >
                                           <PlusCircle color="pink" size={34}/>
                                          </SimpleButton>
                                        </div>
                                        <div style={{flex: 1}}>
                                            <AddToCart quantity={quantity} product={currentProduct} function="add" />
                                        </div>
                                </div>
                                <div id="rightside" style={{flex: 4, paddingLeft: 100, paddingRight: 100}}>
                                    <Heading2 dark>Product Description</Heading2>
                                        <div style={{minHeight: 540}}>
                                            <Paragraph>{product_long_description}</Paragraph>
                                        </div>
                                        <ButtonRow>
                                            <AnimatedButton  big text="Back"><ArrowLeft /></AnimatedButton>
                                            <AnimatedButton big primary text="View Basket" handleClick={() => history.push('/basket')}><CreditCard/></AnimatedButton>
                                        </ButtonRow>
                                </div>
                            </div>
                        </>
                    }
                </Section>
            </Wrapper>
        </Container>
        </>
    )
}

export default ProductPage

const SimpleButton = styled.button`
    background-color: transparent;
    border: transparent solid 1px;
    width: 50px;
    height: 50px;
`