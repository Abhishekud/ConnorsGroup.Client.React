export const TOGGLE_SELECT_VOLUME_DRIVER_MAPPING = 'TOGGLE_SELECT_VOLUME_DRIVER_MAPPING';

export function toggleSelectVolumeDriverMapping(selectVolumeDriverMappingId) {
  return {
    type: TOGGLE_SELECT_VOLUME_DRIVER_MAPPING,
    payload: {selectVolumeDriverMappingId},
  };
}
