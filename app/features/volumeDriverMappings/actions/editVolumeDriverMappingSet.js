export const EDIT_VOLUME_DRIVER_MAPPING_SET = 'EDIT_VOLUME_DRIVER_MAPPING_SET';

export function editVolumeDriverMappingSet(volumeDriverMappingSetId) {
  return {
    type: EDIT_VOLUME_DRIVER_MAPPING_SET,
    payload: volumeDriverMappingSetId,
  };
}
