import React, { useState, useEffect} from 'react'
import {useDispatch } from 'redux'
import { OptIn } from '.'
import { myApi } from "../helpers";


const ProductSearch = props => {

    const [ searchTerm, setSearchTerm ] = useState({})

    useEffect(() => {
        console.log("Search for: ", searchTerm)
    }, [searchTerm])

    const getData = async() => {
        console.log('pulling data from server ', searchTerm)
        let results = await myApi.send("/products", "GET", undefined, "public")
        // filter result accoring to search term
        // add result to search results state object
        // redirect to search results page
        setSearchTerm({})
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