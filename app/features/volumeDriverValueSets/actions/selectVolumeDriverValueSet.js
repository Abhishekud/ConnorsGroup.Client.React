export const SELECT_VOLUME_DRIVER_VALUE_SET = 'SELECT_VOLUME_DRIVER_VALUE_SET';

export function selectVolumeDriverValueSet(dataItem) {
  return {
    type: SELECT_VOLUME_DRIVER_VALUE_SET,
    payload: dataItem,
  };
}
