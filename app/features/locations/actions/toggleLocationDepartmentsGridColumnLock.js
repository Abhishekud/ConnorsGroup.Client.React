export const TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_LOCK = 'TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_LOCK';

export function toggleLocationDepartmentsGridColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleLocationDepartmentsGridColumnLock;
