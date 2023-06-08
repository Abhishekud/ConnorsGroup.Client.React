export const TOGGLE_CHARACTERISTIC_STANDARDS_GRID_COLUMN_VISIBILITY = 'TOGGLE_CHARACTERISTIC_STANDARDS_GRID_COLUMN_VISIBILITY';

export function toggleCharacteristicStandardsGridColumnVisibility(field, visibility) {
  return {
    type: TOGGLE_CHARACTERISTIC_STANDARDS_GRID_COLUMN_VISIBILITY,
    payload: {field, visibility},
  };
}

export default toggleCharacteristicStandardsGridColumnVisibility;

