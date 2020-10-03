import { useSelector } from 'react-redux'

import { initializeStore } from '../store'
const Basket = (props) => {

    const basket = useSelector(state => state.basket)

    console.log(props)
    return (
        <>
        <h1>Shopping Basket</h1>
        </>
    )
}

export default Basket

export async function getServerSideProps() {
  // const { API_URL } = 'http://localhost:1337'
   const reduxStore = initializeStore()
  const { dispatch } = reduxStore
//   const res = await fetch(`http://localhost:1337/products`)
//   const data = await res.json()
  // console.log("data ", data)
  dispatch({type: 'FETCH_PRODUCTS', payload: []})
  return { props: { initialReduxState: reduxStore.getState() } }
}