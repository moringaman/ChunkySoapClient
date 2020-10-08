import styled, { css } from 'styled-components'
import * as vars from '../variables'

const TextInput = styled.input`
    height: 35px;
    min-width: 200px;
    border: none;
    border-radius: 25px;
    background-color: ${vars.palette.colorGray6};
    display: inline-block;
    color: white;
    padding: 0px 20px;
`

export default TextInput