import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REQUSTS,
  PROFILE_LOADING,
  REQUSTS_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,

} from './types';


// Get all Requstes
export const getRequstes = () => dispatch => {
  dispatch(setRequsteLoading());
  axios
    .get('/api/requsts/all')
    .then(res =>
      dispatch({
        type: GET_REQUSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUSTS,
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



// Requste loading
export const setRequsteLoading = () => {
  return {
    type: REQUSTS_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
