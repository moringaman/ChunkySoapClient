import styled, { css } from 'styled-components'
import * as vars from './variables'

export const Container = styled.div`
  width: 100%;
  max-width: 1480px;
  margin-left: auto;
  margin-right: auto;
`
export const Section = styled.div`
    max-width: 100%;
    background-color: ${vars.palette.primaryColor};
    padding: 50px 50px;
    max-height: 250px;
    ${props => props.height && css`
      max-height: ${props.height}px;
    `}
    ${props => props.dark && css`
      background-color: ${vars.palette.primaryColor};
    `}
    ${props => props.light && css`
      background-color: white;
    `}
    overflow: hidden;
`
export const Hero = styled.div`
    width: 100%;
    height: 800px;
    color: white;
    overflow: hidden;
    background-color: ${vars.palette.primaryColor};
`

export const SlideGrid = styled.div`
    max-width: 100%;
    ${'' /* height: 400px; */}
    padding: 140px 100px 50px 100px;
    background-color: white;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`