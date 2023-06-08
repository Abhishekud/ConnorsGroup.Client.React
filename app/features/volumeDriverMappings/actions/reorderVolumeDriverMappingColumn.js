export const REORDER_VOLUME_DRIVER_MAPPING_COLUMN = 'REORDER_VOLUME_DRIVER_MAPPING_COLUMN';

export function reorderVolumeDriverMappingColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_VOLUME_DRIVER_MAPPING_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
