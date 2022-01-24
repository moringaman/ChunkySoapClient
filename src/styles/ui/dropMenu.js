import styled, { css } from 'styled-components'
import * as vars from '../variables'

export const CategoryMenu = styled.div`
    max-width: 400px;
    ${'' /* height: 100px; */}
    ${'' /* background-color: white; */}
    background-color: ${vars.palette.secondayColor};
    z-index: 3000;
    position: absolute;
    top: 60px;
    border-radius: 20px;
    box-shadow: 4px 4px 12px rgba(0,0,0, 0.2);
    transform: translateX(-150px);
    color: white;
    padding: 20px 20px;
    & ul {
        list-style: none;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        max-width: 90%;
        justify-content: space-between;
        flex-flow: wrap;
    }

    & ul > li {
        font-size: 24px;
        margin-top: 10px;
        margin-right: 10px;
    }
`
export const Pointer = styled.div`
    width: 20px;
    height: 20px;
    z-index: 2000;
    ${'' /* background-color: white; */}
    background-color: ${vars.palette.secondayColor};
    margin-left: 53%;
    margin-top: -25px;
    transform: rotate(45deg);
`