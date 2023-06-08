import autoBind from 'react-autobind';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MOSTParametersEditor from './MOSTParametersEditor';
import {TOOL_ACTION, EQUIPMENT_ACTION} from '../constants/mostPhaseNames';

export default class MOSTPhaseEditor extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleMOSTParameterFieldChanged(mostParameterNumber, event) {
    const {mostPhase, onMOSTPhaseParameterFieldChanged} = this.props;

    onMOSTPhaseParameterFieldChanged(mostPhase.get('number'), mostParameterNumber, event);
  }

  handleMOSTParameterClicked(mostParameterNumber, mostParameterName) {
    const {mostPhase, onMOSTPhaseParameterClicked} = this.props;

    onMOSTPhaseParameterClicked(
      mostPhase.get('number'),
      mostParameterNumber,
      mostParameterName,
      mostPhase.get('name') === TOOL_ACTION || mostPhase.get('name') === EQUIPMENT_ACTION);
  }

  render() {
    const {mostType, mostStepNumber, mostPhase, disabled, parametersValidationErrors} = this.props;

    return (
      <div className="most-phase">
        <span className="name">{mostPhase.get('name')}</span>
        <MOSTParametersEditor
          mostType={mostType}
          mostStepNumber={mostStepNumber}
          mostPhaseName={mostPhase.get('name')}
          mostPhaseNumber={mostPhase.get('number')}
          mostParameters={mostPhase.get('mostParameters')}
          disabled={disabled}
          validationErrors={parametersValidationErrors}
          onMOSTParameterFieldChanged={this.handleMOSTParameterFieldChanged}
          onMOSTParameterClicked={this.handleMOSTParameterClicked} />
      </div>
    );
  }
}

MOSTPhaseEditor.propTypes = {
  mostType: PropTypes.string.isRequired,
  mostStepNumber: PropTypes.number.isRequired,
  mostPhase: PropTypes.instanceOf(Map).isRequired,
  disabled: PropTypes.bool.isRequired,
  parametersValidationErrors: PropTypes.instanceOf(Map).isRequired,
  onMOSTPhaseParameterFieldChanged: PropTypes.func.isRequired,
  onMOSTPhaseParameterClicked: PropTypes.func.isRequired,
};
