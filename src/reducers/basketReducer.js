const initialState = {
    basket: {
        products: [],
        total: 0,
        postage: 0,
        carrierId: null
    }
}

export default function basketReducer(state=initialState, action) {
    console.log("ADDING", action.payload)
    // console.log("BASKET SHOULD CONTAIN ", [...state.basket.concat(action.payload)])
    // console.log("STATE FROM REDUCER ", {
    //             ...state,
    //             basket: {
    //                 products: state.basket.products.filter(item => item._id != action.payload._id)
    //             }})
    switch(action.type) {
        case 'SET_INITIAL_BASKET':
            return {
               ...state,
                basket: {
                    products:action.payload
                }
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: initialState.basket
            }
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: { products: action.payload }
            }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: {
                    products: state.basket.products.filter(item => item._id != action.payload._id )
                }
            }
        case 'UPDATE_TOTAL': 
             return {
                 ...state,
                 total: action.payload
             }
        case 'SET_POSTAGE' :
            return {
                ...state,
                basket: {
                    ...state.basket,
                    postage: action.payload.shipping_cost,
                    carrierId: action.payload.id 
                }
            }
            default:
                return state
    } 
}