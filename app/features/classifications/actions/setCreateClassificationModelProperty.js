export const SET_CREATE_CLASSIFICATION_MODEL_PROPERTY = 'SET_CREATE_CLASSIFICATION_MODEL_PROPERTY';

export function setCreateClassificationModelProperty(name, value) {
  return {
    type: SET_CREATE_CLASSIFICATION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
