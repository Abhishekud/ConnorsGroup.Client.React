export const TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN_VISIBILITY = 'TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN_VISIBILITY';

export function toggleUnitOfMeasureStandardsGridColumnVisibility(field, visibility) {
  return {
    type: TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN_VISIBILITY,
    payload: {field, visibility},
  };
}

export default toggleUnitOfMeasureStandardsGridColumnVisibility;

