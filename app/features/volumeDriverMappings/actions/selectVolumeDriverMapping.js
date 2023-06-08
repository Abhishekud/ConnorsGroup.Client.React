export const SELECT_VOLUME_DRIVER_MAPPING = 'SELECT_VOLUME_DRIVER_MAPPING';

export function selectVolumeDriverMapping(volumeDriverMapping, volumeDriverSetId, columnClickTarget) {
  return {
    type: SELECT_VOLUME_DRIVER_MAPPING,
    payload: {
      volumeDriverMapping,
      volumeDriverSetId: volumeDriverSetId || null,
      columnClickTarget},
  };
}
