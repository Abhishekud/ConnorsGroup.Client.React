export const SET_CREATE_ATTRIBUTE_MODEL_PROPERTY = 'SET_CREATE_ATTRIBUTE_MODEL_PROPERTY';

export function setCreateAttributeModelProperty(name, value) {
  return {
    type: SET_CREATE_ATTRIBUTE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
