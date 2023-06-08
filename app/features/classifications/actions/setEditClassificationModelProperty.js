export const SET_EDIT_CLASSIFICATION_MODEL_PROPERTY = 'SET_EDIT_CLASSIFICATION_MODEL_PROPERTY';

export function setEditClassificationModelProperty(name, value) {
  return {
    type: SET_EDIT_CLASSIFICATION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
