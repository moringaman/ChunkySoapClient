import {useEffect, createRef, useState } from 'react'

const useDynamicRef = (itemArray, refPrefix) => {

    const [ refs, setRefs ] = useState([])

    useEffect(() => {
        let foo = []
        console.log('running')
        itemArray.length > 0 && itemArray.map((item, i) => {
           foo[`${refPrefix}_${i}`] = createRef()
        })
        setRefs([...refs, ...foo])
    }, [])

    console.log("RHOOK",  refs)
    return refs
}

export default useDynamicRef