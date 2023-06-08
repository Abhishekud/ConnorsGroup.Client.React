export const SELECT_ELEMENT_WHERE_USED_ALL_STANDARDS = 'SELECT_ELEMENT_WHERE_USED_ALL_STANDARDS';

export function selectAllStandards(ids, selected) {
  return {
    type: SELECT_ELEMENT_WHERE_USED_ALL_STANDARDS,
    payload: {ids, selected},
  };
}
