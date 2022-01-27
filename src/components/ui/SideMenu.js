import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import { palette } from '../../styles/variables'
import { Logo } from '../../styles/logos'

const SideMenu = () => {

    const { showMenu } = useSelector((state) => state.ui)

    return (
        <SideMenuContainer show={showMenu}>
          <Logo ><img src="/logogray.png" style={{ position: 'absolute', width: 60, marginLeft: 25, top:25 }} /></Logo>
            <ul>
                <li>Creams</li>
                <li>Soaps</li>
                <li>Shampoos</li>
            </ul>
        </SideMenuContainer>
    )
}

export default SideMenu

const SideMenuContainer = styled.div`
padding: 150px 0px 150px 10px;
width: 100vw;
position: absolute;
top: -10px;
bottom: 0;
left: -120vw;
background-color: rgba(250,250,250, 1);
z-index: 1900;
transition: all 0.2s ease-in;
box-shadow: 20px 10px 8px rgba(0,0,0, 0.2);
font-size: 24px;
${props => props.show === true && css`
 left: 0px;
`}

& ul {
    list-style: none;
    font-size: 25px;
    margin-left: 40px;
}

& ul > li {
    color: ${palette.secondaryColor1}
    font-size: 1.5rem;
    margin-top: 10px;
}
`