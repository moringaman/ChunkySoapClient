import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../styles/typography'
import { Container , Section, Wrapper} from '../styles/layout'
import { ProductFrame, Bubble } from '../styles/ui'
import AnimatedButton from '../components/ui/AnimatedButton'
import AddToCart from '../components/ui/AddToCartBtn'
import { Trash2, MinusCircle, PlusCircle, CreditCard, ArrowLeft } from 'react-feather'
import * as fn from '../helpers/functions'
import { BasketWrapper, ProductRow, Divider } from '../styles/ui/basket'
import { withHero } from '../components/layout'

const Basket = (props) => {

    const { basket } = useSelector(state => state.basket)
    const history = useHistory()
    const [ postage, setPostage ] = useState(0)
    const [ total, setTotal ] = useState(0)


    useEffect(() => {
            console.log("BASKET POSTAGE", basket.postage)
            setPostage(basket.postage || 0.00)
        setTotal(fn.getCartTotal(basket.products, postage))
    }, [basket])

    useEffect(() => {
        setTotal(fn.getCartTotal(basket.products, postage))
    }, [postage])

    console.log("BASKET PAGE ", basket)

    const goBack = () => {
        history.goBack()
    }

    const navigate = (url) => {
        history.push(url)
    }

    return (
        <>
        <Section light color={'white'} height={1000}>
            <Wrapper>
                <Heading1>Your Basket</Heading1>
                <BasketWrapper>
                <ProductRow>
                    <Heading2 style={{flex: 3}}>Product</Heading2>
                    <Heading2 style={{flex: 1}}>Price</Heading2>
                    <Heading2 style={{flex: 1}}>Quantity</Heading2>
                    <Heading2 style={{flex: 1}}>Total</Heading2>
                </ProductRow>
                    <Divider />
                <ProductRow>
                </ProductRow>
                    {basket.products.length > 0 ?  basket.products.map(el => 
                        
                        <ProductRow key={el._id}>
                            <ProductFrame sml style={{flex: 1, marginRight: 70}} >
                                <img src={el.product_picture_1} 
                                style={{display: 'block', maxHeight: '70px', maxWidth: '70px', width: 'auto', height: 'auto'}}
                                />
                            </ProductFrame>
                            <div style={{flex: 2, paddingRight: 90}}>
                                {el.product_name} <br/>
                                {el.product_description}
                            </div>
                            <div style={{flex: 1, margin: 5}}>
                                &pound;{el.product_price}
                            </div>
                            <div style={{flex: .5, marginRight: 75, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                <AddToCart product={el} function="delete" icon={true}>
                                    <MinusCircle color='gray' size={28}/>
                                </AddToCart>
                                {el.product_qty}
                                {/* <AddToCart product={delete Object.assign(el, {['product_picture_1.url']: el['product_picture_1']})['product_picture_1']} function="add" icon={true}> */}
                                <AddToCart product={el} function="add" icon={true}>
                                    <PlusCircle color="lightgreen" size={28}/>
                                </AddToCart>
                            </div>
                            <div style={{flex: 1, marginRight: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                               &pound;{el.total_price.toFixed(2)}
                                {/* <Trash2 size={32} color="#837D7D" style={{transform: 'translateX(20px)'}}/> */}
                            </div>
                        </ProductRow>
                    ) :  <Heading2>You Dont Have any Items in you basket yet</Heading2>}
                    <ProductRow>
                        <Divider />
                    </ProductRow>
                    <ProductRow narrow>
                            Postage: &pound;{postage.toFixed(2)}
                    </ProductRow>
                    <ProductRow narrow>
                            Sales Tax: &pound; {0.00.toFixed(2)}
                    </ProductRow>
                    <ProductRow narrow>
                        <Heading2>
                            Total: &pound;{total.toFixed(2)}
                        </Heading2>
                    </ProductRow>
                    <ProductRow>
                            <AnimatedButton text="Back" med secondary 
                                handleClick={() => goBack()}
                            // style={{position: 'absolute', right: 130, transform: 'translateX(-50%)'}}
                            style={{marginRight: '15px'}}
                            >
                                <ArrowLeft />
                            </AnimatedButton>
                            <AnimatedButton text="Secure Checkout" med 
                                handleClick={() => navigate("/checkout")}
                            // style={{position: 'absolute', right: 130, transform: 'translateX(-50%)'}}
                            style={{marginRight: '9%'}}
                            >
                                <CreditCard />
                            </AnimatedButton>
                    </ProductRow>
                </BasketWrapper>
            </Wrapper>
        </Section>
        </>
    )
}

export default withHero({component: Basket})