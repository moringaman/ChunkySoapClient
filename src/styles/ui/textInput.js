import styled, { css } from 'styled-components'
import * as vars from '../variables'

const TextInput = styled.input`
    height: 50px;
    max-width: 100%;
    display: inline-block;
    border: none;
    border-radius: 50px;
    z-index: 1000;
    background-color: ${vars.palette.colorGray8};
    color: ${vars.palette.colorGray4};
    padding: 0px 50px;
    margin: 0px 5px 10px 0px;
    ${props => props.inline && css`
        width: 100%; 
    `}
    ${props => props.withButton && css`
        height: 50px;
    `}
    ${props => props.valid === false && css`
        height: 48px;
        color: orange;
    `}
    ${props => props.big && css `
        height: 62px;
        font-size: 28px;
        ::placeholder {
            color: ${vars.palette.colorGray10};
        }
    `} 
`

export default TextInput