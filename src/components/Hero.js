import React from 'react'
import { useHistory } from 'react-router'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../styles/typography'
import { Container , Section, Wrapper} from '../styles/layout'
import * as vars from '../styles/variables'
import { Bubble } from '../styles/ui'

const Hero = props => {

    const history = useHistory()
    const { pathname } = history.location 
    console.log("Location", pathname)

    return (
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
    )
}

export default Hero