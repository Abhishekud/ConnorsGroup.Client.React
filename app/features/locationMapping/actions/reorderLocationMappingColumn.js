export const REORDER_LOCATION_MAPPING_COLUMN = 'REORDER_LOCATION_MAPPING_COLUMN';

export function reorderLocationMappingColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_LOCATION_MAPPING_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
