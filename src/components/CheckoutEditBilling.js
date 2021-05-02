import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Frame, FrameBody, FrameHeader, FrameFooter, ButtonRow, Divider } from '../styles/layout'
import { SubHeading1, Heading2 } from '../styles/typography'
import { AnimatedButton, SimpleTextInput } from '../components/ui'
import forms from '../containers/forms.json'
import { Edit3, ArrowRight, ArrowLeft } from 'react-feather'
import { myApi } from '../helpers/'
import * as fn from '../helpers/functions'
import { useHistory } from 'react-router'

const EditBilling = ({user, cartState, cartDispatch, buttonClick}) => {

    const {views} = forms
    const [ editing, setEditing ] = useState(false)
    const [ address , setAddress ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const { customer_title, customer_firstname, customer_lastname, customer_address1, customer_address2, customer_town, customer_postcode } = user
    const dispatch = useDispatch()
    const history = useHistory()
    console.log("USER_ID", user)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAddress(values => ({...values, [name]: value}))
    }

    const goBack = () => {
        history.goBack()
    }

    useEffect(() => {
        console.log("USER DETAILS", user.customer_firstname)
        if (user._id == '' && user.customer_firstname == '') {
            setEditing(true)
        }
        // populate address state with address 
        setAddress(user)
    }, [, user])

    const submitForm = async(e) => {
        setLoading(true)
        e.preventDefault()
        if(cartState.authenticated) {
            console.log("SUBMITTING FORM")
            const res = await myApi.send(`/customers/${user._id}`, 'PUT', address)
            console.log("NEW ADDRESS ", res)
            dispatch({type: 'SET_USER_SESSION', payload: res})
        } else {
            dispatch({type: 'SET_USER_SESSION', payload: address})
            console.log('ADDRESS ', address)
        }
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
                                { user.customer_firstname ? 
                                <>
                                <Heading2>
                                { customer_title } {customer_firstname} {customer_lastname}
                                </Heading2>
                                <Heading2>
                                { customer_address1 }
                                </Heading2>
                                <Heading2>
                                { customer_address2 }
                                </Heading2>
                                <Heading2>
                                { customer_town }
                                </Heading2>
                                <Heading2>
                                { customer_postcode }
                                </Heading2>
                                </>
                                : <Heading2>Please provide a billing address</Heading2> 
                                }
                            </FrameBody>
                        <FrameFooter >
                        <ButtonRow>
                            <AnimatedButton big secondary text='Back' handleClick={() => goBack()}><ArrowLeft/></AnimatedButton>
                            <AnimatedButton big secondary text='change' handleClick={() => setEditing(true)}><Edit3/></AnimatedButton>
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
                                        value={address[el.value]}
                                    />
                                ))
                            }
                            {
                                !cartState.authenticated && 
                                <SimpleTextInput
                                    placeholder='example@gmail.com'
                                    label="Email Address"
                                    name="email"
                                    handleChange={(e) => handleInputChange(e)}
                                    required
                                    cols='100%'
                                 />
                            }
                            </div>
                        <ButtonRow>
                        { cartState.guest ?
                             <AnimatedButton big secondary text="Back" handleClick={() => cartDispatch({type: 'STANDARD_CHECKOUT'})}><Edit3/></AnimatedButton>
                            : <AnimatedButton big secondary text="Cancel" handleClick={() => setEditing(false)}><Edit3/></AnimatedButton>
                        }
                            <AnimatedButton big text="Save" type="submit" loading={loading ? 1 : undefined} ></AnimatedButton>
                        </ButtonRow>
                        </form>
                    </FrameBody>
            </Frame>
        )
    }

    return (
        <>
        { (editing === false && user.customer_firstname) &&
            renderAddress()
        }
        {
            (editing === true || !user.customer_firstname) && 
            renderForm()
        }
        </>
    )
}

export default EditBilling