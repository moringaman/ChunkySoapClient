import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { myApi } from '../helpers'
import TopNav, { NavList } from "../styles/components/topnav";
import * as vars from "../styles/variables";
import PageLink from "./ui/PageLink";
import { Logo } from "../styles/logos";
import { ShoppingCart } from "react-feather";
import { Container } from "../styles/layout";
import AnimatedButton from "../components/ui/AnimatedButton";
import { User } from "react-feather";
import styled from "styled-components";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (process.browser) {
      const cartInStorage = localStorage.getItem("soap-cart");
      if (cartInStorage) {
        // setCurrentCart(JSON.parse(cartInStorage))
        dispatch({
          type: "SET_INITIAL_BASKET",
          payload: JSON.parse(cartInStorage),
        });
      }
    }
    console.log("NAV HIST ", history.location.pathname);
// fetch categories to pass to dropdown
    (async () => {
      if(categories && categories.length) return
      const _categories = await myApi.send('/categories', 'GET', undefined, 'public')
      dispatch({ type: "FETCH_CATEGORIES", payload: _categories})
      console.log("NAV CATEGORIES ", _categories)
    })()
  }, []);

  const { basket } = useSelector((state) => state.basket);
  const { categories } = useSelector((state) => state.categories || []);
  const { user } = useSelector((state) => state.user || {});
  console.log("CATS ", basket);
  const [basketTotal, setBasketTotal] = useState(0);
  // const [basketValue] = useSelector(state => state.basket[products])
  // .reduce((item, total) => item.total_price + total))
  useEffect(() => {
    let myArray = basket.products;
    console.log("PRODUCTS IN CART ", myArray);
    if (myArray.length > 0) {
      const totals = myArray.map((item) => item.total_price);
      const basketValue = totals.reduce((a, b) => a + b);
      setBasketTotal(basketValue.toFixed(2));
      console.log("TOTAL", basketValue);
    } else {
      setBasketTotal(0.0);
    }
    console.log("basket context ", basket.products);
  }, [basket]);

  return (
    <Container nav={true} location={history.location.pathname}>
      <TopNav location={history && history.location.pathname}>
        {/* <CategoryMenu><Pointer /></CategoryMenu>  */}
          <Logo>Chunky Soap Co</Logo>
        <NavList>
          <li>
            <PageLink id="a" to="/">
              About
            </PageLink>
          </li>
          <li>
            <PageLink to="/contact">Contact</PageLink>
          </li>
          <li>
            <PageLink
              to="/category"
              withMenu
              menuData={categories}
              menuTitle="Categories"
              display={true}
            >
              Categories
            </PageLink>
          </li>
          <li>{!user === {} ? "Sign In" : "Sign Out"}</li>
          <li>
            <AnimatedButton primary sml text="New Account" loading="false">
              <User />
            </AnimatedButton>
          </li>
          <li>
            <PageLink to="/basket">
              {/* <PageLink to="/basket" withMenu menuTitle="Cart Items" menuData={basket.products}> */}
              &pound;{basket && basketTotal}
              <div style={{ marginLeft: 10, display: 'flex' }}>
                <ShoppingCart color={vars.palette.secondaryColor1} size={28} />
              {
                basket.products.length > 0 &&
              <ItemCountCircle>
                  {basket.products.length}
              </ItemCountCircle>
              }
              </div>
            </PageLink>
          </li>
        </NavList>
      </TopNav>
    </Container>
  );
};

export default Navbar;

const CategoryMenu = styled.div`
  width: 700px;
  height: 200px;
  background-color: ${vars.palette.secondayColor};
  z-index: 13000;
  position: absolute;
  top: 60px;
  border-radius: 20px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
`;
const Pointer = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${vars.palette.secondayColor};
  margin-left: 53%;
  margin-top: -5px;
  transform: rotate(45deg);
`;

const ItemCountCircle = styled.div`
    position: relative;
    background-color: ${vars.palette.primaryColor1};
    color: white;
    height: 17px;
    width: 17px;
    border: 3px solid white;
    border-radius: 50%;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    transform: translate(-10px, -10px);
`

