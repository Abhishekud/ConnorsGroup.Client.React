export const TOGGLE_CHARACTERISTICS_COLUMN_LOCK = 'TOGGLE_CHARACTERISTICS_COLUMN_LOCK';

export function toggleCharacteristicsColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_CHARACTERISTICS_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleCharacteristicsColumnLock;
