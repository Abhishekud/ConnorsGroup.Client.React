import classNames from 'classnames';
import autoBind from 'react-autobind';
import {List} from 'immutable';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import {Select} from '../../forms/components';

export default class TimeOffset extends React.Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  checkMinMaxTime(time) {
    const hour = parseInt(time.get('hour'), 10);
    const minute = parseInt(time.get('minute'), 10);

    const minHour = parseInt(this.props.minValue.get('hour'), 10);
    const minMinute = parseInt(this.props.minValue.get('minute'), 10);

    const ltMinHour = hour < minHour;
    const gtMinimumMinutes = hour === minHour && minute > minMinute;
    const ltMinimumMinutes = minute < minMinute;

    if (ltMinHour || (gtMinimumMinutes && minHour < 0) || (ltMinHour && minHour >= 0 && ltMinimumMinutes)) {
      return time.set('hour', minHour).set('minute', minMinute < 10 ? `0${minMinute}` : minMinute);
    }

    const maxHour = parseInt(this.props.maxValue.get('hour'), 10);
    const maxMinute = parseInt(this.props.maxValue.get('minute'), 10);

    const gtMaxHour = hour > maxHour;
    const gtMaximumMinutes = hour === maxHour && minute > maxMinute;
    const ltMaximumMinutes = minute < maxMinute;
    if (gtMaxHour || (gtMaximumMinutes && maxHour >= 0) || (gtMaxHour && maxHour < 0 && ltMaximumMinutes)) {
      return time.set('hour', maxHour).set('minute', maxMinute < 10 ? `0${maxMinute}` : minMinute);
    }

    if (time.get('hour') === '-0') {
      return time.set('negativeZero', true);
    }
    return time.set('negativeZero', false);
  }

  handleTimeHourChange(e) {
    const {value} = e.target;
    this.props.onChange({target: {id: this.props.name || this.props.id, value: this.checkMinMaxTime(this.props.value.set('hour', value))}});
  }

  handleTimeMinuteChange(e) {
    const {value} = e.target;
    this.props.onChange({target: {id: this.props.name || this.props.id, value: this.checkMinMaxTime(this.props.value.set('minute', value))}});
  }

  render() {
    const {
      id, label, formValidationErrors, value, formGroupClassName,
      hideHours = false, hideMinutes = false, optional, minValue, maxValue,
      step = {hour: 1, minute: 1},
      ...otherProps
    } = this.props;

    //Prevent onChange from being passed as a property to the FormControls via otherProps, as it overrides our explicit onChange
    delete otherProps.onChange;

    const classes = classNames(
      'time-component',
      formGroupClassName,
    );
    const controlName = this.props.name || this.props.id;
    const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();

    const minHour = parseInt(minValue.get('hour'), 10);
    const maxHour = parseInt(maxValue.get('hour'), 10);

    const hourOptions = [{value: '', label: 'Hour'}];
    const minuteOptions = [{value: '', label: 'Min'}];

    for (let i = minHour || 0; i <= maxHour || 0; i += step.hour || 1) {
      if (i === 0 && minHour < 0) hourOptions.push({value: '-0', label: '-0'});
      hourOptions.push({value: i, label: i});
    }
    for (let i = 0; i < 60; i += step.minute || 1) {
      const val = i < 10 ? `0${i}` : i;
      minuteOptions.push({value: val, label: val});
    }

    return (
      <FormGroup controlId={id}
        validationState={controlValidationErrors.size ? 'error' : null}
        className={classes}>
        {label ? <ControlLabel>{label}{optional ? <small> (optional)</small> : null}</ControlLabel> : null}
        <div className="time-select">
          {!hideHours &&
            <Select
              id={`${controlName}_hour`}
              onChange={this.handleTimeHourChange}
              value={value.get('hour')}
              options={hourOptions} formValidationErrors={formValidationErrors} />}

          {!hideMinutes &&
          <FormControl componentClass="select" name={`${controlName}_minute`} onChange={this.handleTimeMinuteChange}
            value={value.get('minute')} {...otherProps}>
            {minuteOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </FormControl>}
        </div>

        {controlValidationErrors.size
          ? controlValidationErrors.map((error, index) =>
            (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
          : null}

      </FormGroup>
    );
  }
}

TimeOffset.propTypes = {
  onChange: PropTypes.func.isRequired,
  minValue: PropTypes.object.isRequired,
  maxValue: PropTypes.object.isRequired,
};
