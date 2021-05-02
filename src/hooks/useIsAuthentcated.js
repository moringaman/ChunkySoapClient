import React, {useEffect, useState} from 'react'
import { auth } from '../helpers'

const useIsAuthenticated = props => {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  useEffect(() => {
      const authenticated = auth.getToken() !== null
      console.log("AUTH TOKEN HERE ", auth.getToken())
      setIsAuthenticated(authenticated)
  }, [])

    return {
        isAuthenticated
    }
}

export default useIsAuthenticated