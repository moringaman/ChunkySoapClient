import React, { useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { FrameHeader, Frame, FrameBody, Container } from '../styles/layout'
import { Heading2 } from '../styles/typography'
import { LoginForm } from '../components'
import  useStrapiLogin  from '../hooks/useStrapiLogin'

const AuthPage = () => {


    const loginReducer = (state, action) => {
        switch(action.type) {
            case 'UPDATE_FIELD': 
             return {
                 ...state,
                 fields: {
                     ...state.fields,
                        [action.fieldName] : action.fieldValue 
                 }
                }
            default:
                return state
        }
    }

    const initialState = {
        loading: false,
        errorMsg: '',
        authenticated: false,
        fields: {
            register: false,
            identifier: '',
            password: '',
            password_confirmation: '',
            username: ''
        }
    }

    const [ loginState, loginDispatch ] = useReducer(loginReducer, initialState)
    const { authenticated, guest, loading, fields: { email, password, register, username, password_confirmation } } = loginState

    const { handleStrapiLogin, errorMsg, isLoggedIn } = useStrapiLogin({loginDispatch, loginState})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            loginDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: checked })
            return
        }
            loginDispatch({type: 'UPDATE_FIELD', fieldName: name, fieldValue: value})
            console.log("LOGIN STATE ", loginState.fields.email)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
       await handleStrapiLogin()
    }

    
    return (
        <>
        <Container>
            <LoginForm 
            data={loginState.fields} 
            handleChange={handleChange}
            handleLogin={handleLogin}
            loading={loginState.loading ? 1 : undefined}
             />
        </Container>
        </>
    )
}

export default AuthPage