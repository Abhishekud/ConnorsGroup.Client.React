export const SET_EDIT_DEPARTMENT_MODEL_PROPERTY = 'SET_EDIT_DEPARTMENT_MODEL_PROPERTY';

export function setEditDepartmentModelProperty(name, value) {
  return {
    type: SET_EDIT_DEPARTMENT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
