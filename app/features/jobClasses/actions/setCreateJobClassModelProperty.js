export const SET_CREATE_JOB_CLASS_MODEL_PROPERTY = 'SET_CREATE_JOB_CLASS_MODEL_PROPERTY';

export function setCreateJobClassModelProperty(name, value) {
  return {
    type: SET_CREATE_JOB_CLASS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
