export const LOAD_LOCATION_DEPARTMENTS_COLUMNS = 'LOAD_LOCATION_DEPARTMENTS_COLUMNS';

export function loadLocationDepartmentsColumns(columns) {
  return {
    type: LOAD_LOCATION_DEPARTMENTS_COLUMNS,
    payload: columns,
  };
}
export default loadLocationDepartmentsColumns;
