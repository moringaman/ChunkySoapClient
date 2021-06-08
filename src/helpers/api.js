// import { fn } from '.';
const promiseRetry = require('promise-retry')

export default {
  /**
   * ( uses fetch to make authorized api requests )
   *
   * @param {*} url
   * @param {*} method
   * @param {*} data
   * @returns
   */
  async send(url, method, data, type = "protected") {
    // const apiAddress = process.env.RAZZLE_API_URI 
    const apiAddress = process.env.NODE_ENV === 'production' ? process.env.RAZZLE_API_URI : "http://localhost:1337";
    // fn.getApiAddress()
    const token = await JSON.parse(sessionStorage.getItem("jwtToken"));
    // await fn.getTokenFromStorage('sessionToken')
    console.log("TOKEN ", token);
    const baseURL = `${apiAddress}`;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (token !== "" && type !== "public") {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }

    var raw = JSON.stringify(data);
    console.log("raw data ", raw);
    var requestOptions = {
      method: method,
      headers: myHeaders,
      mode: 'cors',
      credentials: 'omit',
      body: raw,
      redirect: "follow",
    };

    
    // return fetch(`${baseURL}${url}`, requestOptions)
    //   .then((response) => {
    //     console.log("fetch response ", response);
    //     if(response.status === 200) return response.json();

    //     if (retries > 0) {
    //       return fetch(`${baseURL}${url}`, requestOptions, retries - 1)
    //       console.log("error", error)
    //     }
    //   })
    //   .then((result) => {
    //     console.log("reftch result ", result);
    //     return result;
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     if (retries > 0) {
    //       retries - 1
    //       return fetch(`${baseURL}${url}`, requestOptions)
    //     }
    //   }
    //   );


  /**
   * (retryFetch returns fetch which recursively calls itself if the request fails)
   *
   * @param {*} url
   * @param {*} options
   * @param {integer} retries
   * @returns fetch
   */

      const retryFetch = (url, options, retries = 4) => {
        const retryCodes = [404, 401, 408, 500, 502, 503, 504, 522, 524]
        return fetch(url,  options)
        .then(response => {
          console.log('STATUS', response.status)
          if(response.status === 200) return response.json()
          if (retries > 0 && retryCodes.includes(response.status)) {
            console.log('retries ', retries)
            return retryFetch(url, options, retries - 1)
          } else {
            throw new Error(response)
          }
        })
        .catch(console.error)
      } 

       return retryFetch(`${baseURL}${url}`, requestOptions)

  },
};

