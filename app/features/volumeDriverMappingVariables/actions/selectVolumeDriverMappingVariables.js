export const SELECT_VOLUME_DRIVER_MAPPING_VARIABLES = 'SELECT_VOLUME_DRIVER_MAPPING_VARIABLES';

export function selectVolumeDriverMappingVariables(volumeDriverMapping, volumeDriverSetId, columnClickTarget) {
  return {
    type: SELECT_VOLUME_DRIVER_MAPPING_VARIABLES,
    payload: {
      volumeDriverMapping,
      volumeDriverSetId: volumeDriverSetId || null,
      columnClickTarget},
  };
}
