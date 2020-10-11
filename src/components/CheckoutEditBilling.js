import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Frame, FrameBody, FrameHeader, FrameFooter, ButtonRow, Divider } from '../styles/layout'
import { SubHeading1, Heading2 } from '../styles/typography'
import { AnimatedButton, SimpleTextInput } from '../components/ui'
import forms from '../containers/forms.json'
import { Edit3, ArrowRight } from 'react-feather'
import { myApi } from '../helpers/'

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
        console.log("ADDRESS ", address)
    }, [address])

    const submitForm = async(e) => {
        setLoading(true)
        e.preventDefault()
            console.log("SUBMITTING FORM")
        const res = await myApi.send('/customers/5f81aa5ebc96a90e4cdf88ea', 'PUT', address)
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
                    <SubHeading1>Please Provide a Billing Address</SubHeading1>
                <Divider/>
                </FrameHeader>
                    <FrameBody>
                        <form onSubmit={(e) => submitForm(e)}>
                            {
                                views.addressForm.map((el, i) => ( 
                                    <SimpleTextInput 
                                        placeholder={el.placeholder}
                                        label={el.label}
                                        name={el.name}
                                        key={i}
                                        handleChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                ))
                            }
                        <ButtonRow>
                            <AnimatedButton big secondary text="Cancel" handleClick={() => setEditing(false)}><Edit3/></AnimatedButton>
                            <AnimatedButton big text="Save" type="submit" loading={loading}></AnimatedButton>
                        </ButtonRow>
                        </form>
                    </FrameBody>
            </Frame>
        )
    }

    return (
        <>
        { (user && !editing) &&
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