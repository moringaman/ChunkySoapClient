import React from 'react'
import { withHero } from '../components/layout'

const CategoriesPage = props => {

    const { match: { params: { _id }}} = props

    console.log("CATEGORY PROPS ", props)
    return (
        <>
        <h1>
            Categories, { _id }
        </h1>
        </>
    )
}

export default withHero({component: CategoriesPage})