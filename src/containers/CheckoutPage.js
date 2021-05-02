import React, { useEffect, useState, useReducer } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Container , Section, Wrapper} from '../styles/layout'
import { WxStep, SimpleTextInput } from '../components/ui'
import { checkoutReducer, CheckoutSteps } from '../components'
import { ProductFrame, Bubble, Step } from '../styles/ui'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../styles/typography'
import { BasketWrapper, ProductRow, Divider } from '../styles/ui/basket'
import * as vars from '../styles/variables'
import * as fn from '../helpers/functions'

const CheckoutPage = () => {
// do logged in check
    const { basket } = useSelector(state => state.basket)
    const [ total, setTotal ] = useState(0)
    const [ postage, setPostage ] = useState(0.00)

    const initialState = {
        step: 1
    }

    const [cartState, cartDispatch] = useReducer(checkoutReducer, initialState)

    useEffect(() => {
        if (fn.getCartTotal(basket.products) < 25 || basket.postage > 4 ) {
            console.log("BASKET POSTAGE ", basket.postage)
            setPostage(basket.postage || 0.00)
        } else {
            setPostage(0)
        }
        setTotal(fn.getCartTotal(basket.products, postage))
    }, [basket])

    useEffect(() => {
        setTotal(fn.getCartTotal(basket.products, postage))
    }, [postage])

    // const handleChange = (e) => {
    //     console.log("EVENT ", e.target.value, e.target.name)
    // }

    const steps = [
        {no: 1, label: 'Account'},   
        {no: 2, label: 'Shipping'},   
        {no: 3, label: 'Payment'},   
        {no: 4, label: 'Success'},   
    ]
    return (
        <>
            <img src="/drips-dark.svg" style={{ position: 'absolute', right: 0, top: 0, width: 500, zIndex: 0 }}/>
        <Section light height={1500}>
            <Container>
                    <Heading1>Checkout</Heading1>
                <CheckoutWrapper>
                    <CheckoutActions>
                        <CheckoutSteps />
                    </CheckoutActions>
                    <BasketSection style={{borderLeft: '1px solid #D8D8D8'}}>
                <BasketWrapper style={{transform: 'translateY(-120px)'}}>
                <ProductRow>
                    <Heading2 style={{flex: 3}}>Your Basket</Heading2>
                </ProductRow>
                <div style={{maxHeight: 700 }}>

                    {basket.products.length > 0 ?  basket.products.map(el => 
                        
                        <ProductRow key={el._id}>
                        <Paragraph style={{flex: 1}} big>
                            {el.product_qty} x
                        </Paragraph>
                            <ProductFrame sml style={{flex: 1, marginRight: 20}} >
                                <img src={`${process.env.RAZZLE_API_URI}${el.product_picture_1}`} 
                                style={{display: 'block', maxHeight: '70px', maxWidth: '70px', width: 'auto', height: 'auto'}}
                                />
                                {/* <img src={`http://localhost:1337${el.product_picture_1}`} 
                                style={{display: 'block', maxHeight: '70px', maxWidth: '70px', width: 'auto', height: 'auto'}}
                                /> */}
                            </ProductFrame>
                            <div style={{flex: 3, paddingRight: 20}}>
                            <Paragraph>
                                {el.product_name}
                            </Paragraph>
                            </div>
                            <div style={{flex: 1, marginRight: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                                <Paragraph>
                                    &pound;{el.total_price.toFixed(2)}
                                </Paragraph>
                                {/* <Trash2 size={32} color="#837D7D" style={{transform: 'translateX(20px)'}}/> */}
                            </div>
                        </ProductRow>
                    ) :  <Heading2>You Dont Have any Items in you basket yet</Heading2>
                    }
                </div>
                    <ProductRow>
                        <Divider />
                    </ProductRow>
                    <ProductRow narrow>
                            <SimpleTextInput withButton buttonText="Apply" label="Redeem Coupon / Discount Code" type="text" placeholder="COUPON CODE" handleChange={() => {}}/>
                    </ProductRow>
                    <ProductRow narrow>
                            Subtotal. &pound; {fn.getCartTotal(basket.products).toFixed(2) }
                    </ProductRow>
                    <ProductRow narrow>
                            Postage. &pound;{postage.toFixed(2)}
                    </ProductRow>
                    <ProductRow narrow>
                            Sales Tax. &pound; {0.00.toFixed(2)}
                    </ProductRow>
                    <ProductRow >
                        <Heading1>
                            Total. &pound;{total.toFixed(2)}
                        </Heading1>
                    </ProductRow>
                </BasketWrapper>
                    </BasketSection>
                </CheckoutWrapper>
            </Container>
        </Section>
        </>
    )
}

export default CheckoutPage

const CheckoutWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1394px;
    margin: 50px auto;
`

const CheckoutActions = styled.div`
    width: 50%;
    min-width: 700px;
    flex: 2;
    padding: 0px;
    margin: 0px 10px 20px 10px;   
`
const BasketSection = styled.div`
    flex: 1.3;
    ${'' /* border: 1px solid gray; */}
    min-width: 450px;
    min-height: 800px;
    margin-top: 40px;
    padding: 20px 10px;
       &::-webkit-scrollbar {
        display: none;
        }
`
const Steps = styled.div`
  position: absolute;
   min-width: 750px;
   margin-top: 10px;
   ${'' /* right: 40%; */}
   left: 12%;
   text-align: center;
`