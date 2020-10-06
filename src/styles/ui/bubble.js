import styled, { css } from 'styled-components'
import * as vars from '../../styles/variables'

const Bubble = styled.div`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: white;
    opacity: 0.5;
    position: absolute;
    z-index: 6;
    ${props => props.dark && css`
        background-color: ${vars.palette.primaryColor1};
        ${'' /* background-color: red; */}
    `}
    ${props => props.t && css`
        top: ${props.t}px;
    `}
    ${props => props.y && css`
        transform: translateY(${props.y});
    `}
    ${props => props.x && css`
        transform: translateX(${props.x}px);
    `}
    ${props => props.opac && css`
        opacity: ${props.opac};
    `}
    ${props => props.size && css`
        width: ${props.size}px;
        height: ${props.size}px;
    `}
`

export default Bubble
