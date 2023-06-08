export const SET_EDIT_KRONOS_LABOR_STANDARD_MODEL_PROPERTY = 'SET_EDIT_KRONOS_LABOR_STANDARD_MODEL_PROPERTY';

export function setEditLaborStandardModelProperty(name, value) {
  return {
    type: SET_EDIT_KRONOS_LABOR_STANDARD_MODEL_PROPERTY,
    payload: {name, value},
  };
}
