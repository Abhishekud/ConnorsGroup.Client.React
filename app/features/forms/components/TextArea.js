import {List, Map} from 'immutable';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function TextArea({
  id, name, label, disabled, readOnly, optional, autoFocus, formValidationErrors, value, formGroupClassName, ...props
}) {
  const controlName = name || id;
  const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();

  return (
    <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
      className={formGroupClassName}>
      {label ? <ControlLabel>{label}{optional ? <small> (optional)</small> : null}</ControlLabel> : null}
      <FormControl componentClass="textarea"
        id={id} name={controlName}
        disabled={disabled} readOnly={readOnly} autoFocus={autoFocus}
        value={value === null || typeof value === 'undefined' ? '' : value} {...props} />
      {controlValidationErrors.size
        ? controlValidationErrors.map((error, index) =>
          (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
        : null}
    </FormGroup>
  );
}

TextArea.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formValidationErrors: PropTypes.instanceOf(Map),
  formGroupClassName: PropTypes.string,
};
