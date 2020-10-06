// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductFrame from '../../styles/ui/productFrame'
import { Eye } from 'react-feather'
// import { Router } from 'next/router'

const ProductItem = (props) => {

    const [ product, setProduct ] = useState({})
    const [ hovered, setHovered ] = useState(false)

    useEffect(() => {
    if(props.product) {
        console.log("PRODUCT ", props.product)
        setProduct(props.product)
    }
    }, [props])


        const {product_picture_1, product_featured, product_name, product_discount, product_price, _id, categories } = product
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 25, marginTop: 25}}>
            <ProductFrame onClick={() => props.clickEvent(_id)} onMouseOver={()=> setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <img 
                    // src={props.image ? `http://localhost:1337${props.image.url}` : '/noimage.png'} 
                    src={product_picture_1 ? `http://localhost:1337${product_picture_1.url}` : '/noimage.png'} 
                    alt="product-image" 
                    style={{maxHeight: 250}}    
                    />
                <Eye color='white' size={36} style={{position: 'fixed', bottom: 30, right: 40, visibility: hovered ? 'visible' : 'hidden', transition: 'all 0.5 ease-in'}}/>
            </ProductFrame>
            <Pill>
               <h2>
                {props.info}
               </h2> 
            </Pill>
            <h2 style={{marginLeft: 10, fontSize: 24, marginTop: -15, marginBottom: 10}}>
                {product_name && product_name}
            </h2>
            <Prices>
                <h3 style={{zIndex: 300, color: 'white', marginLeft: 15, fontSize: 20}}>{categories && categories[0].category_name}</h3>
                    {product_discount > 0 ? <h3 style={{opacity: 0.3, marginLeft: 45, fontSize: 20, textDecoration: 'line-through'}}>&pound;  {product_price.toFixed(2)}</h3> : null}
                <h3 style={{fontSize: 20}}>
                    &pound;{(product_price) - (product_price * product_discount / 100).toFixed(2)}
                </h3>
            </Prices>
        </div>
    )
}
 export default ProductItem

 const Pill = styled.div`
       &, ::after {
        position: relative;
        text-align: center;
        padding: 15px 15px;
        border-radius: 50px;
        max-height: 20px;
        max-width: 60px;
        color: white;
        background-color: #F9B233;
        z-index: 10;
        transform: translate(300px, -280px);
       }
 `

 const Prices = styled.div`
        &, ::before{
        position: relative;
        padding: 15px 25px 15px 0px ;
        border-radius: 50px;
        max-width: 360px;
        min-width: 360px;
        height: 20px;
        background-color: #F6F2F2;
        display: flex;
        ${'' /* margin-top: 10px; */}
        ${'' /* z-index: 200; */}
        justify-content: space-between;
        }
        &::before {
            content: '';
            background-color: #EFB4F9;
            min-width: 130px;
            transform: translateY(-14px);
            ${'' /* z-index: 300; */}
            position: absolute;
            color: white;
        }

        `