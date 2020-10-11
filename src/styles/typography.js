import styled, { css } from 'styled-components';
import * as vars from './variables'

export const SectionHeading = styled.h1`
    text-align: center;
    padding-top: 80px;
    height: 45.2px;
    font-size: 36px;
    font-weight: 600;
    color: ${vars.palette.primaryColor1};
    background-color: white;
`

export const BannerHeading = styled.h1`
    margin-top: 50px;
    text-align: left;
    font-size: 63.9px;
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
    font-size: 31.9px;
    font-weight: 600;
    margin-bottom: 5px;
    color: ${vars.palette.colorGray2};
    ${props => props.light && css`
        color: white;
    `}
`
export const Heading2 = styled.h2`
    font-size: 22.6px;
    ${'' /* line-height: 20px; */}
    font-weight: 400;
    margin-bottom: 5px;
    color: ${vars.palette.colorGray2};
    ${props => props.dark && css`
        color: ${vars.palette.colorGray1};
    ` }
`

export const SubHeading1 = styled.h3`
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 15px;
    color: ${vars.palette.colorGray6.orGray3};
`

export const Paragraph = styled.p`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    margin-top: 20px;
    color: ${vars.palette.colorGray3};
    ${props => props.big && css `
        font-size: 22px;
        color: ${vars.palette.colorGray2};
    `}
`