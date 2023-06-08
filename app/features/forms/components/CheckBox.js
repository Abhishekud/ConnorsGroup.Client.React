import {List, Map} from 'immutable';
import {ControlLabel, HelpBlock, FormGroup, Checkbox} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class CheckBox extends PureComponent {
  render() {
    const {
      id, name, label, disabled, readOnly, optional, autoFocus,
      formValidationErrors, value, formGroupClassName, labelTitle, ...otherProps
    } = this.props;

    const controlName = name || id;
    const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();
    const labelProps = labelTitle ? {title: label} : null;

    return (
      <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
        className={formGroupClassName}>
        {label ? <ControlLabel {...labelProps}>{label}{optional ? <small> (optional)</small> : null}</ControlLabel> : null}
        <Checkbox id={id} name={controlName} disabled={disabled} readOnly={readOnly} autoFocus={autoFocus} value={value === null || typeof value === 'undefined' ? '' : value} {...otherProps} />
        {controlValidationErrors.size
          ? controlValidationErrors.map((error, index) =>
            (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
          : null}
      </FormGroup>
    );
  }
}

CheckBox.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  value: PropTypes.bool,
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formGroupClassName: PropTypes.string,
  labelTitle: PropTypes.bool,
  formValidationErrors: PropTypes.instanceOf(Map),
};
