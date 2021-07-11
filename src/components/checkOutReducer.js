const initialState = {
    step: 1
}

const checkoutReducer = (state, action) => {
    switch(action.type) {
        case 'STANDARD_CHECKOUT':
        return {
            ...state,
            authenticated: false,
            guest: null,
            step: 1
        }
        case 'GUEST_CHECKOUT':
        return {
            ...state,
            guest: true,
            step: 1
        }
        case 'NEXT_STEP':
        return {
            ...state,
            step: state.step + 1
        }
        case 'PREV_STEP':
            return {
                ...state,
                step: state.step - 1
            }
        case "LOGGING_IN":
            return {
                ...state,
                authenticated: false,
                // guest: false,
                loading: true,
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                step: 1,
                guest: null,
                errorMsg: action.payload,
                authenticated: false
            }
        case "LOGGED_IN":
            return {
                ...state,
                authenticated: true,
                guest: false,
                loading: false,
                fields: {}
            }
        case "CHECKOUT_SUCCESS": 
            return {
                ...state,
                step: 4,
                loading: false
            }
        case "SET_POSTAGE":
            return {
                ...state,
                loading: false,
                postage: action.payload
            }

        case 'UPDATE_FIELD':
            console.log("UPDATING IN REDUCER", action.fieldName, action.fieldValue)
            return {
                ...state,
            fields: {
                         ...state.fields,
                         [action.fieldName] : action.fieldValue
                   }
                }
        case 'CLEAR_FIELDS': 
                return {
                    ...state,
                    fields: {
                    ...state.fields,
                        password: '',
                        username: '',
                        identifier: ''
                    }
                }
        default:
            return state
    }
}

export default checkoutReducer