export const SET_BULK_EDIT_LOCATION_MODEL_PROPERTY = 'SET_BULK_EDIT_LOCATION_MODEL_PROPERTY';

export function setBulkEditLocationModelProperty(name, value) {
  return {
    type: SET_BULK_EDIT_LOCATION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
