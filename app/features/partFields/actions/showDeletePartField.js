export const SHOW_DELETE_PART_FIELD = 'SHOW_DELETE_PART_FIELD';

export function showDeletePartField(partField) {
  return {
    type: SHOW_DELETE_PART_FIELD,
    payload: partField,
  };
}
