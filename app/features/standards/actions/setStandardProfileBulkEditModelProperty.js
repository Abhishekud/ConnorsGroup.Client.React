export const SET_STANDARD_PROFILE_BULK_EDIT_MODEL_PROPERTY = 'SET_STANDARD_PROFILE_BULK_EDIT_MODEL_PROPERTY';

export function setStandardProfileBulkEditModelProperty(name, value) {
  return {
    type: SET_STANDARD_PROFILE_BULK_EDIT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
