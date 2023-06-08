export const CANCEL_EDIT_VOLUME_DRIVER_MAPPING_SET = 'CANCEL_EDIT_VOLUME_DRIVER_MAPPING_SET';

export function cancelEditVolumeDriverMappingSet(volumeDriverMappingSetId) {
  return {
    type: CANCEL_EDIT_VOLUME_DRIVER_MAPPING_SET,
    payload: volumeDriverMappingSetId,
  };
}
