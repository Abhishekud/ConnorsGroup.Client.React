export const REORDER_VOLUME_DRIVER_MAPPING_GRID_COLUMNS = 'REORDER_VOLUME_DRIVER_MAPPING_GRID_COLUMNS';

export function reorderVolumeDriverMappingGridColumns(finalColumns) {
  return {
    type: REORDER_VOLUME_DRIVER_MAPPING_GRID_COLUMNS,
    payload: {finalColumns},
  };
}
