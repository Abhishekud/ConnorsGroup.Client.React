import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {formatTMUs} from '../../shared/services';
import {NumericInput} from '../../forms/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class NonMOSTStepDetailsEditor extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSimoClicked() {
    const {nonMOSTStep, onFieldChanged} = this.props;

    onFieldChanged({
      target: {
        name: 'simultaneous',
        value: !nonMOSTStep.get('simultaneous'),
      },
    });
  }

  render() {
    const {
      nonMOSTStep,
      timeFormat,
      disabled,
      validationErrors,
      onFieldChanged,
    } = this.props;

    return (
      <div className="details">
        <div className="simo-toggle">
          <span><strong>Simo</strong></span>
          <i onClick={disabled ? null : this.handleSimoClicked}
            className={`${disabled ? 'disabled' : 'clickable'} internal fa fa-toggle-${nonMOSTStep.get('simultaneous') ? 'on' : 'off'}`} />
        </div>
        <NumericInput id="frequency" label="Frequency" formGroupClassName="frequency"
          disabled={disabled}
          min="0" value={nonMOSTStep.get('frequency')} onChange={onFieldChanged}
          formValidationErrors={validationErrors} />
        <NumericInput id="measuredTimeMeasurementUnits" label={`Time (${timeFormat})`} formGroupClassName="tmus"
          disabled={disabled}
          min="0" value={nonMOSTStep.get('measuredTimeMeasurementUnits')} onChange={onFieldChanged}
          formValidationErrors={validationErrors} />
        <div className="time">
          <span><strong>Total Time</strong></span>
          <span className="value">
            {formatTMUs(nonMOSTStep.get('adjustedMeasuredTimeMeasurementUnits'), timeFormat)}
          </span>
        </div>
      </div>
    );
  }
}

NonMOSTStepDetailsEditor.propTypes = {
  nonMOSTStep: PropTypes.instanceOf(Map).isRequired,
  timeFormat: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChanged: PropTypes.func.isRequired,
};
