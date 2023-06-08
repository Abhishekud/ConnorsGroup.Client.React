export const SET_MOVE_NON_MOST_STEP_TO_POSITION_MODEL_PROPERTY = 'SET_MOVE_NON_MOST_STEP_TO_POSITION_MODEL_PROPERTY';

export function setMoveNonMOSTStepToPositionModelProperty(name, value) {
  return {
    type: SET_MOVE_NON_MOST_STEP_TO_POSITION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
