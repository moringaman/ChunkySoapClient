import React from 'react' 
import { Paragraph } from '../../styles/typography'
import { TextInput } from '../../styles/ui'
import { AnimatedButton } from '../ui'
// import WxButton from "../styles/components/button";

const SimpleTextInput = ({withBigButton, submitHandler, handleChange, label, withButton, buttonText, cols, direction, value, valid,...rest }) => {
    return (
        <>
        { withButton && 
        <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
            <Paragraph  big style={{marginLeft: 10}}>
                {label}
            </Paragraph>
            <div style={{display: 'flex', flexDirection: 'row'  }}>
                <TextInput inline {...rest} valid={valid} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")}  />
                 <AnimatedButton primary big text={buttonText} handleClick={submitHandler} style={{ width: 100, display: 'inline-block' , transform: 'translateX(-60px)'}}/> 
            </div>
        </div>
        }
        {
            withBigButton &&
        <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
            <Paragraph  big style={{marginRight: 10, textAlign: 'center'}}>
                {label}
            </Paragraph>
            <div style={{display: 'flex', flexDirection: 'row'  }}>
                <TextInput inline {...rest} valid={valid} value={value} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")}  />
                 <AnimatedButton primary big xl styled handleClick={submitHandler} style={{ width: 100, display: 'inline-block' , transform: 'translateX(-60px)'}}> 
                 <div className="script-font"> {buttonText}</div>
                 </AnimatedButton>
            </div>
        </div>
        }
        {
         !withButton && !withBigButton &&
            <div style={{display: 'flex', flexDirection: 'column',  width: cols }}>
                <Paragraph style={{marginLeft: 10}}>
                    {label}
                </Paragraph>
                <TextInput {...rest} value={value} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")}  />
            </div>
        }
        </>
    )
}

SimpleTextInput.defaultProps = {
    withButton: false,
    withBigButton: false,
    value: ''
}


export default SimpleTextInput