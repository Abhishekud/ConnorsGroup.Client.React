export const SET_LABOR_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY = 'SET_KRONOS_LABOR_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY';

export function setLaborStandardsListBulkEditModelProperty(name, value) {
  return {
    type: SET_LABOR_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
