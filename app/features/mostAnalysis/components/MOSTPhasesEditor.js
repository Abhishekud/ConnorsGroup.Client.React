import {Map, List} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import MOSTPhaseEditor from './MOSTPhaseEditor';

export default function MOSTPhasesEditor({
  mostType, mostStepNumber, mostPhases, disabled, parametersValidationErrors, onMOSTPhaseParameterFieldChanged, onMOSTPhaseParameterClicked,
}) {
  return (
    <div className="most-phases">
      {mostPhases.sortBy(mp => mp.get('number')).map(mostPhase =>
        (<MOSTPhaseEditor
          key={mostPhase.get('number')}
          mostType={mostType}
          mostStepNumber={mostStepNumber}
          mostPhase={mostPhase}
          disabled={disabled}
          parametersValidationErrors={parametersValidationErrors}
          onMOSTPhaseParameterFieldChanged={onMOSTPhaseParameterFieldChanged}
          onMOSTPhaseParameterClicked={onMOSTPhaseParameterClicked} />))}
    </div>
  );
}

MOSTPhasesEditor.propTypes = {
  mostType: PropTypes.string.isRequired,
  mostStepNumber: PropTypes.number.isRequired,
  mostPhases: PropTypes.instanceOf(List).isRequired,
  disabled: PropTypes.bool.isRequired,
  parametersValidationErrors: PropTypes.instanceOf(Map).isRequired,
  onMOSTPhaseParameterFieldChanged: PropTypes.func.isRequired,
  onMOSTPhaseParameterClicked: PropTypes.func.isRequired,
};
