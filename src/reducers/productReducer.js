const initialState = {
    products: [],
}
export default function productReducer(state = initialState, action) {
    console.log("FETCH", action.payload)
    console.log("CATEGORIES ", state.categories)
    console.log("state should be ", [...state.products.concat(action.payload)])
    switch(action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: [...state.products.concat(action.payload)]
            }
        default:
            return state;
    } 
}