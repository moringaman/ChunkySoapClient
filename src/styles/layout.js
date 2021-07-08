import styled, { css } from 'styled-components'
import * as vars from './variables'

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  overflowX: hidden;
  position: relative;
  ${props => props.location && /product|checkout/.test(props.location) && (props.nav === true)  && css`
        max-width: 100%;
        background-color: ${vars.palette.primaryColor};
        `
}
`
export const Section = styled.div`
    max-width: 100%;
    background-color: ${vars.palette.primaryColor};
    min-height: 0px;
    padding: 50px 50px 50px 50px;
    overflowX: hidden;
    z-index: -1;
    ${props => props.narrow && css`
        padding: 0px 50px 50px 50px;
        `}
    ${props => props.height && css`
      height: ${props.height}px;
    `}
    ${props => props.dark && css`
      background-color: ${vars.palette.primaryColor};
    `}
    ${props => props.light && css`
      background-color: white;
    `}
    overflow: hidden;
`

export const Wrapper = styled.div`
    max-width: 1294px;
    margin: 0px auto;
    overflow: hidden;
    ${props => props.width && css`
        max-Width: ${props.width}px;
    `}
    ${props => props.mt && css`
    margin-top: ${props.mt}px;
    `}
`

export const Hero = styled.div`
    width: 100%;
    height: 800px;
    color: white;
    overflow: hidden;
    background-color: ${vars.palette.primaryColor};
`

export const SlideGrid = styled.div`
    position: relative;
    max-width: 1294px;
    margin: 0px auto;
    padding: 140px 100px 90px 100px;
    background-color: white;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    overflowX: hidden;
    z-index: 2;
    background-color: transparent;
    ${props => props.dark && `
        background-color: ${vars.palette.primaryColor};
    `}
    ${props => props.mb && `
        margin-bottom: ${props.mb};
    `}
`

export const Frame = styled.div`
    margin: 150px auto 50px auto;
    max-width: 650px;
    padding: 40px 50px;
    border: 1px solid #DBDBDB;
    border-radius: 25px;
    min-height: 320px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
export const FrameHeader = styled.div`
        padding: 30px 0px;
        flex: 1;
`

export const FrameBody = styled.div`
    flex: 6;
`

export const FrameFooter = styled.div`
    flex: 0.5;
    height: 70px;
    ${'' /* border-top: 1px gray solid; */}
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 20px 0px;
    border-top: 1px solid ${vars.palette.colorGray7};
`
export const ButtonRow = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    float: right;
    width: 100%;
`
export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${vars.palette.colorGray7};
    ${props => props.mb && css`
        margin-bottom: ${props.mb};
    `}
`

export const Invoice = styled.div`
     width: 591px;
     height: 538px;
     padding: 4px;
     display: grid;
     grid-template-columns: 1fr 1fr 1fr 1fr;
     grid-template-rows: 0.3fr 1.6fr 0.6fr 1fr;
     gap: 0px 0px;
     grid-template-areas:
    "Logo Logo Address Address"
    "Product_name Product_name product_qty product_total"
    "footer footer footer footer";
`

export const Logo = styled.div`
                    grid-area: Logo;
                    display: flex;
                    flex-direction: row;
                    padding: 0px 20px;
                    border-bottom: 1px solid #333;
                    `
export const Address = styled.div`
                grid-area: Address;
                padding: 20px;
                border-bottom: 1px solid #333;
                `

export const ProductName = styled.div` padding: 50px 20px; grid-area: Product_name`
export const ProductQty = styled.div`grid-area: product_qty; padding: 50px 20px;`
export const ProductTotal = styled.div` grid-area: product_total; padding: 50px 20px;`
export const Footer = styled.div` grid-area: footer;
                border-top: 1px solid #333;
                padding: 20px;
`
export const FooterTotal = styled.div` grid-area: 3 / 4 / 4 / 5; padding: 20px 20px; `