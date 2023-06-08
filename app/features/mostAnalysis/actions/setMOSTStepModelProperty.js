export const SET_MOST_STEP_MODEL_PROPERTY = 'SET_MOST_STEP_MODEL_PROPERTY';

export function setMOSTStepModelProperty(mostStepId, name, value) {
  return {
    type: SET_MOST_STEP_MODEL_PROPERTY,
    payload: {mostStepId, name, value},
  };
}
