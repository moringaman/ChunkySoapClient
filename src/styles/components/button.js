import styled, { css } from 'styled-components'
import * as vars from '../variables'

const  WxButton = styled.button`
    padding: 8px 25px;
    border-radius: 50px;
    background-color: ${vars.palette.primaryColor};
    border: none;
    color: white;
    font-weight: 400;
    cursor: pointer;
    z-index: 200;
    overflow: hidden;
    margin: 0px 10px;
    & .button-content >* {
        font-weight: 400;
        font-size: 18px;
    }
    ${props => props.fixed && css`
        min-width: 180px;
        max-height: 42px;
        `}
    ${props => props.big && css`
        font-size: 28px;
        font-weight: 600;
        & .button-content {
            height: 70px;
            transition: all 0.1s ease-in;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transform: translateY(2px);
        }
        & .button-content >* {
            font-weight: 600;
            font-size: 20px;
        }

        &:hover .button-content {
            transform: translateY(-37px);
        }

        `}
    ${props => props.med && css`
        font-size: 24px;
        font-weight: 500;
        & .button-content {
            height: 70px;
            transition: all 0.1s ease-in;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transform: translateY(1px);
        }
        & .button-content >* {
            font-weight: 600;
            font-size: 20px;
        }

        &:hover .button-content {
            transform: translateY(-39px);
        }
        `}
    ${props => props.sml && css`
        font-size: 18px;
        font-weight: 400;
        & .button-content {
            height: 70px;
            transition: all 0.1s ease-in;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transform: translateY(3px);
        }
        & .button-content >* {
            font-weight: 400;
            font-size: 18px;
        }

        &:hover .button-content {
            transform: translateY(-39px);
        }
        `}
    ${props => props.disabled && css`
        opacity: 0.3;
        `}
    ${props => props.primary && css`
        background-color: ${vars.palette.secondayColor}
    `}
    ${props => props.secondary && css`
        background-color: ${vars.palette.colorGray5};
    `}
    ${props => props.tertiary && css `
        background-color: ${vars.palette.tertiaryColor}
    `}
    ${'' /* &:hover .button-content {
        transition: all 0.1s ease-in-out;
    } */}
`

export default WxButton;