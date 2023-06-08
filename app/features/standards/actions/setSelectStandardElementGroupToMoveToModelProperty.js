export const SET_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO_MODEL_PROPERTY = 'SET_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO_MODEL_PROPERTY';

export function setSelectStandardElementGroupToMoveToModelProperty(name, value) {
  return {
    type: SET_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO_MODEL_PROPERTY,
    payload: {name, value},
  };
}
