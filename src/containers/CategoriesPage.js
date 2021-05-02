import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withHero } from "../components/layout";
import { ProductSlider } from "../components/ui";
import { Container } from "../styles/layout";
import { Modal, OptIn, ProductPreview, Footer } from "../components";
import { myApi } from '../helpers'
import useModal from "../hooks/useModal";

const CategoriesPage = (props) => {
  const {
    match: {
      params: { _id },
    },
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector(state => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { isShowing, toggle, handleClick, selectedProduct } = useModal({products})

  useEffect(() => {
    (async() => {
        await _apiCall()
        filterProductsById()
    })()
    console.log("GAT PAGE PRODS ", products)
  }, [products, _id]);


  const viewProduct = (id) => {
    history.push(`/product/${id}`);
  };

  const _apiCall = async () => {
    if (products.products.length > 1) return
    const data = await myApi.send(`/products`, 'GET', undefined, 'public');
    dispatch({ type: "FETCH_PRODUCTS", payload: data });
  };

  const filterProductsById = () => {
    const filtered = products.products.find(product => product.categories[0]._id === _id)
    setFilteredProducts(filtered)
    console.log("FILTERED ", filtered, _id )
  }


  return (
    <>
      <Container>
        {
          filteredProducts &&
          <ProductSlider perPage={3} data={filteredProducts} handleClick={handleClick} />
        }
      </Container>
      <Footer />
      <Modal isShowing={isShowing} hide={toggle}>
        <ProductPreview product={selectedProduct} viewProduct={viewProduct} />
      </Modal>
    </>
  );
};

export default withHero({ component: CategoriesPage });
