import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    GET_REQUSTS,
    CLEAR_CURRENT_PROFILE
  } from '../actions/types';
  
  const initialState = {
    requste: null,
    requstes: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case PROFILE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_PROFILE:
        return {
          ...state,
          requste: action.payload,
          loading: false
        };
      case GET_REQUSTS:
        return {
          ...state,
          requstes: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_PROFILE:
        return {
          ...state,
          requste: null
        };
      default:
        return state;
    }
  }
  