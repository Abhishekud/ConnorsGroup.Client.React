export const REORDER_LOCATION_DEPARTMENT_COLUMNS = 'REORDER_LOCATION_DEPARTMENT_COLUMNS';

export function reorderLocationDepartmentColumns(finalColumns) {
  return {
    type: REORDER_LOCATION_DEPARTMENT_COLUMNS,
    payload: {finalColumns},
  };
}
export default reorderLocationDepartmentColumns;
