import React, { useEffect, useState, useReducer } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Container , Section} from '../styles/layout'
import { WxStep, SimpleTextInput } from '../components/ui'
import { checkoutReducer, CheckoutSteps } from './'
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

    console.log("CART STATE " , cartState)
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

    const handleChange = (e) => {
        console.log("EVENT ", e.target.value, e.target.name)
    }

    const steps = [
        {no: 1, label: 'Account'},   
        {no: 2, label: 'Shipping'},   
        {no: 3, label: 'Payment'},   
        {no: 4, label: 'Success'},   
    ]
    return (
        <>
        <Section dark height={180}>
            {vars.headerBubbles.map((b, i) => (
            <Bubble {...b} key={i} />
            ))}
                <img src="/drips.png" alt="drips" style={{float: 'right', width: '500px', transform: 'translate(50px, -70px)', zIndex: '5'}}/>
            <Container>
                <BannerHeading style={{maxWidth: 550, transform: 'translateY(-50px)' }}>
                    We offer FREE delivery on all orders over &pound;25
                </BannerHeading>
            </Container>
            <img src="/oversholder.webp" alt="girl-pic" style={{position: 'absolute', top: 31, left: 560, maxHeight: 320}}/>
        </Section>
        <Section light height={1900}>
            <Container>
                <Heading1>Checkout</Heading1>
                <CheckoutWrapper>
                    <CheckoutActions>
                        <CheckoutSteps />
                        {/* <Steps>
                        { steps.map(step => 
                            <WxStep label={step.label} step={cartState.step} number={step.no} key={step.no}/>
                        )
                        }
                        </Steps> */}
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
                                <img src={`http://localhost:1337${el.product_picture_1}`} 
                                style={{display: 'block', maxHeight: '70px', maxWidth: '70px', width: 'auto', height: 'auto'}}
                                />
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
                            Subtotal: &pound; {fn.getCartTotal(basket.products).toFixed(2) }
                    </ProductRow>
                    <ProductRow narrow>
                            Postage: &pound;{postage.toFixed(2)}
                    </ProductRow>
                    <ProductRow narrow>
                            Sales Tax: &pound; {0.00.toFixed(2)}
                    </ProductRow>
                    <ProductRow narrow>
                        <Heading1>
                            Total: &pound;{total.toFixed(2)}
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
`

const CheckoutActions = styled.div`
    width: 50%;
    min-width: 700px;
    ${'' /* height: 800px; */}
    flex: 2;
    ${'' /* border: 1px solid gray; */}
    padding: 20px;
`
const BasketSection = styled.div`
    flex: 1.3;
    ${'' /* border: 1px solid gray; */}
    min-width: 350px;
    min-height: 800px;
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