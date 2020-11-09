import React from 'react'
import { Section } from '../styles/layout'

const Footer = () => {
    return (
        <>
        <Section height={600}>
            <img src="/drips.png" alt="drips" style={{float: 'right', width: '500px', transform: 'translate(50px, -50px)'}}/>
            Footer
        </Section>
        <Section light height={10}></Section>
        </>
    )
}

export default Footer