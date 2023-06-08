export const TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_LOCK = 'TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_LOCK';

export function toggleVolumeDriverMappingColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleVolumeDriverMappingColumnLock;
