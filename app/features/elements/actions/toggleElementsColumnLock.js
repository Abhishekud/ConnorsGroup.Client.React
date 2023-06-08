export const TOGGLE_ELEMENTS_COLUMN_LOCK = 'TOGGLE_ELEMENTS_COLUMN_LOCK';

export function toggleElementsColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_ELEMENTS_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleElementsColumnLock;
