export const RESET_VOLUME_DRIVER_MAPPING_COLUMNS = 'RESET_VOLUME_DRIVER_MAPPING_COLUMNS';
export const RESET_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED = `${RESET_VOLUME_DRIVER_MAPPING_COLUMNS}_FULFILLED`;

export function resetVolumeDriverMappingColumns() {
  return {
    type: RESET_VOLUME_DRIVER_MAPPING_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetVolumeDriverMappingColumns;
