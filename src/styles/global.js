import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  font-family: 'Roboto', sans-serif;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-weight: 400;
  font-size: 16px;
}
  body {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    ${'' /* background-color: #E5E5E5; */}
    background-color: #FFFFFF;
  }
`

export default GlobalStyle