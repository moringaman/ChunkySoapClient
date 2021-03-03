import React from 'react'
import { strapi } from '../helpers/'

const useStrapiLogin = (
    {
        dispatch,
        loginState: {
             fields:{
                  email,
                  password, 
                  register, 
                  username, 
                  password_confirmation
                }
            }
        }
    ) => {
        console.log('useStrapiLogin ', register)
    
    const handleStrapiLogin = async() => {
        dispatch({type: 'LOGGING_IN'})
        if(register === true) {
            if(password !== password_confirmation) {
                console.log("PASSWORDS MUST MATCH ")
                return
            }
            console.log("REGISTERING NEW USER")
        const body = {email: email, password: password, username: username};
           await strapi.register(body, dispatch)
            dispatch({type: 'LOGGED_IN'})

        } else {
            console.log("LOGGING IN USER with ", email, password)
            const body = {identifier: email, password: password, username: username};
            try {
                await strapi.login(body, dispatch)
                dispatch({type: 'LOGGED_IN'})
            } catch (err) {
                console.log(err)
                dispatch({type: 'LOGIN_FAIL', payload: err})
            }
        }
    }

    return {
        handleStrapiLogin,
        isLoggedIn: false,
        errorMsg: ''
    }
}

export default useStrapiLogin