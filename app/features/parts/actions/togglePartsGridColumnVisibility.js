export const TOGGLE_PARTS_GRID_COLUMN_VISIBILITY = 'TOGGLE_PARTS_GRID_COLUMN_VISIBILITY';

export function togglePartsGridColumnVisibility(field, visibility) {
  return {
    type: TOGGLE_PARTS_GRID_COLUMN_VISIBILITY,
    payload: {field, visibility},
  };
}

export default togglePartsGridColumnVisibility;

