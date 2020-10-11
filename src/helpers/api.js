// import { fn } from '.';


export default {
  /**
   * ( uses fetch to make authorized api requests )
   *
   * @param {*} url
   * @param {*} method
   * @param {*} data
   * @returns
   */
  async send(url, method, data) {
    const apiAddress = 'localhost'
    // fn.getApiAddress()
    const token = await JSON.parse(sessionStorage.getItem('jwtToken'))
        // await fn.getTokenFromStorage('sessionToken')
		console.log("TOKEN ", token)
    const baseURL = `http://${apiAddress}:1337`;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token !== '') {
        myHeaders.append('Authorization', `Bearer ${token}`);
    }

    var raw = JSON.stringify( data );
    console.log("raw data ", raw)
    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch(`${baseURL}${url}`, requestOptions)
      .then(response => {
        console.log('fetch response ', response);
        return response.json();
      })
      .then(result => {
        console.log('reftch result ', result);
        return result;
      })
      .catch(error => console.log('error', error));
  },
};