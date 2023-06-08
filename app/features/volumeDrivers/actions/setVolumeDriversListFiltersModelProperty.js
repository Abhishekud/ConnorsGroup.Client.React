export const SET_VOLUME_DRIVERS_LIST_FILTERS_MODEL_PROPERTY = 'SET_VOLUME_DRIVERS_LIST_FILTERS_MODEL_PROPERTY';

export function setVolumeDriversListFiltersModelProperty(name, value) {
  return {
    type: SET_VOLUME_DRIVERS_LIST_FILTERS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
