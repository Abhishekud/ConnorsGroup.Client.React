export const SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY = 'SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY';

export function setEditVolumeDriverMappingModelProperty(name, value) {
  return {
    type: SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
