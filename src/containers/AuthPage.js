import React, { useEffect, useReducer, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { FrameHeader, Frame, FrameBody, Container } from '../styles/layout'
import { Heading2 } from '../styles/typography'
import { LoginForm } from '../components'
// import  useStrapiLogin  from '../hooks/useStrapiLogin'
import { useStrapiLogin } from '../hooks'

const AuthPage = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const isRegistration = query.get('register') // || false
        loginDispatch({type: 'UPDATE_FIELD', fieldName: 'register', fieldValue: isRegistration}) 
    }, [props.location.search])

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
            case 'LOGGING_IN':
                return {
                    ...state,
                    loading: true
                }
            case 'LOGGED_IN':
                return {
                    ...state,
                    loading: false
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
            register: register,
            identifier: '',
            password: '',
            password_confirmation: '',
            username: ''
        }
    }

    const [ loginState, loginDispatch ] = useReducer(loginReducer, initialState)
    const { authenticated, guest, loading, fields: { email, password, register, username, password_confirmation } } = loginState

    const { handleStrapiLogin, errorMsg, isLoggedIn } = useStrapiLogin({dispatch, loginState})


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
        loginDispatch({type: 'LOGGING_IN'})
       await handleStrapiLogin(loginState.fields, dispatch)
        loginDispatch({type: 'LOGGED_IN'})
        history.push('/basket')
    }

    
    return (
        <>
        <Container>
            <LoginForm 
            type='standalone'
            data={loginState.fields} 
            handleChange={handleChange}
            handleLogin={handleLogin}
            loading={loading ? 1 : undefined}
             />
        </Container>
        </>
    )
}

export default AuthPage