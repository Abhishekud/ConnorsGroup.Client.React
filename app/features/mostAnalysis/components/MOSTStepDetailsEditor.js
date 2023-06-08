import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {FormControl} from 'react-bootstrap';
import {formatTMUs} from '../../shared/services';
import {NumericInput} from '../../forms/components';
import {sequenceModelTypes, mostTypes} from '../constants';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MOSTStepDetailsToolTypeEditor from './MOSTStepDetailsToolTypeEditor';
import MOSTStepDetailsEquipmentTypeEditor from './MOSTStepDetailsEquipmentTypeEditor';
import MOSTStepDetailsNumObjsManipEditor from './MOSTStepDetailsNumObjsManipEditor';
import MOSTStepDetailsTMUsEditor from './MOSTStepDetailsTMUsEditor';
import {calculateTabIndex} from '../services';

export default class MOSTStepDetailsEditor extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {mostType} = this.props;

    this.sequenceModelTypeOptions = mostType === mostTypes.BASIC_MOST
      ? sequenceModelTypes.BASIC_MOST.map(smt => ({value: smt, label: sequenceModelTypes.displayName(smt)})).valueSeq().toArray()
      : sequenceModelTypes.MINI_MOST.map(smt => ({value: smt, label: sequenceModelTypes.displayName(smt)})).valueSeq().toArray();
  }

  handleSimoClicked() {
    const {mostStep, onFieldChanged} = this.props;

    onFieldChanged({
      target: {
        name: 'simultaneous',
        value: !mostStep.get('simultaneous'),
      },
    });
  }

  render() {
    const {
      mostStep,
      timeFormat,
      disabled,
      validationErrors,
      onFieldChanged,
    } = this.props;

    return (
      <div className="details">
        <FormControl componentClass="select" className="sequence-model-type" disabled={disabled}
          name="sequenceModelType" onChange={onFieldChanged} value={mostStep.get('sequenceModelType')}
          tabIndex={calculateTabIndex(mostStep.get('number'), 4)}>
          {this.sequenceModelTypeOptions && this.sequenceModelTypeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </FormControl>
        <MOSTStepDetailsToolTypeEditor mostStep={mostStep} disabled={disabled} onFieldChanged={onFieldChanged} />
        <MOSTStepDetailsEquipmentTypeEditor mostStep={mostStep} disabled={disabled} onFieldChanged={onFieldChanged} />
        <MOSTStepDetailsNumObjsManipEditor mostStep={mostStep} disabled={disabled} validationErrors={validationErrors}
          onFieldChanged={onFieldChanged} />
        <div className="simo-toggle">
          <span><strong>Simo</strong></span>
          <i onClick={disabled ? null : this.handleSimoClicked}
            className={`${disabled ? 'disabled' : 'clickable'} internal fa fa-toggle-${mostStep.get('simultaneous') ? 'on' : 'off'}`} />
        </div>
        <NumericInput id="frequency" label="Frequency" formGroupClassName="frequency"
          disabled={disabled}
          min="0" value={mostStep.get('frequency')} onChange={onFieldChanged}
          formValidationErrors={validationErrors}
          tabIndex={calculateTabIndex(mostStep.get('number'), 8)} />
        <MOSTStepDetailsTMUsEditor mostStep={mostStep} disabled={disabled} validationErrors={validationErrors}
          onFieldChanged={onFieldChanged} />
        <div className="time">
          <span><strong>Total Time</strong></span>
          <span className="value">
            {formatTMUs(mostStep.get('adjustedMeasuredTimeMeasurementUnits'), timeFormat)}
          </span>
        </div>
      </div>
    );
  }
}

MOSTStepDetailsEditor.propTypes = {
  mostType: PropTypes.string.isRequired,
  mostStep: PropTypes.instanceOf(Map).isRequired,
  timeFormat: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChanged: PropTypes.func.isRequired,
};
