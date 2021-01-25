
const searchReducer = (state = [] , action) => {
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