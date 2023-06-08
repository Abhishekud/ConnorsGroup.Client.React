export const SET_EDIT_LOCATION_PROFILE_MODEL_PROPERTY = 'SET_EDIT_LOCATION_PROFILE_MODEL_PROPERTY';

export function setEditLocationProfileModelProperty(locationProfileId, name, value) {
  return {
    type: SET_EDIT_LOCATION_PROFILE_MODEL_PROPERTY,
    payload: {locationProfileId, name, value},
  };
}
