import React from 'react' 
import { TextInput } from '../../styles/ui'

const SimpleTextInput = (props) => {
    return (
        <>
        <TextInput {...props} onChange={(e) => props.handleChange(e)} onFocus={() => console.log("focussed")}/>
        </>
    )
}


export default SimpleTextInput