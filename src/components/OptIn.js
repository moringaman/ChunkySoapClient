import React, { useState, useEffect } from 'react'
import { SimpleTextInput } from './ui'
import { Container, Wrapper, Section} from '../styles/layout'

const OptIn = (props) => {
    return (
        <Section light narrow height={props.height}>
            <Wrapper width={850} mt={40}>
                <SimpleTextInput
                    big
                    handleChange={props.handleChange}
                    submitHandler={props.handleSubmit}
                    withBigButton 
                    value={props.searchValue}
                    valid={props.valid}
                    buttonText= {props.btnText}
                    label={props.label}
                    type="text"
                    placeholder={props.placeholder}
                />
            </Wrapper>
        </Section>
    )
}

OptIn.defaultProps = {
   btnText: 'Button Text',
   height: 200,
   placeholder: "pass placeholder prop",
   handleChange: () => {},
   submitHandler: () => {}
}

export default OptIn