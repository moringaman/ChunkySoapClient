import React from 'react'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../../styles/typography'
import { Container , Section, Wrapper} from '../../styles/layout'
import * as vars from '../../styles/variables'
import { Bubble } from '../../styles/ui'
import { Hero } from '../'

const withHero = ({component: Component}) => {
    return class Returned extends React.Component {
        render() {
            return (
                <React.Fragment>
                    <Hero {...this.props}/>
                    <Component {...this.props}/> 
                </React.Fragment>
            )
        }
    }
} 

export default withHero