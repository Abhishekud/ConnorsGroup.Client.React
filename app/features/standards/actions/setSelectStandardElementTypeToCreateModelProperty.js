export const SET_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE_MODEL_PROPERTY = 'SET_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE_MODEL_PROPERTY';

export function setSelectStandardElementTypeToCreateModelProperty(name, value) {
  return {
    type: SET_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
