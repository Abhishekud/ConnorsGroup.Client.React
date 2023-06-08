export const REORDER_VOLUME_DRIVER_VALUES_COLUMN = 'REORDER_VOLUME_DRIVER_VALUES_COLUMN';

export function reorderVolumeDriverValuesColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_VOLUME_DRIVER_VALUES_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
