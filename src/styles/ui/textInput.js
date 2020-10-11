import styled, { css } from 'styled-components'
import * as vars from '../variables'

const TextInput = styled.input`
    height: 50px;
    min-width: 200px;
    ${'' /* max-width: 400px; */}
    border: none;
    border-radius: 50px;
    background-color: ${vars.palette.colorGray8};
    color: ${vars.palette.colorGray4};
    padding: 0px 20px;
    margin: 0px 0px 10px 0px;
    ${props => props.withButton && css`
        height: 42px
    `}
`

export default TextInput