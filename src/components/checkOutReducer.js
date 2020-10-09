const initialState = {
    step: 1
}

const checkoutReducer = (state, action) => {
    switch(action.type) {
        case 'GUEST_CHECKOUT':
        return {
            ...state,
            guest: true
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