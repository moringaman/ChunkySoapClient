import React from 'react'
import { Container , Section} from '../styles/layout'
import { ProductFrame, Bubble } from '../styles/ui'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../styles/typography'
import * as vars from '../styles/variables'

const CheckoutPage = () => {
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
        <Section light height={800}>
            <Container>
                <Heading1>Secure Checkout</Heading1>
            </Container>
        </Section>
        </>
    )
}

export default CheckoutPage