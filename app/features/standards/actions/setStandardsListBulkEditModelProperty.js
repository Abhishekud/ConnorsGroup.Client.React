export const SET_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY = 'SET_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY';

export function setStandardsListBulkEditModelProperty(name, value) {
  return {
    type: SET_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
