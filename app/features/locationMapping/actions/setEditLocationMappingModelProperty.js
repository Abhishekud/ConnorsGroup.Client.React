export const SET_EDIT_LOCATION_MAPPING_MODEL_PROPERTY = 'SET_EDIT_LOCATION_MAPPING_MODEL_PROPERTY';

export function setEditLocationMappingModelProperty(name, value) {
  return {
    type: SET_EDIT_LOCATION_MAPPING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
