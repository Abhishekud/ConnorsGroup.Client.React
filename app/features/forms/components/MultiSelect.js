import {List, Map} from 'immutable';
import {ControlLabel, FormGroup, HelpBlock} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {MultiSelect} from '@progress/kendo-react-dropdowns';

export default class Select extends PureComponent {
  render() {
    const {
      id, name, label, formValidationErrors, value, formGroupClassName, options, ...otherProps
    } = this.props;

    const controlName = name || id;
    const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();

    return (
      <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
        className={formGroupClassName}>
        {label ? <ControlLabel>{label}</ControlLabel> : null}
        <MultiSelect
          name={controlName}
          className="multi-select"
          data={options}
          {...otherProps}
          value={value === null || typeof value === 'undefined' ? '' : value} />
        {controlValidationErrors.map((error, index) =>
          <HelpBlock key={index} className="validation-error">{error}</HelpBlock>)}
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
