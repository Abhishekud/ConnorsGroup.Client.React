export const TOGGLE_ATTRIBUTES_COLUMN_LOCK = 'TOGGLE_ATTRIBUTES_COLUMN_LOCK';

export function toggleAttributesColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_ATTRIBUTES_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleAttributesColumnLock;
