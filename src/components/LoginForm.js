import React, { useEffect, useState, useRef } from 'react'
import { SimpleTextInput, AnimatedButton } from '../components/ui'
import { ButtonRow, Frame, FrameHeader, FrameBody} from '../styles/layout'
import { Heading2 } from '../styles/typography'
import forms from '../containers/forms.json'
import { ArrowRight, User }from 'react-feather'
import { usePrevious, useDynamicRef } from '../hooks'


const LoginForm = (props) => {

// set refs array for form input refs
const myRefs = useRef([])
const views = forms.views

 const [ currentView, setCurrentView ] = useState(null)

    useEffect(() => {
        let current = props.data.register ? 'register' : 'login' 
        setCurrentView(current)
        // myRefs.current[0].focus()
        console.log("MYREFS", myRefs)
    }, [, props.data.register, myRefs])

    const addToRef = (e) => {
        console.log("ADDING REF", e)
    }

    return (
        <Frame>
                <Heading2>Sign in to Continue</Heading2>
                <form 
                    onSubmit={(e) => props.handleLogin(e)}
                    style={{ marginTop: 30, display: 'flex', width: '100%',flexDirection: 'column'}}
                >
                    {
                        currentView && views[currentView].map((el, i) => (
                            //TODO: Add value and make controlled
                            <SimpleTextInput 
                                placeholder = {el.placeholder}
                                label={el.label}
                                type={el.type}
                                name={el.name}
                                handleChange={props.handleChange}
                                key={i}
                                direction={el.direction}
                                required={el.required}
                                ref={(e) => (myRefs.current[i] = e)}
                            />
                        ))
                    }
                        <br/>
                        <div>
                            I Don't have an account create one <input type="checkbox" name="register" checked={props.data.register}  onChange={props.handleChange}/>
                        </div>
                        <ButtonRow>
                            <AnimatedButton primary fixed type="submit" text={props.data.register ? "Register" : "Sign In"} med loading={props.loading ? true : undefined}><User /></AnimatedButton><br />
                            {props.type !== 'standalone' &&
                            <AnimatedButton fixed type="button" text="Guest Checkout" loading="false" secondary med handleClick={() => props.dispatch({type: 'GUEST_CHECKOUT'})}><ArrowRight/></AnimatedButton>
                            }
                        </ButtonRow>
                </form>
        </Frame>
    )   
}

export default LoginForm