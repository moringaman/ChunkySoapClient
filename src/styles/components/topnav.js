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
    ${props => props.viewPort  < 961 && css`
    width: 50%;
    margin: 0px 0px 0px 10px;
    ` }
    ${props => /product|checkout/.test(props.location) && css` 
        background-color: ${vars.palette.primaryColor};
    `}
    ${props => /checkout/.test(props.location) && css` 
        margin-top: -100px;
    `}
    
    
`
export const NavList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    width: 100%;
    ${props => props.viewPort  < 961 && css`
    width: 80%;
    margin: 0px 0px 0px 10px;
    justify-content: flex-end;
    ` }
    li.hamburger {
        ${props => props.viewPort  > 961 && css`
            visibility: hidden;
        ` }
    }
    li.temp {
        ${props => props.viewPort  < 961 && css`
            display: none;
        ` }
    }
    li > a {
        text-decoration: none;
        color: ${vars.palette.darkfont};
    }

    .active {
        color: red;
    }

`

export default TopNav