import styled, { css } from 'styled-components'
import * as vars from '../variables'
import PageLink from '../../components/ui/PageLink'

const TopNav = styled.div`
    width: 100%;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
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