export const TOGGLE_STANDARDS_COLUMN_VISIBILITY = 'TOGGLE_STANDARDS_COLUMN_VISIBILITY';

export function toggleStandardsColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_STANDARDS_COLUMN_VISIBILITY,
    payload: {field, visibility, finalColumns, selectedColumn},
  };
}
