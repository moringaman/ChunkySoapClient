import styled, { css } from 'styled-components'
import * as vars from '../variables'

const TextInput = styled.input`
    height: 50px;
    max-width: 100%;
    display: inline-block;
    border: none;
    border-radius: 50px;
    background-color: ${vars.palette.colorGray8};
    color: ${vars.palette.colorGray4};
    padding: 0px 20px;
    margin: 0px 10px 10px 0px;
    ${props => props.inline && css`
        width: 100%;
    `}
    ${props => props.withButton && css`
        height: 50px
    `}
`

export default TextInput