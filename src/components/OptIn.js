import React, { useState, useEffect } from 'react'
import { SimpleTextInput } from './ui'
import { Container, Wrapper, Section} from '../styles/layout'

const OptIn = (props) => {
    return (
        <Section light narrow={!props.sm} mobile={props.sm} height={props.height}>
            <Wrapper width={ 850} mt={40}>
                <SimpleTextInput
                    big={!props.sm}
                    handleChange={props.handleChange}
                    submitHandler={props.handleSubmit}
                    withBigButton
                    loading={props.loading}
                    value={props.searchValue}
                    valid={props.valid}
                    buttonText={props.btnText}
                    label={props.label}
                    type="text"
                    placeholder={props.placeholder}
                    withButton={props.sm}
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