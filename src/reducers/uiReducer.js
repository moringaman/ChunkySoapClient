const initialState = {
    showMenu: false,
    showCategoryMenu: false
}
const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MENU':
            return {
                ...state,
                showMenu: true
            }
        case 'HIDE_MENU':
            return {
                ...state,
                showMenu: false
            }
        case 'TOGGLE_CATEGORY':
            return {
                ...state,
                showCategoryMenu: !state.showCategoryMenu
            }

        default:
            return state
    }
}

export default uiReducer