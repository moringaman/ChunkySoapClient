import React, { useEffect, useState } from 'react'
import { SimpleTextInput, AnimatedButton } from '../components/ui'
import { ButtonRow, Frame, FrameHeader, FrameBody} from '../styles/layout'
import { Heading2 } from '../styles/typography'
import forms from '../containers/forms.json'
import { ArrowRight, User }from 'react-feather'


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
        <Frame>

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
                                type={el.type}
                                name={el.name}
                                handleChange={props.handleChange}
                                key={i}
                                direction={el.direction}
                                required={el.required}
                            />
                        ))
                    }
                        <br/>
                        <div>
                            I Don't have an account create one <input type="checkbox" name="register" checked={props.data.register}  onChange={props.handleChange}/>
                        </div>
                        <ButtonRow>
                            <AnimatedButton primary fixed type="submit" text={props.data.register ? "Register" : "Sign In"} med loading={props.loading ? 1 : undefined}><User /></AnimatedButton><br />
                            <AnimatedButton fixed type="button" text="Guest Checkout" loading="false" secondary med handleClick={() => props.dispatch({type: 'GUEST_CHECKOUT'})}><ArrowRight/></AnimatedButton>
                        </ButtonRow>
                </form>
        </Frame>
    )   
}

export default LoginForm