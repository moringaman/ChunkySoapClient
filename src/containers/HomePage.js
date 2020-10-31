// import Modal from 'react-modal'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'
import { Hero } from '../styles/layout'
import { Container } from '../styles/layout'
import { BannerHeading, BannerHeading2 } from '../styles/typography'
import { Bubble } from '../styles/ui'
import { SectionHeading } from '../styles/typography'
import ProductSlider from '../components/ui/ProductSlider'
import WxButton from '../styles/components/button'
import { Modal, OptIn, ProductPreview } from '../components'
import ProductItem from '../components/ui/ProductItem'
import useModal from '../hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import * as fn from '../helpers/functions'
import * as vars from '../styles/variables'
import { myApi } from '../helpers'

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
    _apiCall()

  }, [])

  const _apiCall = async() => {
  const res = await fetch(`http://localhost:1337/products`)
  // const res = await fetch(`${API_URI}/products`)
  const data = await res.json()
  dispatch({type: 'FETCH_PRODUCTS', payload: data})
  console.log("HOME PROPS ", props)
  }


  useEffect (() => {
    console.log("Changed Cart", currentCart)
  }, [currentCart])


    const handleClick = (id) => {
        // e.preventDefault()
        console.log('event')
        // router.push(`/product?productId=${id}`)
        const selected = products.products.filter(product => product.id === id)
        setSelectedProduct(selected[0])
        console.log("SELECTED", selectedProduct)
        toggle()
    }


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
        {vars.heroBubbles.map((b, i) => (
        <Bubble {...b} key={i} />
        ))}
        <div style={{top: 260, left: '51%', width: 550, position: 'absolute'}}>
          <BannerHeading >
              Natural soap bars & creams for all skin types
          </BannerHeading>
          <BannerHeading2>Because beauty is a fragile gift..</BannerHeading2>
          <WxButton primary big>Shop Now</WxButton>
        </div>
    {/* </Container> */}
    </Hero>
    <Container>
        {vars.bodyBubbles.map((b, i) => (
        <Bubble {...b} key={i} />
        ))}
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
    <OptIn />
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
