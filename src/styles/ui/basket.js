import styled, { css } from 'styled-components'
import * as vars from '../variables'


export const ProductRow = styled.div`
    margin: 0px 20px;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    flex-gap: 10px; 
    ${props => props.narrow && css`
        padding: 10px 10%;
    `}
    ${'' /* border: 1px red solid; */}
`

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${vars.palette.colorGray7};
    ${props => props.mb && css`
        margin-bottom: ${props.mb};
    `}
`
export const BasketWrapper = styled.div`
    margin-top: 50px;
    margin-left: auto;
`