import { combineReducers  } from 'redux';
import AuthReducer from './authReducer';
import ProductReducer from './productReducer';
import ProductListingReducer from './productListingReducer';

export default combineReducers({
	AuthReducer , ProductReducer, ProductListingReducer
})