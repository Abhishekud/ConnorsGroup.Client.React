
export const SHOW_HIDDEN_LOCATION_DEPARTMENTS = 'SHOW_HIDDEN_LOCATION_DEPARTMENTS';
export const SHOW_HIDDEN_LOCATION_DEPARTMENTS_FULFILLED = `${SHOW_HIDDEN_LOCATION_DEPARTMENTS}_FULFILLED`;

export function showHiddenLocationDepartmentsColumns() {
  return {
    type: SHOW_HIDDEN_LOCATION_DEPARTMENTS,
    payload: Promise.resolve(),
  };
}

export default showHiddenLocationDepartmentsColumns;
