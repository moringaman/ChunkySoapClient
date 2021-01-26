const initialState = {
    searchResults: []
}
const searchReducer = (state = initialState , action) => {
    switch(action.type) {
       case 'UPDATE_SEARCH':
           return {
               ...state,
               searchResults: action.payload
           }
        default: 
        return state
    }
}

export default searchReducer