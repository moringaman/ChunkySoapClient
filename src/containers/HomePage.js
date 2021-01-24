import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { myApi } from "../helpers";
import { Hero, Container } from "../styles/layout";
import { BannerHeading, BannerHeading2, SectionHeading } from "../styles/typography";
import { Bubble } from "../styles/ui";
import ProductSlider from "../components/ui/ProductSlider";
import WxButton from "../styles/components/button";
import { Modal, OptIn, ProductPreview, Footer, ProductSearch } from "../components";
import useModal from "../hooks/useModal";
import * as vars from "../styles/variables";

export default function HomePage(props) {
  const products = useSelector((state) => state.products);
  const featured = products.products.filter(
    (el) => el.product_featured === true
  );
  const popular = products.products.sort((a, b) =>
    a.product_sold_quantity > b.product_sold_quantity ? 1 : -1
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { isShowing, toggle } = useModal({selectedProduct, products})
  const [selectedProduct, setSelectedProduct] = useState({});
  const [currentCart, setCurrentCart] = useState([]);
  const envVar = process.env.RAZZLE_STRIPE_PRIVATE_KEY

  // Optin State - later add to custom optin hook

  const [optinMail, setOptinMail ] = useState({'email': ''})

  useEffect(() => {
    console.log("KEYS: ", envVar)
    if (process.browser) {
      const cartInStorage = localStorage.getItem("soap-cart");
      if (cartInStorage) {
        setCurrentCart(JSON.parse(cartInStorage));
        dispatch({
          type: "SET_INITIAL_BASKET",
          payload: JSON.parse(cartInStorage),
        });
      }
    }
    if (products.products.length) return;
    _apiCall();
  }, []);

  const _apiCall = async () => {
    const res = await myApi.send("/products", "GET", undefined, "public");
    console.log("MYAPI PRODUCTS ", res);
    dispatch({ type: "FETCH_PRODUCTS", payload: res });
    console.log("HOME PROPS ", props);
  };

  useEffect(() => {
    console.log("Changed Cart", currentCart);
  }, [currentCart]);

  const handleClick = (id) => {
    console.log("event");
    const selected = products.products.filter((product) => product.id === id);
    setSelectedProduct(selected[0]);
    console.log("SELECTED", selectedProduct);
    toggle();
  };

  const viewProduct = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <>
      <Hero>
        <img
          src="/drips.png"
          alt="drips"
          style={{
            float: "right",
            width: "500px",
            transform: "translateY(-30px)",
          }}
        />
        <img
          src="/logo-big.svg"
          alt="chunky soap"
          style={{
            float: "left",
            width: "450px",
            transform: "translateX(-40px)",
          }}
        />
        <img
          className="girl-pic"
          src="/girl.webp"
          alt="chunky soap girl"
          style={{
            position: "absolute",
            width: "480px",
            transform: "translateX(-120px)",
            top: 158,
          }}
        />
        {vars.heroBubbles.map((b, i) => (
          <Bubble {...b} key={i} />
        ))}
        <div
          style={{ top: 260, left: "800px", width: 550, position: "absolute" }}
        >
          <BannerHeading>
            Natural soap bars & creams for all skin types
          </BannerHeading>
          <BannerHeading2>Because beauty is a fragile gift..</BannerHeading2>
          <WxButton primary big style={{marginLeft: '70px', marginTop: '50px'}}>
            <div className="script-font">
             Visit Shop
            </div>
          </WxButton>
        </div>
      </Hero>
      <Container>
        <Bubbles>
          {vars.bodyBubbles.map((b, i) => (
            <Bubble {...b} key={i} />
          ))}
        </Bubbles>
        <ProductSearch />
          {/* <OptIn 
            height={180}
            cols="100%" 
            valid={false}
            placeholder="type product name here"
            btnText="Search" 
            label="Search our catalogue for your favorite products"
            handleChange={(e) => {setOptinMail({...optinMail, ['email']: e.target.value})}}
            handleSubmit={() => { console.log('submitting: ', optinMail)}}
            /> */}
        <SectionHeading>Featured Products</SectionHeading>
        <ProductSlider perPage={3} data={featured} handleClick={handleClick} />
        <SectionHeading>Most Popular Products</SectionHeading>
        <ProductSlider perPage={3} data={popular} handleClick={handleClick} />
      </Container>
      <div style={{ marginTop: '-100px'}}>
      <OptIn 
        cols="100%" 
        height={200}
        valid={false}
        btnText="Subscribe"
        placeholder="your email address" 
        label="Subscribe to our newsletter to get special deals"
        handleChange={(e) => {setOptinMail({...optinMail, ['email']: e.target.value})}}
        handleSubmit={() => { console.log('submitting: ', optinMail)}}
        />
      </div>
      <Footer height={800} />
      <Modal isShowing={isShowing} hide={toggle}>
        <ProductPreview product={selectedProduct} viewProduct={viewProduct} />
      </Modal>
    </>
  );
}

const Bubbles = styled.div`
  overflow: hidden;
`
