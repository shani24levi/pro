import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import apartmentReducer from './apartmentReducer';
import requsteReducer from './requsteReducer';


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  apartment: apartmentReducer,
  requste: requsteReducer
});
