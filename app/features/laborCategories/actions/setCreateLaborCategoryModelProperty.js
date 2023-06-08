export const SET_CREATE_LABOR_CATEGORY_MODEL_PROPERTY = 'SET_CREATE_LABOR_CATEGORY_MODEL_PROPERTY';

export function setCreateLaborCategoryModelProperty(name, value) {
  return {
    type: SET_CREATE_LABOR_CATEGORY_MODEL_PROPERTY,
    payload: {name, value},
  };
}
