import {List, Map} from 'immutable';
import {ControlLabel, FormGroup, HelpBlock, FormControl} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import autoBind from 'react-autobind';
import {defaultDateFormat} from '../../shared/constants/defaultDateFormat';
import {defaultTimeFormat} from '../../shared/constants/defaultTimeFormat';

export default class Date extends PureComponent {

  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleOnDateChange(date) {
    const {onChange} = this.props;

    if (!date) {
      onChange(null);
      return;
    }

    const selectedDate = moment(date).format(defaultDateFormat);
    const currentTime = moment().format(defaultTimeFormat);

    onChange(moment(`${selectedDate.slice(0, 10) } ${ currentTime}`).format());
  }

  render() {
    const {
      id, name, label, disabled, readOnly, optional, autoFocus,
      formValidationErrors, value, formGroupClassName, labelTitle, className, ...otherProps
    } = this.props;

    const controlName = name || id;
    const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();
    const labelProps = labelTitle ? {title: label} : null;

    return (
      <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
        className={formGroupClassName}>
        {label
          ? <ControlLabel {...labelProps}>{label}{disabled}{optional ? <small> (optional)</small> : null}</ControlLabel> : null}
        {disabled === false
          ? <DatePicker {...otherProps} id={id} name={controlName} selected={value === null || typeof value === 'undefined' ? '' : moment(value).toDate()}
            disabled={disabled} readOnly={readOnly} autoFocus={autoFocus} className={`form-control ${className || ''}`}
            onChange={this.handleOnDateChange} />
          : <FormControl componentClass="input"
            {...otherProps} id={id} name={controlName}
            disabled={disabled} readOnly={readOnly} autoFocus={autoFocus}
            value={value === null || typeof value === 'undefined' ? '' : moment(value).format(defaultDateFormat)} onChange={this.handleOnDateChange} />}
        {controlValidationErrors.size
          ? controlValidationErrors.map((error, index) =>
            (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
          : null}
      </FormGroup>
    );
  }
}

Date.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formValidationErrors: PropTypes.instanceOf(Map),
  formGroupClassName: PropTypes.string,
  labelTitle: PropTypes.bool,
};
