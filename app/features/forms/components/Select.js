import {List, Map} from 'immutable';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class Select extends PureComponent {
  render() {
    const {
      id, name, label, children, options, optional, formValidationErrors, value, formGroupClassName, ...otherProps
    } = this.props;

    const controlName = name || id;
    const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();

    return (
      <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
        className={formGroupClassName}>
        {label ? <ControlLabel>{label}{optional ? <small> (optional)</small> : null}</ControlLabel> : null}
        <FormControl componentClass="select" name={controlName}
          value={value === null || typeof value === 'undefined' ? '' : value} {...otherProps}>
          {children || options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </FormControl>
        {controlValidationErrors.size
          ? controlValidationErrors.map((error, index) =>
            (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
          : null}
      </FormGroup>
    );
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])
    ),
    PropTypes.string,
    PropTypes.number,
  ]),
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formValidationErrors: PropTypes.instanceOf(Map),
  formGroupClassName: PropTypes.string,
};
