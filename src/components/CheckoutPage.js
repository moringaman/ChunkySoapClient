import React, { useEffect } from 'react'
import { useSelector, useReducer } from 'react-redux'
import styled from 'styled-components'
import { Container , Section} from '../styles/layout'
import { WxStep } from '../components/ui'
import { ProductFrame, Bubble, Step } from '../styles/ui'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../styles/typography'
import { BasketWrapper, ProductRow, Divider } from '../styles/ui/basket'
import * as vars from '../styles/variables'

const CheckoutPage = () => {
// do logged in check
    const { basket } = useSelector(state => state.basket)

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
        <Section light height={1300}>
            <Container>
                <Heading1>Secure Checkout</Heading1>
                <CheckoutWrapper>
                    <CheckoutActions>
                        <Steps>
                            <WxStep label='Account' step='Account'start/>
                            <WxStep label='Shipping'/>
                            <WxStep label='Payment'/>
                            <WxStep label='Sucess'/>
                        </Steps>
                    </CheckoutActions>
                    <BasketSection>
                        Basket
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
    min-width: 500px;
    height: 800px;
    flex: 2;
    border: 1px solid gray;
    padding: 20px;
`
const BasketSection = styled.div`
    flex: 1;
    border: 1px solid gray;
    min-width: 300px;
    min-height: 800px;
    padding: 20px;
`
const Steps = styled.div`
    display: flex:
    flex-direction: row;
    justify-content: space-around;
`