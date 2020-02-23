import {
    GET_APARTMENT,
    GET_APARTMENTS,
    APARTMENT_LOADING,
    SET_SEARCH_DATA
  } from '../actions/types';
  
  const initialState = {
    apartment: null,
    apartments: [],
    searchData: null,
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
        console.log('action',action)
        return {
          ...state,
          apartments: action.payload,
          loading: false
        };
        case  SET_SEARCH_DATA:
          console.log('action',action)
          return {
            ...state,
            searchData: action.payload,
          };
      default:
        return state;
    }
  }
  