import Head from 'next/head'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import Navbar from 'components/Navbar'
import '../styles/global.css'
import GlobalStyle from '../styles/global'
import { Container } from '../styles/layout'

const  MyApp = ({ Component, pageProps }) => {
  console.log("_APP ", pageProps)
  const store = useStore(pageProps.initialReduxState)
  console.log("STORE ", store)
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
      </Head>
      <GlobalStyle />
        <Container >
          <Provider store={store}>
            <Navbar />
            <Component {...pageProps} />
          </Provider>
        </Container>
    </>
  )
}

export default MyApp 

