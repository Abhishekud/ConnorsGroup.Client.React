export const SHOW_DELETE_PART_FAMILY = 'SHOW_DELETE_PART_FAMILY';

export function showDeletePartFamily(partFamily) {
  return {
    type: SHOW_DELETE_PART_FAMILY,
    payload: partFamily,
  };
}
