const initialState = {
    user: {},
    loggedIn: false
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_USER_SESSION':
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case 'END_USER_SESSION':
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default:
            return state;
    }
}