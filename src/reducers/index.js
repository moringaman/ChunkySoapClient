import { combineReducers } from 'redux';
import productReducer from './productReducer';
import userReducer from './userReducer';
import basketReducer from './basketReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
    products: productReducer ,
    basket: basketReducer,
    categories: categoryReducer,
    user: userReducer,
})