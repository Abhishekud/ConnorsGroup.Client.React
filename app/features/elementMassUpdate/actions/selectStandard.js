export const SELECT_ELEMENT_WHERE_USED_STANDARD = 'SELECT_ELEMENT_WHERE_USED_STANDARD';

export function selectStandard(id) {
  return {
    type: SELECT_ELEMENT_WHERE_USED_STANDARD,
    payload: id,
  };
}
