import { useSelector } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import { initializeStore } from '../../store'

const ProductPage = (props) => {
    const products = useSelector(state => state.products)
    console.log('PROPS ', props)
    return (
        <>
        <h1>Products</h1>
        </>
    )
}

export async function getServerSideProps() {
    const reduxStore = initializeStore()
  const { dispatch } = reduxStore
  const res = await fetch(`${process.env.API_URI}/products`)
  const data = await res.json()
  // console.log("data ", data)
  dispatch({type: 'FETCH_PRODUCTS', payload: data})
  return { props: { initialReduxState: reduxStore.getState() } }
}


export default ProductPage