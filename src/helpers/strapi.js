import { auth, request, myApi } from './'


 export default {

    async login(body, dispatch) {
    const API_URI = process.env.NODE_ENV === 'production' ? process.env.RAZZLE_API_URI :'http://localhost:1337'
    // const API_URI = 'http://localhost:1337'
        try {
            console.log("STRAPI LOGIN ", body)
            const response = await request(`${API_URI}/auth/local/`, { method: 'POST', body})
            console.log("STRAPI RESPONSE ", response)
            // TODO: use cookies to avoid serverside issues
            auth.setToken(response.jwt, body.rememberMe);
            auth.setUserInfo(response.user, body.rememberMe);
            dispatch({type: "SET_USER_SESSION", payload: response})
            return response
        }catch(err) {
            return {status: 400, message: err}
        }
    },

    async register(body, dispatch) {
    const API_URI = process.env.NODE_ENV === 'production' ? process.env.RAZZLE_API_URI :'http://localhost:1337'
    // const API_URI = 'http://localhost:1337'
        try {
            const response = await request(`${API_URI}/auth/local/register/`, { method: 'POST', body})
            auth.setToken(response.jwt, body.rememberMe);
            auth.setUserInfo(response.user, body.rememberMe);
            console.log("NEW USER ", response.user)
            this.createCustomer(response.user.id, dispatch)
        } catch(err) {
            return(err)
        }
    },

    async createCustomer(_id, dispatch) {
        console.log("CREATING CUSTOMER")
        const customer = {
            customer_title: "",
            customer_firstname: "",
            customer_lastname: "",
            customer_address1: "",
            customer_address2: "",
            customer_town: "",
            customer_postcode: "",
            customer_created: new Date(),
            user: _id
        }
        try {
            const res = await myApi.send('/customers', 'POST', customer)
            dispatch({type: "SET_USER_SESSION", payload: res})
        } catch (err) {
            return(err)
        }
    },

    logout(dispatch) {
        console.log('LOGGING_OUT')
        auth.clearUser()
        dispatch({type: 'END_USER_SESSION'})
    }
}
