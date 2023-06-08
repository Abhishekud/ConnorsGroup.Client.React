export const SELECT_PART_FIELD = 'SELECT_PART_FIELD';

export function selectPartField(partField) {
  return {
    type: SELECT_PART_FIELD,
    payload: partField,
  };
}
