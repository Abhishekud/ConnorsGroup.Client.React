export const TOGGLE_LABOR_STANDARDS_COLUMN_VISIBILITY = 'TOGGLE_LABOR_STANDARDS_COLUMN_VISIBILITY';
export const TOGGLE_LABOR_STANDARDS_COLUMN_VISIBILITY_FULFILLED = `${TOGGLE_LABOR_STANDARDS_COLUMN_VISIBILITY}_FULFILLED`;

export function toggleLaborStandardsColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_LABOR_STANDARDS_COLUMN_VISIBILITY,
    payload: Promise.resolve({field, visibility, finalColumns, selectedColumn}),
  };
}

export default toggleLaborStandardsColumnVisibility;
