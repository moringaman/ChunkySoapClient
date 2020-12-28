import { useState } from 'react'

const useModal = ({ products }) => {
    const [ isShowing, setIsShowing ] = useState(false)
    const [ selectedProduct, setSelectedProduct ] = useState(null)

  const handleClick = (id) => {
    console.log("event", id);
    const selected = products.products.filter((product) => product.id === id);
    setSelectedProduct(selected[0]);
    console.log("SELECTED", selectedProduct);
    toggle();
  };

    const toggle = () => {
        setIsShowing(!isShowing)
    }

    return {
        isShowing,
        toggle,
        handleClick,
        selectedProduct
    }
}

export default useModal