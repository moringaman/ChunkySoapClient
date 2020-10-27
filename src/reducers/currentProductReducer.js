
const initialState = {
    currentProduct: {},
}
export default function currentProductReducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_PRODUCT':
            return {
                ...state,
                currentProduct: action.payload
            }
        default:
            return state;
    } 
}