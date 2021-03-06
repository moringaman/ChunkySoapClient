import styled, { css } from 'styled-components'
import * as vars from '../variables'

const TopNav = styled.div`
    width: 80%;
    margin: 0px auto;
    height: 90px;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    ${props => /product|checkout/.test(props.location) && ` 
        background-color: ${vars.palette.primaryColor};
    `}
    ${props => /checkout/.test(props.location) && ` 
        margin-top: -100px;
    `}
    
    
`
export const NavList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    width: 70%;

    li > a {
        text-decoration: none;
        color: ${vars.palette.darkfont};
    }

    .active {
        color: red;
    }

`

export default TopNav