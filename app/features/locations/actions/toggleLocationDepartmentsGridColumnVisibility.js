export const TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_VISIBILITY = 'TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_VISIBILITY';
export const TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_VISIBILITY_FULFILLED = `${TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_VISIBILITY}_FULFILLED`;

export function toggleLocationDepartmentsGridColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_VISIBILITY,
    payload: Promise.resolve({field, visibility, finalColumns, selectedColumn}),
  };
}

export default toggleLocationDepartmentsGridColumnVisibility;

