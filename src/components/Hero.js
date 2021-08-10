import React from 'react'
import { useHistory } from 'react-router'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../styles/typography'
import { Container , Section, Wrapper} from '../styles/layout'
import * as vars from '../styles/variables'
import { Bubble } from '../styles/ui'
import { useViewportCheck  } from '../hooks'

const Hero = props => {

    const history = useHistory()
    const { pathname } = history.location 
    const { viewport } = useViewportCheck()
    console.log("Location", pathname)

    return (
        <Section dark height={props.viewPort < 916 ? 100 : 180}>
            {vars.headerBubbles.map((b, i) => (
            <Bubble {...b} key={i} />
            ))}
                <img src="/drips.png" alt="drips" style={{float: 'right', width: '500px', transform: 'translate(50px, -70px)', zIndex: '5'}}/>
            <Container>
                <BannerHeading style={{maxWidth: 550, transform: 'translateY(-50px)'}}>
                    We offer FREE delivery on all orders over &pound;25
                </BannerHeading>
            </Container>
            <img src="/oversholder.webp" alt="girl-pic" style={{position: 'absolute', top: 50, left: viewport < 747 ? 0 : 560, maxHeight: 320, zIndex: '4000'}}/>
        </Section>
    )
}

export default Hero