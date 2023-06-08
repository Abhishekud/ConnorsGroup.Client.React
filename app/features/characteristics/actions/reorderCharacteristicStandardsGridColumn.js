export const REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN = 'REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN';

export function reorderCharacteristicStandardsGridColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
