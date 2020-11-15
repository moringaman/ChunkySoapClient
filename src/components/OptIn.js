import React, { useState, useEffect } from 'react'
import { SimpleTextInput } from './ui'
import { Container, Wrapper, Section} from '../styles/layout'

const OptIn = () => {
    return (
        <Section light height={350}>
            <Wrapper width={850} mt={80}>
                <SimpleTextInput 
                    withButton 
                    buttonText="Subscribe"
                    label="Subscribe to our newsletter to get chunky soaps' latest news and offers"
                    type="text"
                    placeholder="example@gmail.com"
                />
            </Wrapper>
        </Section>
    )
}

export default OptIn