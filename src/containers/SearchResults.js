import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from'react-router-dom'
import { withHero } from  '../components/layout'
import { ProductSlider } from '../components/ui'
import { Container, Section } from '../styles/layout'
import { SectionHeading } from '../styles/typography'
import { Modal, Optin, ProductSearch, ProductPreview, Footer } from '../components'
import useModal from '../hooks/useModal'

const SearchResults = props => {

    const dispatch = useDispatch()
    const history = useHistory();
    let searchResults = useSelector(state => state["searchResults"].searchResults[0])
    const products = useSelector(state => state.products);

    const { isShowing, toggle, handleClick, selectedProduct } = useModal({products})

    useEffect(() => {
        console.log("__PRODUCTS: ", searchResults)
    }, [searchResults])

  const viewProduct = (id) => {
    history.push(`/product/${id}`);
  };

    return (
        <>
            <ProductSearch />
                { searchResults ?
                    <Container>
                        <SectionHeading>Your in luck!, here a your matches</SectionHeading>
                        <ProductSlider perPage={3} data={searchResults} handleClick={handleClick} />
                    </Container>
                    :
                    <Container>
                        <Section light height={400}>
                            <SectionHeading>Ooops! We don't have that</SectionHeading>
                        </Section>
                    </Container>
                }
            <Footer />
            <Modal isShowing={isShowing} hide={toggle}>
                <ProductPreview product={selectedProduct} viewProduct={viewProduct} />
            </Modal>
        </>
    )
}

export default withHero({ component: SearchResults})