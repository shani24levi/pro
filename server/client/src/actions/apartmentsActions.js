import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REQUSTS,
  GET_APARTMENTS,
  SET_SEARCH_DATA,
  PROFILE_LOADING,
  REQUSTS_LOADING,
  APARTMENTS_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_APARTMENT,

} from './types';

// Get current apartment
export const getCurrentApartment = () => dispatch => {
  dispatch(setRequsteLoading());
  axios
    .get('/api/apartments')
    .then(res =>
      dispatch({
        type: GET_APARTMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APARTMENT,
        payload: {}
      })
    );
};

// Create apartment
export const createApartment = (apartmentData, history) => dispatch => {
  axios
    .post('/api/apartments', apartmentData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Get all Apartments
export const getApartents = () => dispatch => {
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

// Get Apartment by id user thets loged in 
export const getApartentsById = id => dispatch => {
  dispatch(setRequsteLoading());
  axios
    .get(`/api/apartments/user/${id}`)
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


// Get Apartment by Apartment for view the apartment selcted 
export const getApartentsByApartmentId = id => dispatch => {
  dispatch(setRequsteLoading());
  axios
    .get(`/api/apartments/${id}`)
    .then(res =>
      dispatch({
        type: GET_APARTMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APARTMENT,
        payload: null
      })
    );
};

// Delete Apartment
export const deleteApartment = id => dispatch => {
  axios
    .delete(`/api/apartments/${id}`)
    .then(res =>
      dispatch({
        type: GET_APARTMENTS,
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


// Edit Apartment
export const editApartment = ({ _id: id, ...apartmentData }, history) => dispatch => {
  axios
    .put(`/api/apartments/${id}`, apartmentData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// search post method
export const searchApartment = (serachData, history) => dispatch => {
  
  dispatch({
    type: SET_SEARCH_DATA,
    payload: serachData
  })
  
  axios
    .post('/api/apartments/search', serachData)
    .then(res => {
      dispatch({
        type: GET_APARTMENTS,
        payload: res.data
      })
      // history.push('/search')
    })
    .catch(err => {

      console.log('searchApartment', err.message)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};


// apartment loading
export const setRequsteLoading = () => {
  return {
    type: APARTMENTS_LOADING
  };
};

// Clear apartment
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
