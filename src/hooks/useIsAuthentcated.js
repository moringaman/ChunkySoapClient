import React, {useEffect, useState} from 'react'
import { auth } from '../helpers'

const useIsAuthenticated = () => {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  useEffect(() => {
      const authenticated = auth.getToken() !== null
      console.log("AUTH TOKEN HERE ", auth.getToken())
      if (authenticated === true) {
        //   dispatch({type})
      }
      setIsAuthenticated(authenticated)
  }, [])

    return {
        isAuthenticated
    }
}

export default useIsAuthenticated