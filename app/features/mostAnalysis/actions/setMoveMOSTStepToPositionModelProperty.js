export const SET_MOVE_MOST_STEP_TO_POSITION_MODEL_PROPERTY = 'SET_MOVE_MOST_STEP_TO_POSITION_MODEL_PROPERTY';

export function setMoveMOSTStepToPositionModelProperty(name, value) {
  return {
    type: SET_MOVE_MOST_STEP_TO_POSITION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
