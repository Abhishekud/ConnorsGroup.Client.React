export const LOAD_VOLUME_DRIVER_MAPPING_COLUMNS = 'LOAD_VOLUME_DRIVER_MAPPING_COLUMNS';

export function loadVolumeDriverMappingColumns(columns) {
  return {
    type: LOAD_VOLUME_DRIVER_MAPPING_COLUMNS,
    payload: columns,
  };
}
