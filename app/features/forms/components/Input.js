import {List, Map} from 'immutable';
import {ControlLabel, FormControl, FormGroup, HelpBlock, InputGroup} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Tooltip} from '@progress/kendo-react-tooltip';


export default class Input extends PureComponent {
  render() {
    const {
      id, name, label, disabled, readOnly, optional, autoFocus, addOns,
      formValidationErrors, value, formGroupClassName, labelTitle, tooltip,
      ...otherProps
    } = this.props;

    const controlName = name || id;
    const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();
    const labelProps = labelTitle ? {title: label} : null;

    return (
      <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
        className={formGroupClassName}>
        {label
          ? <ControlLabel {...labelProps}>
            {label}
            {optional ? <small> (optional)</small> : null}
            {tooltip ? <Tooltip anchorElement="target" position="right" openDelay={1}><i className="fa fa-info-circle" title={tooltip} /></Tooltip> : null}
          </ControlLabel>
          : null}
        {addOns
          ? <InputGroup>
            <FormControl componentClass="input"
              id={id} name={controlName}
              disabled={disabled} readOnly={readOnly} autoFocus={autoFocus}
              value={value === null || typeof value === 'undefined' ? '' : value} {...otherProps} />
            <InputGroup.Addon className="clickable">{addOns}</InputGroup.Addon>
          </InputGroup>
          : <FormControl componentClass="input"
            id={id} name={controlName}
            disabled={disabled} readOnly={readOnly} autoFocus={autoFocus}
            value={value === null || typeof value === 'undefined' ? '' : value} {...otherProps} />}
        {controlValidationErrors.size
          ? controlValidationErrors.map((error, index) =>
            (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
          : null}
      </FormGroup>
    );
  }
}

Input.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'text', 'password', 'number']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formValidationErrors: PropTypes.instanceOf(Map),
  formGroupClassName: PropTypes.string,
  labelTitle: PropTypes.bool,
  addOns: PropTypes.object,
};
