export const LOAD_VOLUME_DRIVER_VALUES_COLUMNS = 'LOAD_VOLUME_DRIVER_VALUES_COLUMNS';

export function loadVolumeDriverValuesColumns(columns) {
  return {
    type: LOAD_VOLUME_DRIVER_VALUES_COLUMNS,
    payload: columns,
  };
}
