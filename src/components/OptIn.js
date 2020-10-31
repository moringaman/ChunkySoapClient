import React, { useState, useEffect } from 'react'
import { SimpleTextInput } from './ui'
import { Container, Wrapper, Section} from '../styles/layout'

const OptIn = () => {
    return (
        <Section light>
            <Wrapper width={850}>
                <SimpleTextInput 
                    withButton 
                    buttonText="Subscribe"
                    label="Subscribe to our news letter to receive emails about our latest news and offers"
                    type="text"
                    placeholder="example@gmail.com"
                />
            </Wrapper>
        </Section>
    )
}

export default OptIn