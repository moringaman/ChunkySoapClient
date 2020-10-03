import { combineReducers } from 'redux';
import productReducer from './productReducer';
import userReducer from './userReducer';
import basketReducer from './basketReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
    user: userReducer,
    products: productReducer ,
    basket: basketReducer,
    categories: categoryReducer
})