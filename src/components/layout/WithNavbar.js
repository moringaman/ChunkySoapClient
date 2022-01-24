import React from 'react'
import Navbar from '../Navbar'
import { SideMenu } from '../ui'

const WithNavbar = (props) => {
    return (
        <>
        <SideMenu />
        <Navbar />
            {props.children}
        </>
    )
}

export default WithNavbar