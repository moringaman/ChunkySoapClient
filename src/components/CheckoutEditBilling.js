import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Frame, FrameBody, FrameHeader, FrameFooter, ButtonRow, Divider } from '../styles/layout'
import { SubHeading1, Heading2 } from '../styles/typography'
import { AnimatedButton, SimpleTextInput } from '../components/ui'
import forms from '../containers/forms.json'
import { Edit3, ArrowRight } from 'react-feather'
import { myApi } from '../helpers/'
import * as fn from '../helpers/functions'

const EditBilling = ({user, buttonClick}) => {

    const {views} = forms
    const [ editing, setEditing ] = useState(false)
    const [ address , setAddress ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    console.log("USER_ID", user._id)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAddress(values => ({...values, [name]: value}))
    }

    useEffect(() => {
        console.log("USER DETAILS", user)
        if (user.customer_town == "") {
            setEditing(true)
        }
    }, [user])

    const submitForm = async(e) => {
        setLoading(true)
        e.preventDefault()
            console.log("SUBMITTING FORM")
        const res = await myApi.send(`/customers/${user._id}`, 'PUT', address)
        console.log("NEW ADDRESS ", res)
        dispatch({type: 'SET_USER_SESSION', payload: res})
        setEditing(false)
        setLoading(false)
    }

    const renderAddress = () => {
        return (
                        <Frame >
                            <FrameHeader>
                                <SubHeading1>
                                Billing Address 
                                </SubHeading1>
                                <Divider mb='10px'/>
                            </FrameHeader>
                            <FrameBody>
                                <Heading2>
                                { user.customer_title } {user.customer_firstname} {user.customer_lastname}
                                </Heading2>
                                <Heading2>
                                { user.customer_address1 }
                                </Heading2>
                                <Heading2>
                                { user.customer_address2 }
                                </Heading2>
                                <Heading2>
                                { user.customer_town }
                                </Heading2>
                                <Heading2>
                                { user.customer_postcode }
                                </Heading2>
                            </FrameBody>
                        <FrameFooter >
                        <ButtonRow>
                            <AnimatedButton big secondary text="change" handleClick={() => setEditing(true)}><Edit3/></AnimatedButton>
                            <AnimatedButton big text="confirm" handleClick={() => buttonClick('NEXT_STEP')}><ArrowRight></ArrowRight></AnimatedButton>
                        </ButtonRow>
                        </FrameFooter>
                        </Frame>
        )
    }

    const renderForm = () => {
        return (
            <Frame>
                <FrameHeader>
                    <SubHeading1>Please provide a billing address</SubHeading1>
                <Divider/>
                </FrameHeader>
                    <FrameBody>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                            {
                                views.addressForm.map((el, i) => ( 
                                    <SimpleTextInput 
                                        placeholder={el.placeholder}
                                        label={el.label}
                                        name={el.name}
                                        key={i}
                                        handleChange={(e) => handleInputChange(e)}
                                        required
                                        cols={el.width}
                                    />
                                ))
                            }
                            </div>
                        <ButtonRow>
                            <AnimatedButton big secondary text="Cancel" handleClick={() => setEditing(false)}><Edit3/></AnimatedButton>
                            <AnimatedButton big text="Save" type="submit" ></AnimatedButton>
                        </ButtonRow>
                        </form>
                    </FrameBody>
            </Frame>
        )
    }

    return (
        <>
        { (user.customer_firstname && !editing) &&
            renderAddress()
        }
        {
            (user && editing) && 
            renderForm()
        }
        </>
    )
}

export default EditBilling