export const TOGGLE_SELECT_VOLUME_DRIVER_VALUE_SET = 'TOGGLE_SELECT_VOLUME_DRIVER_VALUE_SET';

export function toggleSelectVolumeDriverValueSet(volumeDriverValueSetId) {
  return {
    type: TOGGLE_SELECT_VOLUME_DRIVER_VALUE_SET,
    payload: {volumeDriverValueSetId},
  };
}
