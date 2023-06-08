export const SET_EDIT_LABOR_CATEGORY_MODEL_PROPERTY = 'SET_EDIT_LABOR_CATEGORY_MODEL_PROPERTY';

export function setEditLaborCategoryModelProperty(name, value) {
  return {
    type: SET_EDIT_LABOR_CATEGORY_MODEL_PROPERTY,
    payload: {name, value},
  };
}
