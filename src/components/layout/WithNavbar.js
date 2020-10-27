import React from 'react'
import Navbar from '../Navbar'

const WithNavbar = (props) => {
    return (
        <>
        <Navbar />
            {props.children}
        </>
    )
}

export default WithNavbar