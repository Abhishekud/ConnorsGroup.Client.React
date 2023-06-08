export const SHOW_DELETE_VOLUME_DRIVER_MAPPING = 'SHOW_DELETE_VOLUME_DRIVER_MAPPING';

export function showDeleteVolumeDriverMapping(volumeDriverMapping) {
  return {
    type: SHOW_DELETE_VOLUME_DRIVER_MAPPING,
    payload: volumeDriverMapping,
  };
}
