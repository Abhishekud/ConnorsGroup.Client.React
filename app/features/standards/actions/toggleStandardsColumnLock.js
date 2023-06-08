export const TOGGLE_STANDARDS_COLUMN_LOCK = 'TOGGLE_STANDARDS_COLUMN_LOCK';

export function toggleStandardsColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_STANDARDS_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleStandardsColumnLock;
