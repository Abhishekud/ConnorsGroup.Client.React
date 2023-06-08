export const SET_MOVE_STANDARD_ITEM_TO_POSITION_MODEL_PROPERTY = 'SET_MOVE_STANDARD_ITEM_TO_POSITION_MODEL_PROPERTY';

export function setMoveStandardItemToPositionModelProperty(name, value) {
  return {
    type: SET_MOVE_STANDARD_ITEM_TO_POSITION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
