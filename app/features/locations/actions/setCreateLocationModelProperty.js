export const SET_CREATE_LOCATION_MODEL_PROPERTY = 'SET_CREATE_LOCATION_MODEL_PROPERTY';

export function setCreateLocationModelProperty(name, value) {
  return {
    type: SET_CREATE_LOCATION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
