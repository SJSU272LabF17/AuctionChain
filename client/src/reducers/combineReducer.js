import { combineReducers  } from 'redux';
import AuthReducer from './authReducer';
import ProductReducer from './productReducer';
import ProductListingReducer from './productListingReducer';
import bidding from './bidding';

export default combineReducers({
	AuthReducer , ProductReducer, ProductListingReducer , bidding
})