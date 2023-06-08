export const SET_FIELD_VALUE = 'SET_DISPLAY_NAME_FIELD';

export function setFieldValue(id, value) {
  return {
    type: SET_FIELD_VALUE,
    payload: {id, value},
  };
}
