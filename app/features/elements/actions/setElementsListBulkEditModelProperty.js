export const SET_ELEMENTS_LIST_BULK_EDIT_MODEL_PROPERTY = 'SET_ELEMENTS_LIST_BULK_EDIT_MODEL_PROPERTY';

export function setElementsListBulkEditModelProperty(name, value) {
  return {
    type: SET_ELEMENTS_LIST_BULK_EDIT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
