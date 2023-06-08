export const TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_LOCK = 'TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_LOCK';

export function toggleVolumeDriverValuesColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleVolumeDriverValuesColumnLock;
