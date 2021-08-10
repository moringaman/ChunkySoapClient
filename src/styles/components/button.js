import styled, { css } from 'styled-components'
import * as vars from '../variables'

const  WxButton = styled.button`
    transition: all 0.3s ease-out;
    position: relative;
    padding: 8px 25px;
    border-radius: 50px;
    background-color: ${vars.palette.colorGray10};
    border: none;
    color: white;
    font-weight: 400;
    cursor: pointer;
    z-index: 1000;
    overflow: hidden;
    margin: 0px 10px;
    ${props => props.width && css`
        width: props.width !important;
    `}
    & .button-content >* {
        font-weight: 400;
        font-size: 18px;
    }
    ${props => props.fixed && css`
        min-width: 190px;
        max-height: 42px;
        `}
    ${props => props.big && css`
        font-size: 28px;
        min-height: 50px;
        font-weight: 600;
        padding: 8px 50px;
        & .button-content {
            height: 70px;
            transition: all 0.1s ease-in;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transform: translateY(5px);
        }
        & .button-content >* {
            font-weight: 600;
            font-size: 20px;
        }
            &:hover {
                background-color: ${vars.palette.secondaryColor1};
            }

        &:hover .button-content {
            transform: translateY(-37px);
        }

        `}
        ${props => props.xl && css`
            min-height: 62px;
            min-width: 240px;
            border-radius: 0px 50px 50px 0px;
            padding: 5px 20px;
            transition: all 0.5s ease-in;
            &:hover {
                background-color: ${vars.palette.secondaryColor1};
            }
            &:hover .button-content {
                transform: translateY(5px);
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
        background-color: ${vars.palette.primaryColor};
    `}
    ${props => props.tertiary && css `
        background-color: ${vars.palette.tertiaryColor}
    `}
    ${'' /* &:hover .button-content {
        transition: all 0.1s ease-in-out;
    } */}
`


export default WxButton;