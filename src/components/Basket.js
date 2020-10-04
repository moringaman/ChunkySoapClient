import React, {useState, useEffect} from 'react'
import  styled  from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import * as vars from '../styles/variables'
import { BannerHeading, Heading1, Heading2, Paragraph } from '../styles/typography'
import { ShoppingCart } from 'react-feather'
import { Container , Section} from '../styles/layout'
import ProductFrame from '../styles/ui/productFrame'
import AnimatedButton from '../components/ui/AnimatedButton'
import AddToCart from '../components/ui/AddToCartBtn'
import { Trash2, MinusCircle, PlusCircle, CreditCard } from 'react-feather'
import * as fn from '../helpers/functions'
import { BasketWrapper, ProductRow, Divider } from '../styles/ui/basket'

const Basket = (props) => {

    const { basket } = useSelector(state => state.basket)

    const [ postage, setPostage ] = useState(0)
    const [ total, setTotal ] = useState(0)


    useEffect(() => {
        if (fn.getCartTotal(basket.products) < 25) {
            setPostage(4.50)
        } else {
            setPostage(0)
        }
        setTotal(fn.getCartTotal(basket.products, postage))
    }, [basket])

    useEffect(() => {
        setTotal(fn.getCartTotal(basket.products, postage))
    }, [postage])

    console.log("BASKET PAGE ", basket)
    return (
        <>
        <Section dark height={180}>
                <img src="/drips.png" alt="drips" style={{float: 'right', width: '500px', transform: 'translate(50px, -70px)'}}/>
            <Container>
                <BannerHeading style={{maxWidth: 600, transform: 'translateY(-50px)' }}>
                    We offer FREE delivery on orders over &pound;25
                </BannerHeading>
            </Container>
        </Section>
        <Section light color={'white'} height={1000}>
            <Container>
                <Heading1>Your Basket</Heading1>
                <BasketWrapper>
                <ProductRow>
                    <Heading2 style={{flex: 3}}>Product</Heading2>
                    <Heading2 style={{flex: 1}}>Price</Heading2>
                    <Heading2 style={{flex: 1}}>Quantity</Heading2>
                    <Heading2 style={{flex: 1}}>Total</Heading2>
                </ProductRow>
                    {basket.products.length > 0 ?  basket.products.map(el => 
                        
                        <ProductRow key={el._id}>
                            <ProductFrame sml style={{flex: 1, marginRight: 70}} >
                                <img src={`http://localhost:1337${el.product_picture_1}`} 
                                style={{display: 'block', maxHeight: '70px', maxWidth: '70px', width: 'auto', height: 'auto'}}
                                />
                            </ProductFrame>
                            <div style={{flex: 2, paddingRight: 80}}>
                                {el.product_name} <br/>
                                {el.product_description}
                            </div>
                            <div style={{flex: 1, margin: 5}}>
                                &pound;{el.product_price}
                            </div>
                            <div style={{flex: 0.5, marginRight: 85, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                <AddToCart product={el} function="delete" icon={true}>
                                    <MinusCircle color='gray' size={32}/>
                                </AddToCart>
                                {el.product_qty}
                                {/* <AddToCart product={delete Object.assign(el, {['product_picture_1.url']: el['product_picture_1']})['product_picture_1']} function="add" icon={true}> */}
                                <AddToCart product={el} function="add" icon={true}>
                                    <PlusCircle color="lightgreen" size={32}/>
                                </AddToCart>
                            </div>
                            <div style={{flex: 1, margin: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                               &pound;{el.total_price.toFixed(2)}
                                <Trash2 size={32} color="#837D7D" style={{transform: 'translateX(20px)'}}/>
                            </div>
                        </ProductRow>
                    ) :  <Heading2>You Dont Have any Items in you basket yet</Heading2>}
                    <ProductRow>
                        <Divider />
                    </ProductRow>
                    <ProductRow narrow>
                        <Heading2>
                            Postage &pound;{fn.getCartTotal(basket.products) < 25 ? 4.50.toFixed(2) : 0.00.toFixed(2)}
                        </Heading2>
                    </ProductRow>
                    <ProductRow narrow>
                        <Heading2>
                            Sales Tax &pound; {0.00.toFixed(2)}
                        </Heading2>
                    </ProductRow>
                    <ProductRow narrow>
                        <Heading2>
                            Total &pound;{total.toFixed(2)}
                        </Heading2>
                    </ProductRow>
                    <ProductRow>
                            <AnimatedButton text="Secure Checkout" med 
                            // style={{position: 'absolute', right: 130, transform: 'translateX(-50%)'}}
                            style={{marginRight: '9%'}}
                            >
                                <CreditCard />
                            </AnimatedButton>
                    </ProductRow>
                </BasketWrapper>
            </Container>
        </Section>
        </>
    )
}

export default Basket