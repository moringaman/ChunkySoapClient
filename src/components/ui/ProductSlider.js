import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ProductItem from "./ProductItem";
import { SlideGrid } from "../../styles/layout";

const ProductSlider = ({ data, handleClick, perPage, ...rest }) => {
  // TODO: Add dots with data array slice

  const [sliceArray, setSliceArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = perPage;

  useEffect(() => {
    if (data.length > 0) {
      const slices = data.length / productsPerPage;
      setSliceArray([...Array(slices)]);
    }
  }, [data]);

  const selectPage = (e) => {
    setCurrentPage(e.target.value);
  };

  return (
    <>
      <SlideGrid {...rest}>
        {data.length > 1 ? 
          data
            .slice(
              currentPage === 1 ? 0 : currentPage * productsPerPage,
              productsPerPage
            )
            .map((product, i) => (
              <ProductItem
                product={product}
                info="New"
                key={i}
                clickEvent={handleClick}
              />
            )) : [data].map((product, i) => (

              <ProductItem
                product={product}
                info="New"
                key={i}
                clickEvent={handleClick}
                />
            ))}
      </SlideGrid>
      <Dots>
        {data.length > 3 &&
          sliceArray.map((el, i) => (
            <Dot
              page={currentPage}
              value={i + 1}
              key={i}
              onClick={(e) => selectPage(e)}
            />
          ))}
      </Dots>
    </>
  );
};

export default ProductSlider;

const Dots = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
const Dot = styled.button`
  border: none;
  border-radius: 50%;
  background-color: gray;
  cursor: pointer;
  width: 15px;
  height: 15px;
  margin: 8px;
  ${(props) =>
    props.page === props.value &&
    css`
      background-color: black;
    `}
`;

