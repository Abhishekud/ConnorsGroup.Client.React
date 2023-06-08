import {List, Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import MOSTParameterEditor from './MOSTParameterEditor';

export default function MOSTParametersEditor({
  mostType, mostStepNumber, mostPhaseName, mostPhaseNumber, mostParameters, disabled, validationErrors, onMOSTParameterFieldChanged, onMOSTParameterClicked,
}) {
  return (
    <div className="most-parameters">
      {mostParameters.sortBy(mp => mp.get('number')).map(mostParameter =>
        (<MOSTParameterEditor
          key={mostParameter.get('number')}
          mostType={mostType}
          mostStepNumber={mostStepNumber}
          mostPhaseName={mostPhaseName}
          mostPhaseNumber={mostPhaseNumber}
          mostParameter={mostParameter}
          disabled={disabled}
          validationErrors={validationErrors.get(`${mostPhaseNumber}-${mostParameter.get('number')}`)}
          onFieldChanged={onMOSTParameterFieldChanged}
          onParameterClicked={onMOSTParameterClicked} />))}
    </div>
  );
}

MOSTParametersEditor.propTypes = {
  mostType: PropTypes.string.isRequired,
  mostStepNumber: PropTypes.number.isRequired,
  mostPhaseName: PropTypes.string.isRequired,
  mostPhaseNumber: PropTypes.number.isRequired,
  mostParameters: PropTypes.instanceOf(List).isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onMOSTParameterFieldChanged: PropTypes.func.isRequired,
  onMOSTParameterClicked: PropTypes.func.isRequired,
};
