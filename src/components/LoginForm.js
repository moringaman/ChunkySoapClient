import React, { useEffect, useState } from 'react'
import { SimpleTextInput, AnimatedButton } from '../components/ui'
import { Heading2 } from '../styles/typography'
import forms from '../containers/forms.json'


const LoginForm = (props) => {

const views = forms.views

    const [ currentView, setCurrentView ] = useState('login')

    useEffect(() => {
        console.log("FORM PROPS ", props)
    })

    useEffect(() => {
        let current = props.data.register === true ? 'register' : 'login' 
        setCurrentView(current)
    }, [props.data.register])

    return (
            <div style={{ marginTop: 130, marginLeft: 'auto', marginRight: 'auto', maxWidth: 550, padding: 70, border: '1px solid #DBDBDB', borderRadius: 25, minHeight: 320}}>
                <Heading2>Sign in to Continue</Heading2>
                <form 
                    onSubmit={(e) => props.handleLogin(e)}
                    style={{ marginTop: 30, display: 'flex', width: '100%',flexDirection: 'column'}}
                >
                    {
                        views[currentView].map((el, i) => (
                            <SimpleTextInput 
                                placeholder = {el.placeholder}
                                label={el.label}
                                type={el.text}
                                name={el.name}
                                handleChange={props.handleChange}
                                key={i}
                            />
                        ))
                    }
                        <br/>
                        <div>
                            I Don't have an account create one <input type="checkbox" name="register" checked={props.data.register}  onChange={props.handleChange}/>
                        </div>
                        {/* <br/> */}
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '75%', marginLeft: 130, marginTop: 20}}>
                        <AnimatedButton type="submit" text="Sign In" med></AnimatedButton><br />
                        <AnimatedButton text="Guest Checkout" secondary med handleClick={() => cartDispatch({type: 'GUEST_CHECKOUT'})}></AnimatedButton>
                        </div>
                </form>
            </div>
    )   
}

export default LoginForm