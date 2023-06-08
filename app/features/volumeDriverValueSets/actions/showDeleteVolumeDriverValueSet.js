export const SHOW_DELETE_VOLUME_DRIVER_VALUE_SET = 'SHOW_DELETE_VOLUME_DRIVER_VALUE_SET';

export function showDeleteVolumeDriverValueSet(volumeDriverValueSet) {
  return {
    type: SHOW_DELETE_VOLUME_DRIVER_VALUE_SET,
    payload: volumeDriverValueSet,
  };
}
