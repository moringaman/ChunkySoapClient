const initialState = {
    user: {}
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_USER_SESSION':
            return {
                ...state,
                user: action.payload
            }
        case 'END_USER_SESSION':
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
}