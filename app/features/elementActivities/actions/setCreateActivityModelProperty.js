export const SET_CREATE_ELEMENT_ACTIVITY_MODEL_PROPERTY = 'SET_CREATE_ELEMENT_ACTIVITY_MODEL_PROPERTY';

export function setCreateActivityModelProperty(name, value) {
  return {
    type: SET_CREATE_ELEMENT_ACTIVITY_MODEL_PROPERTY,
    payload: {name, value},
  };
}
