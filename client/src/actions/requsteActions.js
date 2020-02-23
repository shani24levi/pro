import axios from 'axios';

import {
  GET_REQUSTS,
  GET_REQUST,
  ADD_REQUST,
  REQUSTS_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  CLEAR_ERRORS

} from './types';


// Add requst
export const addRequst = requstData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/requsts', requstData)
    .then(res =>
      dispatch({
        type: ADD_REQUST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUST,
        payload: err.response.data
      })
    );
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};


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


// Get my requsts --those who sent to me
export const getMyRequstes = () => dispatch => {
  dispatch(setRequsteLoading());
  axios
    .get('/api/requsts')
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
