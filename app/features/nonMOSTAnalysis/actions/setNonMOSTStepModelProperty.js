export const SET_NON_MOST_STEP_MODEL_PROPERTY = 'SET_NON_MOST_STEP_MODEL_PROPERTY';

export function setNonMOSTStepModelProperty(nonMOSTStepId, name, value) {
  return {
    type: SET_NON_MOST_STEP_MODEL_PROPERTY,
    payload: {nonMOSTStepId, name, value},
  };
}
