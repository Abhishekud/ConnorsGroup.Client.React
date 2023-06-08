export const SET_LABOR_STANDARDS_BULK_EDIT_MODEL_PROPERTY = 'REFLEXIS/LABOR_STANDARDS/SET_BULK_EDIT_MODEL_PROPERTY';

export function setLaborStandardBulkEditModelProperty(id, value) {
  return {
    type: SET_LABOR_STANDARDS_BULK_EDIT_MODEL_PROPERTY,
    payload: {id, value},
  };
}
