import React from 'react' 
import { Paragraph } from '../../styles/typography'
import { TextInput } from '../../styles/ui'
import { AnimatedButton } from '../ui'
import Loader from 'react-loader-spinner'
// import WxButton from "../styles/components/button";

const SimpleTextInput = ({withBigButton, submitHandler, handleChange, label, withButton, buttonText, cols, direction, value, valid, loading,...rest }) => {
  const renderLoader = () => {
      return (
        <Loader
            type="ThreeDots"
            color="#FFFFFF"
            height={49}
            width={29}
            timeout={30000} //3 secs
        />
      )
  }

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
                <form onSubmit={(e) => {
                    e.preventDefault()
                    submitHandler()
                }}>
                    <div style={{display: 'flex', flexDirection: 'row'  }}>

                        <TextInput inline {...rest} valid={valid} value={value} withButton={withButton} onChange={(e) => handleChange(e)} onFocus={() => console.log("focussed")}  />
                        <AnimatedButton primary big xl styled type="submit" style={{ width: 100, display: 'inline-block' , transform: 'translateX(-60px)'}}> 
                        { loading === false ?
                             <div className="script-font"> {buttonText}</div>
                            : 
                                renderLoader()
                         } 
                        </AnimatedButton>
                    </div>
                </form>
        </div>
        }
        {
         !withButton && !withBigButton &&
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

SimpleTextInput.defaultProps = {
    withButton: false,
    withBigButton: false,
    value: '',
    loading: false
}


export default SimpleTextInput