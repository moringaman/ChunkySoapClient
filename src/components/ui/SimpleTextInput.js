import React from 'react' 
import { Paragraph } from '../../styles/typography'
import { TextInput } from '../../styles/ui'
import { AnimatedButton } from '../ui'

const SimpleTextInput = ({handleChange, label, withButton, buttonText, cols, direction,...rest }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: cols }}>
            <Paragraph style={{marginLeft: 10}}>
                {label}
            </Paragraph>
            <TextInput {...rest} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")} />
            { withButton && <AnimatedButton big text={buttonText} style={{position: 'absolute', display: 'block', transform: 'translate(280px, 60px)', right: 300 }}/> }
        </div>
    )
}


export default SimpleTextInput