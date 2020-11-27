const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNotesData(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.notes)) {
    errors.notes = 'Notes field is required';
  }

  

  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
