import React from 'react' 
import { Paragraph } from '../../styles/typography'
import { TextInput } from '../../styles/ui'
import { AnimatedButton } from '../ui'

const SimpleTextInput = ({handleChange, label, withButton, buttonText, ...rest }) => {
    return (
        <>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Paragraph>
                {label}
            </Paragraph>
            <div style={{display: 'flex'}}>
            <TextInput {...rest} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")}/>
            { withButton && <AnimatedButton big text={buttonText} style={{marginLeft: -80}} /> }
            </div>
        </div>
        </>
    )
}


export default SimpleTextInput