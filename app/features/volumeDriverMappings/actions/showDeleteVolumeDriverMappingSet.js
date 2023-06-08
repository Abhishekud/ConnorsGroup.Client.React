export const SHOW_DELETE_VOLUME_DRIVER_MAPPING_SET = 'SHOW_DELETE_VOLUME_DRIVER_MAPPING_SET';

export function showDeleteVolumeDriverMappingSet(volumeDriverMappingSet) {
  return {
    type: SHOW_DELETE_VOLUME_DRIVER_MAPPING_SET,
    payload: volumeDriverMappingSet,
  };
}
