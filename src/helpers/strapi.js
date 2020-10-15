import { auth, request, myApi } from './'

class Strapi {
    constructor(dispatch) {
        this.dipatch = dispatch || {}
        this.API_URI = process.env.API_URI || 'http://localhost:1337'
    }

    async login({identifier, password} = {}) {
        try {
            const response = await request(`${API_URI}/auth/local/`, { method: 'POST', body})
            auth.setToken(response.jwt, body.rememberMe);
            auth.setUserInfo(response.user, body.rememberMe);
            this.dispatch({type: "SET_USER_SESSION", payload: res})
        }catch(err) {
            return err
        }
    }

    async register() {
        try {
            const response = await request(`${API_URI}/auth/local/register/`, { method: 'POST', body})
            auth.setToken(response.jwt, body.rememberMe);
            auth.setUserInfo(response.user, body.rememberMe);
            this.createCustomer(response.user.id)
        } catch(err) {
            return(err)
        }
    }

    async createCustomer(_id) {
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
            const res = await myApi.send('http://localhost:1337/customer', 'POST', customer)
            this.dispatch({type: "SET_USER_SESSION", payload: res})
        } catch (err) {
            return(err)
        }
    }
}

export default Strapi