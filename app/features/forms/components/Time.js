import classNames from 'classnames';
import autoBind from 'react-autobind';
import {List} from 'immutable';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import {Select} from '../../forms/components';

const AMPMOptions = [{value: 'AM', label: 'AM'}, {value: 'PM', label: 'PM'}];

export default class Time extends React.Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    this.AMPM = '';
  }

  //The AMPM value is not passed, but we still need to track it.
  //This is the unfortunate way that JS handles class properties, with the alternative of setting this.AMPM = '' in the constructor.
  //AMPM;

  handleTimeHourChange(e) {
    const {value} = e.target;

    let hour = parseInt(value, 10);
    if (!this.props.use24h) {
      switch (this.AMPM) {
        case 'PM':
          if (hour < 12) {
            hour = `${hour + 12}`;
          }
          break;
        case 'AM':
        default:
          if (hour >= 12) {
            hour = `${hour - 12}`;
          }
          break;
      }
    }
    this.props.onChange({target: {id: this.props.name || this.props.id, value: this.props.value.set('hour', `${hour}`)}});
  }

  handleTimeMinuteChange(e) {
    const {value} = e.target;
    this.props.onChange({target: {id: this.props.name || this.props.id, value: this.props.value.set('minute', value)}});
  }

  handleTimeAMPMChange(e) {
    const {value} = e.target;
    let hour = parseInt(this.props.value.get('hour'), 10);
    switch (value) {
      case 'PM':
        if (hour < 12) {
          hour = `${hour + 12}`;
        }
        break;
      case 'AM':
      default:
        if (hour >= 12) {
          hour = `${hour - 12}`;
        }
        break;
    }

    this.AMPM = value;
    this.props.onChange({target: {id: this.props.name || this.props.id, value: this.props.value.set('hour', `${hour}`)}});
  }

  getHourValue(value) {
    let hour = parseInt(value, 10);
    if (hour > 12 && !this.props.use24h) hour = `${hour - 12}`;

    return `${hour}`;
  }

  render() {
    const {
      id, label, formValidationErrors, value, formGroupClassName,
      hideHours = false, hideMinutes = false, use24h = false, optional,
      step = {hour: 1, minute: 1},
      ...otherProps
    } = this.props;

    //Prevent onChange from being passed as a property to the FormControls via otherProps, as it overrides our explicit onChange
    delete otherProps.onChange;

    const hour = parseInt(value.get('hour'), 10);

    const hourOptions = [{value: '', label: 'Hour'}];
    const minuteOptions = [{value: '', label: 'Min'}];

    if (!this.use24h) {
      this.AMPM = hour >= 12 ? 'PM' : 'AM';
    }

    const classes = classNames(
      'time-component',
      formGroupClassName,
    );
    const controlName = this.props.name || this.props.id;
    const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();

    for (let i = (use24h ? 0 : 1); i <= (use24h ? 23 : 12); i += step.hour || 1) {
      hourOptions.push(
        {
          value: this.AMPM === 'AM' && !use24h && i === 12 ? 0 : i,
          label: i.toString(),
        }
      );
    }
    for (let i = 0; i < 60; i += step.minute || 1) {
      const val = i < 10 ? `0${i}` : i;
      minuteOptions.push({value: val, label: val.toString()});
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
              value={this.getHourValue(value.get('hour'))}
              options={hourOptions} formValidationErrors={formValidationErrors} />
          }

          {!hideMinutes &&
          <FormControl componentClass="select" name={`${controlName}_minute`} onChange={this.handleTimeMinuteChange}
            value={value.get('minute')} {...otherProps}>
            {minuteOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </FormControl>}

          {!use24h &&
          <FormControl componentClass="select" name={`${controlName}_AMPM`} onChange={this.handleTimeAMPMChange}
            value={this.AMPM} {...otherProps}>
            {AMPMOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </FormControl>
          }
        </div>

        {controlValidationErrors.size
          ? controlValidationErrors.map((error, index) =>
            (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
          : null}

      </FormGroup>
    );
  }
}

Time.propTypes = {
  onChange: PropTypes.func.isRequired,
};
