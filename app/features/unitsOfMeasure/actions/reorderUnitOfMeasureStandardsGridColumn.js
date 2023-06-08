export const REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN = 'REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN';

export function reorderUnitOfMeasureStandardsGridColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
