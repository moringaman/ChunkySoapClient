import React, { useState } from 'react'
import { CategoryMenu, Pointer } from '../../styles/ui/dropMenu'
import PageLink from './PageLink'
import { Heading1, Heading2, Paragraph } from '../../styles/typography'

const DropDownMenu = (props) => {
    const { closeMenu, menuData, title } = props
    console.log('MENU DATA ', props)
    return (
        <>
        <CategoryMenu onMouseLeave={closeMenu}>
            <Pointer />
            <Heading2 light>
                {title}
            </Heading2>
        <ul>
            {menuData && menuData.map((el, i) => 
                <li key={i}>
                    <PageLink color="dark" to={`/category:${el.id}`}>
                        {el.name}<>{el.product_name}</>
                    </PageLink>
                </li>
            )}
        </ul>
        </CategoryMenu>
        </>
    )
}

DropDownMenu.defaultProps = {
    closeMenu: () => {},
    menuData: [],
    title: 'menu'
}

export default DropDownMenu