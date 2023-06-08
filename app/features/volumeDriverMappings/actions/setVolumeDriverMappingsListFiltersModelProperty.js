export const SET_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS_MODEL_PROPERTY = 'SET_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS_MODEL_PROPERTY';

export function setVolumeDriverMappingsListFiltersModelProperty(name, value) {
  return {
    type: SET_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
