import {
    GET_APARTMENT,
    GET_APARTMENTS,
    APARTMENT_LOADING
  } from '../actions/types';
  
  const initialState = {
    apartment: null,
    apartments: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case APARTMENT_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_APARTMENT:
        return {
          ...state,
          apartment: action.payload,
          loading: false
        };
      case GET_APARTMENTS:
        return {
          ...state,
          apartments: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  