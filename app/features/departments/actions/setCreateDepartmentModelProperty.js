export const SET_CREATE_DEPARTMENT_MODEL_PROPERTY = 'SET_CREATE_DEPARTMENT_MODEL_PROPERTY';

export function setCreateDepartmentModelProperty(name, value) {
  return {
    type: SET_CREATE_DEPARTMENT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
