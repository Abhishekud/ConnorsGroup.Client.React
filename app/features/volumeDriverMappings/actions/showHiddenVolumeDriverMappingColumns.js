export const SHOW_HIDDEN_VOLUME_DRIVER_MAPPING_COLUMNS = 'SHOW_HIDDEN_VOLUME_DRIVER_MAPPING_COLUMNS';
export const SHOW_HIDDEN_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED = `${SHOW_HIDDEN_VOLUME_DRIVER_MAPPING_COLUMNS}_FULFILLED`;

export function showHiddenVolumeDriverMappingColumns() {
  return {
    type: SHOW_HIDDEN_VOLUME_DRIVER_MAPPING_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenVolumeDriverMappingColumns;
