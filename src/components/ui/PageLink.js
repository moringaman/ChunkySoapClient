// import { useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import DropDownMenu from '../ui/DropDownMenu'
import  * as fn  from '../../helpers/functions'
import * as vars from '../../styles/variables'

const PageLink = ({children, to, withMenu, menuData, menuTitle , color, display }) => {
    const [hovered, setHovered ] = useState(false)
    const [showMenu, setShowMenu ] = useState(false)
    const history = useHistory()
    const location = useLocation()

    console.log("ROUTING", "Location: ", location, "History: ", history)

    const style = {
        fontWeight: 600,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: (fn.pathMatches(location.pathname) === to && location.pathname !== '/basket') || hovered === true 
        ? `${vars.palette.secondayColor}` 
        : 'black',
    }


    const altStyle = {
        color: (location.pathname.includes(to) && location.pathname !== '/basket') || hovered === true 
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
        !display && history.push(to)
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
