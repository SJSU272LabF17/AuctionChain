import { combineReducers  } from 'redux';
import AuthReducer from './authReducer';
import ProductReducer from './productReducer';

export default combineReducers({
	AuthReducer , ProductReducer
})