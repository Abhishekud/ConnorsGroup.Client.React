export const TOGGLE_LABOR_STANDARDS_COLUMN_LOCK = 'TOGGLE_LABOR_STANDARDS_COLUMN_LOCK';

export function toggleLaborStandardsColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_LABOR_STANDARDS_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleLaborStandardsColumnLock;
