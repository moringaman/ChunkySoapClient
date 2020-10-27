import { combineReducers } from 'redux';
import productReducer from './productReducer';
import userReducer from './userReducer';
import basketReducer from './basketReducer'
import categoryReducer from './categoryReducer'
import currentProductReducer from './currentProductReducer';

export default combineReducers({
    currentProduct:currentProductReducer,
    products: productReducer ,
    basket: basketReducer,
    categories: categoryReducer,
    user: userReducer,
})