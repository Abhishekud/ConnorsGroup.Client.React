export const REORDER_LOCATION_DEPARTMENTS_COLUMN = 'REORDER_LOCATION_DEPARTMENTS_COLUMN';

export function reorderLocationDepartmentsColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_LOCATION_DEPARTMENTS_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
