export const SET_CREATE_LOCATION_PROFILE_MODEL_PROPERTY = 'SET_CREATE_LOCATION_PROFILE_MODEL_PROPERTY';

export function setCreateLocationProfileModelProperty(name, value) {
  return {
    type: SET_CREATE_LOCATION_PROFILE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
