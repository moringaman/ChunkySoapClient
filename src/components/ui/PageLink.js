// import { useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import DropDownMenu from '../ui/DropDownMenu'
import * as vars from '../../styles/variables'

const PageLink = ({children, to, withMenu, menuData, menuTitle , color }) => {
    const [hovered, setHovered ] = useState(false)
    const [showMenu, setShowMenu ] = useState(false)
    const history = useHistory()
    const location = useLocation()


    const style = {
        fontWeight: 600,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: (location.pathname === to && location.pathname !== '/basket') || hovered === true 
        ? `${vars.palette.secondayColor}` 
        : 'black',
    }


    const altStyle = {
        color: (location.pathname === to && location.pathname !== '/basket') || hovered === true 
        ? `white` 
        : 'black',
    }

    const handleMouseOver = () => {
            setHovered(!hovered)
            if (withMenu) {
              setShowMenu(true)
            }
    }

    const handleClick = (e) => {
        e.preventDefault()
         history.push(to)
    }

    const closeMenu = () => {
        setShowMenu(false)
        console.log("COLSING")
    }

  return (
    <>
    {color === 'dark' ? 
      <a href={to} onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver} style={style, altStyle }>
        {children}
      </a>
    :
      <a href={to} onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver} style={style }>
        {children}
      </a>
    }
      {withMenu && showMenu === true ? 
        <DropDownMenu closeMenu={closeMenu} title={menuTitle} menuData={menuData}/> 
        : null
      }
    </>
  )
}

export default PageLink
