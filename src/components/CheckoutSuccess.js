import React from 'react'
import { AnimatedButton } from './ui'
import { Frame, FrameHeader, FrameBody, FrameFooter, Divider, ButtonRow } from '../styles/layout'
import { SubHeading1, Paragraph } from '../styles/typography'

const CheckoutSuccess = ({cartState}) => {

    // const {  }

    return (
        <Frame>
            <FrameHeader>
               <SubHeading1>
                    Congratulations!!
               </SubHeading1> 
                    <Divider />
            </FrameHeader>
            <FrameBody>
                <Paragraph>
                    Thankyou for shopping with the Chunky Soap Company
                </Paragraph>
                <Paragraph>
                    Your order has been successfully processed & a confirmation email
                    has been sent to your registered email address
                </Paragraph>
            </FrameBody>
            <FrameFooter>
                <ButtonRow>
                    {
                        cartState.authenticated && 
                        <AnimatedButton big secondary text="My Account"></AnimatedButton>
                    }
                    <AnimatedButton big text="Logout"></AnimatedButton>
                </ButtonRow>
            </FrameFooter>
        </Frame>
    )
}

export default CheckoutSuccess