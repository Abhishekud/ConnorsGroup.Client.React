export const SET_MOST_STEP_PHASE_PARAMETER_MODEL_PROPERTY = 'SET_MOST_STEP_PHASE_PARAMETER_MODEL_PROPERTY';

export function setMOSTStepPhaseParameterModelProperty(mostStepId, mostPhaseNumber, mostParameterNumber, name, value) {
  return {
    type: SET_MOST_STEP_PHASE_PARAMETER_MODEL_PROPERTY,
    payload: {
      mostStepId,
      mostPhaseNumber,
      mostParameterNumber,
      name,
      value,
    },
  };
}
