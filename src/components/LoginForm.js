import React from 'react'
import { SimpleTextInput, AnimatedButton } from '../components/ui'
import { Heading2 } from '../styles/typography'

const LoginForm = (props) => {
    return (
            <div style={{ marginTop: 130, marginLeft: 'auto', marginRight: 'auto', maxWidth: 550, padding: 70, border: '1px solid #DBDBDB', borderRadius: 25, height: 370}}>
                <Heading2>Sign in to Continue</Heading2>
                <form 
                    onSubmit={(e) => props.handleLogin(e)}
                    style={{ marginTop: 30, display: 'flex', width: '100%',flexDirection: 'column'}}
                >
                    <SimpleTextInput
                        placeholder="example@gmail.com" 
                        label="Email Address"
                        type="text"
                        name="email"
                        handleChange={props.handleChange}
                        />
                    <SimpleTextInput
                        placeholder="***********" 
                        label="Password"
                        type="password"
                        name="password"
                        handleChange={props.handleChange}
                        />
                        <br/>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '75%', justifyItems: 'flex-end'}}>
                        <AnimatedButton type="submit" text="Sign In" med></AnimatedButton><br />
                        <AnimatedButton text="Guest Checkout" secondary med handleClick={() => cartDispatch({type: 'GUEST_CHECKOUT'})}></AnimatedButton>
                        </div>
                </form>
            </div>
    )   
}

export default LoginForm