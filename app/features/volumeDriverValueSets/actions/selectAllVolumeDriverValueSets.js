export const SELECT_ALL_VOLUME_DRIVER_VALUE_SETS = 'SELECT_ALL_VOLUME_DRIVER_VALUE_SETS';

export function selectAllVolumeDriverValueSets(ids, selected) {
  return {
    type: SELECT_ALL_VOLUME_DRIVER_VALUE_SETS,
    payload: {ids, selected},
  };
}
