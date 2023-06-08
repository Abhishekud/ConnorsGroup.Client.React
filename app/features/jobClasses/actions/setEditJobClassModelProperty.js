export const SET_EDIT_JOB_CLASS_MODEL_PROPERTY = 'SET_EDIT_JOB_CLASS_MODEL_PROPERTY';

export function setEditJobClassModelProperty(name, value) {
  return {
    type: SET_EDIT_JOB_CLASS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
