
export const RESET_LOCKED_VOLUME_DRIVER_MAPPING_COLUMNS = 'RESET_LOCKED_VOLUME_DRIVER_MAPPING_COLUMNS';
export const RESET_LOCKED_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED = `${RESET_LOCKED_VOLUME_DRIVER_MAPPING_COLUMNS}_FULFILLED`;

export function resetLockedVolumeDriverMappingColumns() {
  return {
    type: RESET_LOCKED_VOLUME_DRIVER_MAPPING_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedVolumeDriverMappingColumns;
