import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch } from 'react-redux'
import Fuse from 'fuse.js'
import { OptIn } from '.'
import { myApi } from "../helpers";


const ProductSearch = props => {

    const [ searchTerm, setSearchTerm ] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()

    console.log("PROD SEARCH LOC :", history)

    const searchFilter = (products) => {
        const fuse = new Fuse(products, {
            keys: [
                'product_name',
                'product_long_description',
                'product_short_description'
            ],
            includeScore: true
        })
        const result = fuse.search(searchTerm.term)
        const filtered = result.filter(el => el.score < 0.6)
         .map(i => i.item)
        console.log("FILTERED: ", filtered)
        return filtered
    }

    useEffect(() => {
        // if on search page run everytimr chenges and don't redirect
        console.log("Search for: ", searchTerm)
    }, [searchTerm])

    const getData = async() => {
        console.log('pulling data from server ', searchTerm)
        let products = await myApi.send("/products", "GET", undefined, "public")
        // filter result accoring to search term
        const filtered = searchFilter(products)
        console.log("filtered results: ", filtered)
        // add result to search results state object
        dispatch({type: 'UPDATE_SEARCH', payload: filtered})
        // redirect to search results page
        setSearchTerm({})
        history.push('/search-results')
    }

    return (
          <OptIn 
            height={180}
            cols="100%" 
            valid={false}
            placeholder="type product name here"
            btnText="Search" 
            searchValue={searchTerm.term}
            label="Search our catalogue for your favorite products"
            handleChange={(e) => {setSearchTerm({...searchTerm, ['term']: e.target.value})}}
            handleSubmit={() => getData()}
            />
    )
}

export default ProductSearch