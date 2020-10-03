import styled, { css } from 'styled-components'

const ProductFrame = styled.div`
  &, :after { 
    ${'' /* margin-top: 20px; */}
    height: 330px;
    width: 360px;
    min-width: 360px;
    border-radius: 80px;
    background-color: #CCEAE3;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ${'' /* z-index: 100; */}
    transition: all 0.2s ease-in;
    position: relative;
    ${props => props.sml && css`
      height: 70px;
      max-width: 70px;
      min-width: 70px;
      border-radius: 15px
    `}
   }
    &::after {
        content:''; 
        transform: rotate(20deg);
         z-index: -10;
         position: absolute;
         opacity: 0.3;
         transition: all .5s ease-in;
         box-shadow: rgba(149, 220, 203, 0.2) 0px 2px 13px, inset rgba(149, 220, 203, 0.2) 0px -1px 12px;
    }
    &:hover {
        transform: rotate(-4deg);
    }
`

export default ProductFrame;