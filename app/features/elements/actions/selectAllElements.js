export const SELECT_ALL_ELEMENTS = 'SELECT_ALL_ELEMENTS';

export function selectAllElements(ids, selected) {
  return {
    type: SELECT_ALL_ELEMENTS,
    payload: {ids, selected},
  };
}
