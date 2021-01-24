import styled, { css } from 'styled-components'
import * as vars from './variables'

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  overflowX: hidden;
  position: relative;
  ${props => props.location && (props.location.includes('product') && props.nav === true)  && css`
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
    overflow: hidden;
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
    max-width: 1294px;
    margin: 0px auto;
    padding: 140px 100px 50px 100px;
    background-color: white;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    overflow: hidden;
`

export const Frame = styled.div`
    margin: 80px auto 50px auto;
    max-width: 650px;
    padding: 20px 50px;
    ${'' /* border: 1px solid #DBDBDB; */}
    border-radius: 25px;
    min-height: 320px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
export const FrameHeader = styled.div`
        padding: 40px 0px;
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