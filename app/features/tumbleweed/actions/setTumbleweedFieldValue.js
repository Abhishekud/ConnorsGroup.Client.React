export const SET_TUMBLEWEED_FIELD_VALUE = 'SET_TUMBLEWEED_FIELD_VALUE';

export function setTumbleweedFieldValue(name, value) {
  return {
    type: SET_TUMBLEWEED_FIELD_VALUE,
    payload: {name, value},
  };
}
