export const SELECT_PART_FAMILY = 'SELECT_PART_FAMILY';

export function selectPartFamily(partFamily) {
  return {
    type: SELECT_PART_FAMILY,
    payload: partFamily,
  };
}
