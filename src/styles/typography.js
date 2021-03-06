import styled, { css } from 'styled-components';
import * as vars from './variables'

export const SectionHeading = styled.h1`
    text-align: center;
    padding-top: 40px;
    height: 45.2px;
    font-size: 48px;
    font-weight: 400;
    color: ${vars.palette.colorGray4};
    background-color: white;
    z-index: 21000;
    ${props => props.light && css`
        color: white;
        background-color: ${vars.palette.primaryColor};
        padding-top: 0px;
        height: 19px;
    `}
`

export const BannerHeading = styled.h1`
    margin-top: 50px;
    text-align: left;
    font-size: 58px;
    font-weight: 600;
    color: white;
    line-height: 100%;
`
export const BannerHeading2 = styled.h3`
    font-size: 32px;
    color: white;
    font-weight: 400;
    line-height: 200%;
`
export const Heading1 = styled.h1`
    font-size: 48.9px;
    font-weight: 600;
    margin-bottom: 5px;
    color: ${vars.palette.colorGray3};
    ${props => props.light && css`
        color: white;
    `}
`
export const Heading2 = styled.h2`
    font-size: 28.6px;
    ${'' /* line-height: 20px; */}
    font-weight: 400;
    margin-bottom: 5px;
    color: ${vars.palette.colorGray4};
    ${props => props.dark && css`
        color: ${vars.palette.colorGray1};
    ` }
`

export const Heading3 = styled.h1`
    font-size: 22.9px;
    font-weight: 600;
    margin-bottom: 5px;
    color: ${vars.palette.colorGray3};
    ${props => props.light && css`
        color: white;
    `}
`
export const SubHeading1 = styled.h3`
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 15px;
    color: ${vars.palette.colorGray6};
`

export const Paragraph = styled.p`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
    margin-top: 20px;
    font-style: italic;
    ${props => props.sml && `
        font-size: 16px;
        margin-bottom: 5px;
        margin-top: 5px;
    `}
    ${props => props.centered &&`
        text-align: center;
    `}
    color: ${vars.palette.colorGray3};
    ${props => props.big && css `
        font-size: 24px;
        color: ${vars.palette.colorGray4};
        font-weight: 600;
    `}
    ${props => props.danger && css`
            color: red;
    `}
    ${props => props.heavy&& css`
            font-weight: 600;
            margin-bottom: 10px;
    `}
`