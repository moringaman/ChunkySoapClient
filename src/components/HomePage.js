// import Modal from 'react-modal'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'
import { Hero } from '../styles/layout'
import { Container } from '../styles/layout'
import { BannerHeading, BannerHeading2 } from '../styles/typography'
import { Bubble } from '../styles/ui/bubble'
import { SectionHeading } from '../styles/typography'
import ProductSlider from '../components/ui/ProductSlider'
import WxButton from '../styles/components/button'
import Modal from '../components/Modal'
import ProductPreview from '../components/ProductPreview'
import ProductItem from '../components/ui/ProductItem'
import useModal from '../hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import * as fn from '../helpers/functions'

export default function HomePage(props) {

 const products = useSelector(state => state.products)
 const dispatch = useDispatch()
 const history = useHistory()
  const { isShowing, toggle } = useModal()
  const [selectedProduct, setSelectedProduct ] = useState({})
  const [ currentCart, setCurrentCart ] = useState([])

  useEffect(() => {
    if (process.browser) {
      const cartInStorage = localStorage.getItem('soap-cart')
        if (cartInStorage) {
          setCurrentCart(JSON.parse(cartInStorage))
          dispatch({type: 'SET_INITIAL_BASKET', payload: JSON.parse(cartInStorage)})
        }
    }
    if(products.products.length) return
    apiCall()

  }, [])

  const apiCall = async() => {
  const res = await fetch(`http://localhost:1337/products`)
  // const res = await fetch(`${API_URI}/products`)
  const data = await res.json()
  dispatch({type: 'FETCH_PRODUCTS', payload: data})
  console.log("HOME PROPS ", props)
  }


  useEffect (() => {
    console.log("Changed Cart", currentCart)
  }, [currentCart])


  const bubbles = [{size: 230, opac: 0.6, x: 10, t: 500},
                   {size: 170, opac: 0.4, x: 200, t:680},
                   {size: 190, opac: 0.2, x:1300, t:560},
                   {size: 120, opac: 0.3, x:800, t: 690},
                   {size: 60, opac: 0.2, x:920, t: 790},
                   {size: 50, opac: 0.7, x: 80, t: 900, dark: 'yes'},
                   {size: 120, opac: 0.7, x: 160, t: 950, dark: 'yes'},
                  ]

  // console.log("URL ", process.env.API_URI)

    const handleClick = (id) => {
        // e.preventDefault()
        console.log('event')
        // router.push(`/product?productId=${id}`)
        const selected = products.products.filter(product => product.id === id)
        setSelectedProduct(selected[0])
        console.log("SELECTED", selectedProduct)
        toggle()
    }

  //   const addToCart = () => {
  //     const { _id, product_name, product_short_description, product_price, product_picture_1, product_discount } = selectedProduct
       
  //     const adjustedPrice = parseFloat(product_price - (product_price * product_discount) / 100)

  //       const newProduct = {
  //         _id,
  //         product_name,
  //         product_description: product_short_description,
  //         product_picture: product_picture_1.url,
  //         product_price: adjustedPrice,
  //         product_qty: 1,
  //         total_price: adjustedPrice
  //       }

  //     if ( currentCart.length === 0 ) {
  //       setCurrentCart([newProduct])
  //         dispatch({type: 'ADD_TO_BASKET', payload: [newProduct]})
  //       console.log("ADDED FIRST")
  //     } else {
  //         let newCartArray = currentCart
  //        const productInCart = newCartArray.filter(item => item._id === _id)
  //        if (productInCart.length > 0) {
  //         // find index and increase quantity
  //         const itemIndex = newCartArray.findIndex(item => item._id === _id)
  //         const item = newCartArray[itemIndex]
  //         item.product_qty++
  //         item.total_price = parseFloat(item.product_price * item.product_qty)
  //         setCurrentCart(newCartArray)
  //         dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
  //         localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
  //         console.log("QUANTITY UPDATED")
  //        } else {
  //          const newCartArray = [...currentCart, newProduct]
  //          localStorage.setItem('soap-cart', JSON.stringify(newCartArray))
  //          setCurrentCart([...currentCart, newProduct])
  //          dispatch({type: 'ADD_TO_BASKET', payload: newCartArray})
  //          console.log("ADDED NEW")
  //        }
  //     }
    
  // }

    const viewProduct = (id) => {
        history.push(`/product/${id}`)
    }

  return (
    <>
    <Hero>
    {/* <Container> */}
        <img src="/drips.png" alt="drips" style={{float: 'right', width: '500px', transform: 'translateY(-30px)'}}/>
        <img src="/logo-big.svg" alt="chunky soap" style={{float: 'left', width: '450px', transform: 'translateX(-40px)'}}/>
        <img className="girl-pic" src="/girl.webp" alt="chunky soap girl" style={{position: 'absolute', width: '480px', transform: 'translateX(-120px)', top: 158 }}/>
        {bubbles.map((b, i) => (
        <Bubble {...b} key={i} />
        ))}
        <div style={{top: 260, left: '51%', width: 550, position: 'absolute'}}>
          <BannerHeading >
              Natural soap bars & creams for all skin types
          </BannerHeading>
          <BannerHeading2>Because beauty is a fragile gift..</BannerHeading2>
          <WxButton big>Shop Now</WxButton>
        </div>
    {/* </Container> */}
    </Hero>
    <Container>
      <SectionHeading>Featured Products</SectionHeading>
      <ProductSlider>
      {
        products && products.products.map(product => 
          <ProductItem
            product={product}
            info="New" 
            key={product.id}
            clickEvent={handleClick}
          />
        )
      }
      </ProductSlider>
      <SectionHeading>Most Popular Products</SectionHeading>
      <ProductSlider>
      {
        products && products.products.map(product => 
          <ProductItem
            product={product}
            info="New" 
            key={product._id}
            clickEvent={handleClick}
          />
        )
      }
      </ProductSlider>
    </Container>
    <Modal isShowing={isShowing} hide={toggle}>
    <ProductPreview product={selectedProduct} viewProduct={viewProduct}/>
    </Modal>
    </>
  )
}


const Title = styled.h1`
    color: white;
    margin: auto auto;
`
