const initialState = {
    step: 1
}

const checkoutReducer = (state, action) => {
    switch(action.type) {
        case 'GUEST_CHECKOUT':
        return {
            ...state,
            guest: true,
            step: 2
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
                guest: false,
                loading: true,
            }
        case "LOGGED_IN":
            return {
                ...state,
                authenticated: true,
                guest: false,
                loading: false,
                fields: {}
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
        default:
            return state
    }
}

export default checkoutReducer