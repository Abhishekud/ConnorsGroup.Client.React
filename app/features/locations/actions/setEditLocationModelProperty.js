export const SET_EDIT_LOCATION_MODEL_PROPERTY = 'SET_EDIT_LOCATION_MODEL_PROPERTY';

export function setEditLocationModelProperty(name, value) {
  return {
    type: SET_EDIT_LOCATION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
