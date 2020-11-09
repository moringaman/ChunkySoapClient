import React from 'react' 
import { Paragraph } from '../../styles/typography'
import { TextInput } from '../../styles/ui'
import { AnimatedButton } from '../ui'

const SimpleTextInput = ({handleChange, label, withButton, buttonText, cols, direction,...rest }) => {
    return (
        <>
        { withButton ?
        <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
            <Paragraph  style={{marginLeft: 10}}>
                {label}
            </Paragraph>
            <div style={{display: 'flex', flexDirection: 'row'  }}>
                <TextInput inline {...rest} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")}  />
                 <AnimatedButton primary big text={buttonText} style={{ width: 100, display: 'inline-block' , transform: 'translateX(-60px)'}}/> 
            </div>
        </div>
            :
            <div style={{display: 'flex', flexDirection: 'column',  width: cols }}>
                <Paragraph style={{marginLeft: 10}}>
                    {label}
                </Paragraph>
                <TextInput {...rest} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")}  />
            </div>
        }
        </>
    )
}


export default SimpleTextInput