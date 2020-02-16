const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatMyReantals(data) {
  let errors = {};

  data.address = !isEmpty(data.address) ? data.address : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';
  data.leftCose = !isEmpty(data.leftCose) ? data.leftCose : '';

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }
  if (Validator.isEmpty(data.to)) {
    errors.to = 'To date field is required';
  }
  if (Validator.isEmpty(data.leftCose)) {
    errors.leftCose = 'Left Cose date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
