import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { myApi } from '../helpers'
import TopNav, { NavList } from "../styles/components/topnav";
import * as vars from "../styles/variables";
import * as fn from '../helpers/functions'
import PageLink from "./ui/PageLink";
import { Logo } from "../styles/logos";
import { ShoppingCart } from "react-feather";
import { Container } from "../styles/layout";
import AnimatedButton from "../components/ui/AnimatedButton";
import { User } from "react-feather";
import styled from "styled-components";
import { useIsAuthenticated, useViewportCheck } from '../hooks'
import { auth, strapi } from '../helpers'
import UseAnimations from 'react-useanimations'
import menu from 'react-useanimations/lib/menu2'


const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useIsAuthenticated()

// const loggedInUser = auth.getUserInfo()
  const { viewport } = useViewportCheck()


  // console.log('AUTH FROM HOOK', isAuthenticated, loggedInUser)
  console.log(`${process.env.RAZZLE_PUBLIC_DIR}/logo.jpg`)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(isAuthenticated)
    console.log("AUTHENTICATED", isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    console.log("VIEWPORT ", viewport)
  }, [viewport])
  // console.log("AUTHED ", isAuthenticated)

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
    // console.log("NAV HIST ", history.location.pathname);
    // fetch categories to pass to dropdown
    (async () => {
      if (categories && categories.length) return
      const _categories = await myApi.send('/categories', 'GET', undefined, 'public')
      dispatch({ type: "FETCH_CATEGORIES", payload: _categories })
      console.log("NAV CATEGORIES ", _categories)
    })()
  }, []);

  const { basket } = useSelector((state) => state.basket);
  const { showMenu } = useSelector((state) => state.ui);
  const { categories } = useSelector((state) => state.categories || []);
  const { user } = useSelector(({user}) => user);
  const [key, setKey] = useState(0)
  // const [ showMenu, setShowMenu ] = useState(false)
  console.log("CATS ", basket, user);

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
    <Container nav={true} location={history.location.pathname} key={key}>
      <TopNav location={history && history.location.pathname}>
        <PageLink to="/">
          <Logo ><img src="/logogray.png" style={{ width: 60, margin: -10, marginRight: 40 }} /></Logo>
        </PageLink>
        {/* { viewport > 976 &&  */}
        <NavList viewPort={viewport}>
          <li className="temp">
            <PageLink to="#">
              About
            </PageLink>
          </li>
          <li className="temp">
            <PageLink to="/contact">Contact</PageLink>
          </li>
          <li className="temp">
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
          {/* call auth.clear() to remove auth key to logout */}
          <li className="temp">{isAuthenticated === false ? <PageLink to="/authenticate">Sign In</PageLink> :
            <button style={{ backgroundColor: 'rgba(250, 250, 250, 0.0)', border: 'none', fontWeight: 'bold'}}
              onClick={() => {
                history.push('/authenticate')
                strapi.logout(dispatch)
              }
              }>Sign Out</button>}</li>
          <li className="temp">
            <AnimatedButton primary sml text="New Account" loading="false" handleClick={() => history.push('/authenticate?register=true')}>
              <User />
            </AnimatedButton>
          </li>
          <li>
            <PageLink to="/basket">
              {/* <PageLink to="/basket" withMenu menuTitle="Cart Items" menuData={basket.products}> */}
              <span style={{ color: '#666', fontSize: 18 }}>
                &pound;{basket && basketTotal}
              </span>
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
          <li className="hamburger">
            <a href="#">
              <UseAnimations
                animation={menu}
                strokeColor={showMenu === false ? '#666' : '#E963FF'}
                fillColor={showMenu === false ? '#666' : '#E963FF'}
                size={52}
                wrapperStyle={{ marginRight: -25, padding: 10 }}
                onClick={() => {
                  dispatch({ type: showMenu === true ? 'HIDE_MENU' : 'SHOW_MENU' })
                  //  setShowMenu(!showMenu);
                }}
              />
            </a>

          </li>
        </NavList>
        {/* } */}
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

