import Input from './Input';
import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function TextInput(props) {
  return <Input type="email" {...props} />;
}

TextInput.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formValidationErrors: PropTypes.instanceOf(Map),
  formGroupClassName: PropTypes.string,
};
