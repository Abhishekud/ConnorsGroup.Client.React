export const SET_ELEMENT_PROFILE_BULK_EDIT_MODEL_PROPERTY = 'SET_ELEMENT_PROFILE_BULK_EDIT_MODEL_PROPERTY';

export function setElementProfileBulkEditModelProperty(name, value) {
  return {
    type: SET_ELEMENT_PROFILE_BULK_EDIT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
