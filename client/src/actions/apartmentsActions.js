import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REQUSTS,
  GET_APARTMENTS,
  PROFILE_LOADING,
  REQUSTS_LOADING,
  APARTMENTS_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,

} from './types';


// Get all Requstes
export const getApartents  = () => dispatch => {
  dispatch(setRequsteLoading());
  axios
    .get('/api/apartments/all')
    .then(res =>
      dispatch({
        type: GET_APARTMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APARTMENTS,
        payload: null
      })
    );
};

// Delete 
export const deleteRequste = id => dispatch => {
  axios
    .delete(`/api/requste/${id}`)
    .then(res =>
      dispatch({
        type: GET_REQUSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// search post method
export const searchApartment = (serachData, history) => dispatch => {
  axios
    .post('/api/search', serachData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Requste loading
export const setRequsteLoading = () => {
  return {
    type: APARTMENTS_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
